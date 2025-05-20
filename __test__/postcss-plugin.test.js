// __tests__/postcss-plugin.test.js
const postcss = require('postcss');
const createMyUtilityPlugin = require('../src/postcss-plugin'); // 플러그인 가져오기 (경로 수정 필요 시)
const defaultConfig = require('../src/default-config'); // 기본 설정 가져오기

// PostCSS를 실행하고 결과를 반환하는 헬퍼 함수
async function run(inputCss, userConfig, pluginOptions = {}) {
  const pluginInstance = createMyUtilityPlugin(userConfig);
  const result = await postcss([pluginInstance]).process(inputCss, {
    from: undefined, // 테스트에서는 파일 경로를 명시하지 않아도 됨
    ...pluginOptions,
  });
  return result.css;
}

describe('My Custom Utility Generator Plugin', () => {
  it('should generate default spacing utilities', async () => {
    const userConfig = { theme: { spacing: defaultConfig.theme.spacing }, utilities: defaultConfig.utilities.filter(u => ['padding', 'margin'].includes(u.name)) };
    const css = await run('', userConfig);

    // Padding
    expect(css).toContain('.p-1 { padding: 0.25rem }');
    expect(css).toContain('.pt-2 { padding-top: 0.5rem }');
    // Margin
    expect(css).toContain('.m-1 { margin: 0.25rem }');
    expect(css).toContain('.mt-2 { margin-top: 0.5rem }');
  });

//   it('should generate default color utilities with shades', async () => {
//     const userConfig = { theme: { colors: defaultConfig.theme.colors }, utilities: defaultConfig.utilities.filter(u => ['textColor', 'backgroundColor'].includes(u.name)) };
//     const css = await run('', userConfig);

//     expect(css).toContain('.text-blue-500 { color: #3b82f6 }');
//     expect(css).toContain('.bg-red-500 { background-color: #ef4444 }');
//     expect(css).toContain('.text-blue-600 { color: #2563eb }');
//   });

//   it('should generate utilities with user-defined theme and rules', async () => {
//     const userConfig = {
//       theme: {
//         customSpacing: {
//           'small': '2px',
//           'medium': '4px',
//         },
//         brandColors: {
//           primary: '#ff0000',
//         },
//       },
//       utilities: [
//         {
//           name: 'customPadding',
//           tokenPath: 'customSpacing',
//           rules: [{ selectorPattern: '.custom-p-{key}', prop: 'padding' }],
//         },
//         {
//           name: 'brandTextColor',
//           // tokenPath 없이 직접 값 지정하는 유틸리티 규칙은 현재 구현에 없음.
//           // 만약 단일 색상 처리를 지원하도록 플러그인을 수정했다면 테스트 가능
//           // 여기서는 theme.brandColors를 사용하는 규칙으로 가정
//           tokenPath: 'brandColors',
//           rules: [{ selectorPattern: '.brand-text-{key}', prop: 'color'}]
//         },
//         {
//           name: 'fixedUtilities',
//           rules: [
//             { selectorPattern: '.cursor-pointer', prop: 'cursor', value: 'pointer' }
//           ]
//         }
//       ],
//     };
//     const css = await run('', userConfig);

//     expect(css).toContain('.custom-p-small { padding: 2px }');
//     expect(css).toContain('.custom-p-medium { padding: 4px }');
//     expect(css).toContain('.brand-text-primary { color: #ff0000 }');
//     expect(css).toContain('.cursor-pointer { cursor: pointer }');
//   });

//   it('should merge user config with default config correctly (if plugin supports deep merge)', async () => {
//     // 현재 플러그인은 defaultConfig를 내부에서 참조하고 userConfig와 병합함.
//     // 이 테스트는 mergeDeep 헬퍼가 올바르게 작동하는지 간접적으로 확인.
//     const userConfig = {
//       theme: {
//         spacing: { // 기본 spacing에 추가/덮어쓰기
//           '5': '1.25rem',
//           '1': '0.2rem', // 덮어쓰기
//         },
//         colors: {
//           customGreen: {
//             'DEFAULT': '#00ff00' // 새로운 색상
//           }
//         }
//       },
//       // utilities는 기본값을 사용한다고 가정하거나, 명시적으로 전달하여 테스트
//       utilities: [
//         ...defaultConfig.utilities.filter(u => ['padding'].includes(u.name)), // 기본 padding 규칙 사용
//         { // 새로운 색상 규칙
//             name: 'customGreenBg',
//             tokenPath: 'colors.customGreen', // 경로를 통해 접근
//             rules: [{ selectorPattern: '.bg-custom-green', prop: 'background-color'}] // shadeKey 없이
//         }
//       ]
//     };

//     // 플러그인이 내부적으로 defaultConfig와 userConfig를 병합하도록 되어 있음
//     const css = await run('', userConfig);

//     expect(css).toContain('.p-1 { padding: 0.2rem }'); // 덮어쓴 값
//     expect(css).toContain('.p-5 { padding: 1.25rem }'); // 추가된 값
//     // 기본 색상 (blue, red)이 생성되지 않음을 확인하거나,
//     // userConfig에 utilities를 명시적으로 전달하여 테스트 범위를 명확히 해야 함.
//     // 여기서는 customGreenBg 만 테스트
//     // .bg-custom-green 생성 로직을 플러그인에서 확인해야 함 (단일 값 처리)
//     // 현재 플러그인 로직은 colors의 하위가 객체(shades)일 것으로 예상.
//     // 단일 값 처리를 위해서는 플러그인 수정이 필요할 수 있음.
//     // 예시: theme.colors.customGreen.DEFAULT 를 사용하도록 하고, selectorPattern에서 shadeKey를 처리
//   });


//   it('should apply valueTransform if provided', async () => {
//     const userConfig = {
//       theme: {
//         rawNumbers: {
//           '10': 10,
//           '20': 20,
//         },
//       },
//       utilities: [
//         {
//           name: 'transformedPadding',
//           tokenPath: 'rawNumbers',
//           rules: [
//             {
//               selectorPattern: '.tp-{key}',
//               prop: 'padding',
//               valueTransform: (value) => `${value * 2}px`, // 값을 2배하고 px 단위 추가
//             },
//           ],
//         },
//       ],
//     };
//     const css = await run('', userConfig);
//     expect(css).toContain('.tp-10 { padding: 20px }');
//     expect(css).toContain('.tp-20 { padding: 40px }');
//   });

//   it('should handle utilities without tokenPath (fixed values)', async () => {
//     const userConfig = {
//         theme: {}, // 테마는 비워둠
//         utilities: [
//             {
//                 name: 'display',
//                 rules: [
//                   { selectorPattern: '.is-block', prop: 'display', value: 'block' },
//                   { selectorPattern: '.is-flex', prop: 'display', value: 'flex' },
//                 ]
//             }
//         ]
//     };
//     const css = await run('', userConfig);
//     expect(css).toContain('.is-block { display: block }');
//     expect(css).toContain('.is-flex { display: flex }');
//   });

//   // 색상 유틸리티에서 단일 색상 값 처리 (플러그인 수정 필요 가정)
//   // 만약 src/postcss-plugin.js 의 colors 처리 로직에 다음과 같은 부분을 추가했다면:
//   /*
//     else if (typeof value !== 'object' || Array.isArray(value)) { // 단일 값 또는 배열 값
//         // ...
//         // 단일 색상 값 (예: theme.colors.brand = '#ff0000') 처리
//         const selector = ruleDef.selectorPattern.replace('{key}', key); // shadeKey가 없다고 가정
//         const finalValue = ruleDef.valueTransform ? ruleDef.valueTransform(value) : value;
//         generatedUtilities.push(
//             postcss.rule({ selector }).append(postcss.decl({ prop: ruleDef.prop, value: finalValue }))
//         );
//     }
//   */
//   it('should handle single color values if plugin supports it', async () => {
//     const userConfig = {
//       theme: {
//         colors: {
//           'brand-primary': '#abcdef', // 단일 색상 값
//         }
//       },
//       utilities: [
//         {
//           name: 'brandTextColor',
//           tokenPath: 'colors',
//           rules: [
//             // {key}만 사용하는 패턴. {shadeKey}는 없는 단일 색상
//             { selectorPattern: '.text-{key}', prop: 'color' }
//           ]
//         }
//       ]
//     };
//     // 이 테스트를 통과하려면 플러그인의 색상 처리 로직이
//     // `theme.colors`의 값이 문자열(단일 색상)인 경우도 처리해야 합니다.
//     // 현재 플러그인 로직은 for (const [shadeKey, shadeValue] of Object.entries(value)) 를 사용하므로
//     // theme.colors.brandPrimary가 객체가 아니면 이 루프에 들어가지 않습니다.
//     // 플러그인을 수정하여 이 케이스를 처리해야 합니다.
//     // (위 주석의 로직 예시 참고)
//     const css = await run('', userConfig);
//     // 플러그인이 수정되었다고 가정하고 예상 결과 작성
//     expect(css).toContain('.text-brand-primary { color: #abcdef }');
//   });
});