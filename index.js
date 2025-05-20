const postcss = require('postcss');
const fs = require('fs-extra');
const path = require('path');
const createMyUtilityPlugin = require('./src/postcss-plugin'); 

/**
 * PostCSS 플러그인 자체를 반환하는 함수 (사용자가 직접 PostCSS 설정에 사용)
 * @param {object} userConfig - 사용자 정의 테마 설정
 * @returns {object} PostCSS 플러그인
 */
function myUtilitiesPostcssPlugin(userConfig = {}) {
  return createMyUtilityPlugin(userConfig);
}

/**
 * CSS 파일을 직접 생성하는 함수
 * @param {object} options
 * @param {string} options.outputFile - 생성될 CSS 파일 경로
 * @param {object} [options.userConfig] - 사용자 정의 테마 설정
 * @param {string} [options.inputFile] - (선택) 기본 CSS 파일 경로 (여기에 유틸리티가 추가됨)
 * @param {boolean} [options.purge] - (선택) PurgeCSS 적용 여부 (프로덕션용)
 * @param {string[]} [options.purgeContent] - (선택) PurgeCSS가 스캔할 파일 경로들
 */
async function generateUtilitiesCss({
  outputFile,
  userConfig = {},
  inputFile = null,
  purge = false,
  purgeContent = ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
}) {
  if (!outputFile) {
    throw new Error('outputFile is required.');
  }

  const plugins = [createMyUtilityPlugin(userConfig)];

  if (purge) {
    const purgecss = require('@fullhuman/postcss-purgecss');
    plugins.push(
      purgecss({
        content: purgeContent,
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      })
    );
  }

  let cssContent = '';
  if (inputFile && await fs.pathExists(inputFile)) {
    cssContent = await fs.readFile(inputFile, 'utf8');
  }

  try {
    const result = await postcss(plugins).process(cssContent, {
      from: inputFile || undefined, // 입력 파일 경로
      to: outputFile,             // 출력 파일 경로
    });

    await fs.ensureDir(path.dirname(outputFile)); // 출력 디렉토리 확인 및 생성
    await fs.writeFile(outputFile, result.css);

    if (result.map) {
      await fs.writeFile(outputFile + '.map', result.map.toString());
    }
    console.log(`Successfully generated CSS to ${outputFile}`);
  } catch (error) {
    console.error(`Error generating CSS: ${error}`);
    throw error;
  }
}

module.exports = {
  myUtilitiesPostcssPlugin, // PostCSS 플러그인으로 사용
  generateUtilitiesCss,    // CSS 파일 생성 함수로 사용
};