const postcss = require('postcss');

/**
 * 주어진 값이 CSS 값으로 직접 사용될 수 있는지 확인합니다.
 * 중첩된 객체 탐색을 계속할지 멈출지 결정하는 데 사용됩니다.
 * @param {*} value - 확인할 값
 * @returns {boolean} 직접 CSS 값으로 사용 가능하면 true, 그렇지 않으면 false
 */
function isDirectCssValue(value) {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    Array.isArray(value)
  );
}

/**
 * 점(.) 구분 문자열을 사용하여 테마 객체에서 값을 조회합니다.
 * @param {object} theme - 디자인 토큰이 포함된 테마 객체
 * @param {string} pathString - 조회할 값의 경로 (예: 'colors.primary')
 * @returns {*|undefined} 조회한 값 또는 경로가 없으면 undefined
 */
function getThemeValue(theme, pathString) {
  if (!pathString) return undefined;

  const pathArray = pathString.split('.');
  let current = theme;

  for (const key of pathArray) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * 중첩된 토큰 엔트리를 순회하며 PostCSS Rule 노드를 생성합니다.
 * @param {object} params
 * @param {string|number} params.tokenKey - 현재 토큰 키
 * @param {*} params.tokenValue - 현재 토큰 값
 * @param {string} params.keyPrefix - 부모 키 접두사
 * @param {Array<object>} params.rules - 유틸리티 정의에 따른 규칙 배열
 * @param {object} params.theme - 전체 테마 객체
 * @param {Array<import('postcss').Rule>} params.generatedRules - 생성된 Rule 노드를 수집할 배열
 */
function processTokenEntry({ tokenKey, tokenValue, keyPrefix, rules, theme, generatedRules }) {
  const combinedKey = keyPrefix ? `${keyPrefix}-${tokenKey}` : String(tokenKey);

  if (typeof tokenValue === 'object' && tokenValue !== null && !isDirectCssValue(tokenValue)) {
    // 중첩된 객체는 재귀 처리
    for (const [childKey, childValue] of Object.entries(tokenValue)) {
      processTokenEntry({
        tokenKey: childKey,
        tokenValue: childValue,
        keyPrefix: combinedKey,
        rules,
        theme,
        generatedRules
      });
    }
  } else {
    // 실제 CSS 값에 도달한 경우 Rule 생성
    for (const ruleDef of rules) {
      if (!ruleDef.selectorPattern || !ruleDef.prop) {
        console.warn(`Invalid rule definition for key "${combinedKey}":`, ruleDef);
        continue;
      }

      let finalCssValue = tokenValue;
      if (typeof ruleDef.valueTransform === 'function') {
        finalCssValue = ruleDef.valueTransform(tokenValue, combinedKey, theme);
      } else if (typeof ruleDef.value === 'string' && ruleDef.value.includes('{value}')) {
        finalCssValue = ruleDef.value.replace(/\{value\}/g, String(tokenValue));
      } else if (Object.prototype.hasOwnProperty.call(ruleDef, 'value')) {
        finalCssValue = ruleDef.value;
      }

      const selector = ruleDef.selectorPattern.replace(/\{key\}/g, combinedKey);
      const props = Array.isArray(ruleDef.prop) ? ruleDef.prop : [ruleDef.prop];
      const decls = props.map(p => postcss.decl({ prop: p, value: String(finalCssValue) }));

      if (decls.length) {
        generatedRules.push(postcss.rule({ selector }).append(...decls));
      }
    }
  }
}

/**
 * 설정과 테마를 기반으로 PostCSS 유틸리티 규칙(Rule 노드) 배열을 생성합니다.
 * @param {object} options
 * @param {Array<object>} options.utilities - 유틸리티 정의 배열
 * @param {object} options.theme - 디자인 토큰이 포함된 테마 객체
 * @returns {Array<import('postcss').Rule>} 생성된 PostCSS Rule 노드 배열
 */
function getPostCssUtilities({ utilities, theme }) {
  const generatedRules = [];

  for (const utilConfig of utilities) {
    const { name, tokenPath, rules } = utilConfig;
    if (!Array.isArray(rules) || rules.length === 0) {
      console.warn(`Utility "${name}" has no rules. Skipping.`);
      continue;
    }

    if (tokenPath) {
      const tokenSet = getThemeValue(theme, tokenPath);
      if (!tokenSet || typeof tokenSet !== 'object') {
        console.warn(`Token path "${tokenPath}" for utility "${name}" is invalid. Skipping.`);
        continue;
      }
      for (const [key, value] of Object.entries(tokenSet)) {
        processTokenEntry({
          tokenKey: key,
          tokenValue: value,
          keyPrefix: '',
          rules,
          theme,
          generatedRules
        });
      }
    } else {
      // 정적 유틸리티
      for (const ruleDef of rules) {
        const { selectorPattern, prop, value } = ruleDef;
        if (!selectorPattern || !prop || !Object.prototype.hasOwnProperty.call(ruleDef, 'value')) {
          console.warn(`Invalid static rule definition for utility "${name}":`, ruleDef);
          continue;
        }
        const props = Array.isArray(prop) ? prop : [prop];
        const decls = props.map(p => postcss.decl({ prop: p, value: String(value) }));
        generatedRules.push(postcss.rule({ selector: selectorPattern }).append(...decls));
      }
    }
  }

  return generatedRules;
}

module.exports = {
  isDirectCssValue,
  getThemeValue,
  processTokenEntry,
  getPostCssUtilities
};
