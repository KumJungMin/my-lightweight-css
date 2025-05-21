const postcss = require('postcss');

/**
 * 값이 CSS 값으로 직접 사용될 수 있는지 확인합니다.
 * 중첩된 객체 탐색을 계속할지 멈출지 결정하는 데 사용됩니다.
 * @param {*} value - 확인할 값
 * @returns {boolean} 직접 CSS 값으로 사용 가능하면 true
 */
function isDirectCssValue(value) {
    if (typeof value === 'string' || typeof value === 'number' || value === null) {
        return true;
    }
    if (Array.isArray(value)) {
        return true;
    }
    if (typeof value === 'object' && value !== null) {
        return false; 
    }
    return false;
}


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
 * 설정과 테마를 기반으로 PostCSS 유틸리티 규칙(Rule 노드) 배열을 생성합니다.
 * @param {object} options
 * @param {Array<object>} options.utilities - 유틸리티 정의 배열
 * @param {object} options.theme - 디자인 토큰이 포함된 테마 객체
 * @returns {Array<import('postcss').Rule>} 생성된 PostCSS Rule 노드 배열
 */
function getPostCssUtilities({ utilities, theme }) {
    const generatedRules = [];

    for (const utilityConfig of utilities) {
        const { name, tokenPath, rules } = utilityConfig;

        if (!rules || !Array.isArray(rules) || rules.length === 0) {
            console.warn(`[MyCustomUtilityGenerator] Utility "${name}" has no rules defined. Skipping.`);
            continue;
        }

        if (tokenPath) {
            const tokenSet = getThemeValue(theme, tokenPath);

            if (typeof tokenSet !== 'object' || tokenSet === null) {
                if (tokenSet === undefined) {
                    console.warn(`[MyCustomUtilityGenerator] Token path "${tokenPath}" for utility "${name}" not found in theme. Skipping.`);
                } else {
                    console.warn(`[MyCustomUtilityGenerator] Token path "${tokenPath}" for utility "${name}" is not an object. Skipping.`);
                }
                continue;
            }

            // 재귀 함수를 사용하여 중첩된 토큰 객체 처리 (예: theme.colors)
            const processTokenEntry = (currentTokenKey, currentTokenValue, keyPrefix = '') => {
                const combinedKey = keyPrefix ? `${keyPrefix}-${currentTokenKey}` : currentTokenKey.toString();

                if (typeof currentTokenValue === 'object' && currentTokenValue !== null && !isDirectCssValue(currentTokenValue)) {
                    // 중첩된 객체인 경우, 내부를 다시 순회
                    for (const [childKey, childValue] of Object.entries(currentTokenValue)) {
                        processTokenEntry(childKey, childValue, combinedKey);
                    }
                } else {
                    // 실제 값에 도달한 경우, 규칙 생성
                    for (const ruleDef of rules) {
                        if (!ruleDef.selectorPattern || !ruleDef.prop) {
                            console.warn(`[MyCustomUtilityGenerator] Invalid rule definition in utility "${name}" for key "${combinedKey}":`, ruleDef);
                            continue;
                        }

                        let finalCssValue = currentTokenValue;

                        // 1. valueTransform 함수 적용
                        if (ruleDef.valueTransform && typeof ruleDef.valueTransform === 'function') {
                            finalCssValue = ruleDef.valueTransform(currentTokenValue, combinedKey, theme);
                        }
                        // 2. ruleDef.value에 {value} 플레이스홀더가 있는 경우
                        else if (typeof ruleDef.value === 'string' && ruleDef.value.includes('{value}')) {
                            finalCssValue = ruleDef.value.replace(/{value}/g, String(currentTokenValue)); // 명시적 문자열 변환
                        }
                        // 3. ruleDef.value가 고정 값으로 정의된 경우 (valueTransform 없고 {value}도 없을 때)
                        else if (Object.prototype.hasOwnProperty.call(ruleDef, 'value')) {
                            finalCssValue = ruleDef.value;
                        }
                        // 4. 위 모두 해당 없으면 토큰 값(currentTokenValue)을 그대로 사용

                        const selector = ruleDef.selectorPattern.replace(/{key}/g, combinedKey);
                        const propsToApply = Array.isArray(ruleDef.prop) ? ruleDef.prop : [ruleDef.prop];
                        
                        const decls = [];
                        for (const propName of propsToApply) {
                            // finalCssValue가 undefined나 null일 경우 decl을 추가하지 않거나, 특별한 처리를 할 수 있음.
                            // 여기서는 그대로 전달.
                            decls.push(postcss.decl({ prop: propName, value: String(finalCssValue) })); // CSS 값은 문자열이어야 함
                        }
                        
                        if (decls.length > 0) {
                            generatedRules.push(postcss.rule({ selector }).append(...decls));
                        }
                    }
                }
            };

            for (const [key, value] of Object.entries(tokenSet)) {
                processTokenEntry(key, value);
            }

        } else {
            // tokenPath가 없는 정적 유틸리티 (예: display)
            for (const ruleDef of rules) {
                const { selectorPattern, prop, value } = ruleDef;
                if (!selectorPattern || !prop || !Object.prototype.hasOwnProperty.call(ruleDef, 'value')) {
                    console.warn(`[MyCustomUtilityGenerator] Invalid static rule definition in utility "${name}": `, ruleDef);
                    continue;
                }

                const propsToApply = Array.isArray(prop) ? prop : [prop];
                const decls = propsToApply.map(p => postcss.decl({ prop: p, value: String(value) }));

                generatedRules.push(postcss.rule({ selector: selectorPattern }).append(...decls));
            }
        }
    }
    return generatedRules;
}

module.exports = {
    isDirectCssValue,
    getPostCssUtilities
};

