const postcss = require('postcss');
const createMyUtilityPlugin = require('../src/postcss-plugin');


async function run(inputCss, userConfig = {}, pluginOptions = {}) {
  const pluginInstance = createMyUtilityPlugin(userConfig);
  const result = await postcss([pluginInstance]).process(inputCss, {
    from: undefined,
    ...pluginOptions,
  });
  return result.css;
}

describe('My Custom Utility Generator Plugin', () => {
  it('should generate default spacing utilities (padding)', async () => {
    const userConfig = {
      theme: {
            spacing: {
                1: '0.25rem',
                2: '0.5rem', 
                3: '0.75rem',
                4: '1rem',
            },
      },
      utilities: [{
            name: 'spacing',
            tokenPath: 'spacing',
            rules: [
                { selectorPattern: '.p-{key}', prop: ['padding'] },
                { selectorPattern: '.pt-{key}', prop: ['padding-top'] },
                { selectorPattern: '.pr-{key}', prop: ['padding-right'] },
                { selectorPattern: '.pb-{key}', prop: ['padding-bottom'] },
                { selectorPattern: '.p-{key}', prop: ['padding'] },
                { selectorPattern: '.pl-{key}', prop: ['padding-left'] },
                { selectorPattern: '.px-{key}', prop: ['padding-left', 'padding-right'] },
                { selectorPattern: '.py-{key}', prop: ['padding-top', 'padding-bottom'] },
            ]
        }],
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.p-1\s*{\s*padding:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.p-2\s*{\s*padding:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.pt-1\s*{\s*padding-top:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.pr-2\s*{\s*padding-right:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.pb-3\s*{\s*padding-bottom:\s*0\.75rem\s*}/);
    expect(css).toMatch(/\.pl-4\s*{\s*padding-left:\s*1rem\s*}/);
  });

  it('should generate default spacing utilities (margin)', async () => {
    const userConfig = {
      theme: {
            spacing: {
                1: '0.25rem',
                2: '0.5rem', 
                3: '0.75rem',
                4: '1rem',
            },
      },
      utilities: [{
            name: 'spacing',
            tokenPath: 'spacing',
            rules: [
                { selectorPattern: '.m-{key}', prop: ['margin'] },
                { selectorPattern: '.mt-{key}', prop: ['margin-top'] },
                { selectorPattern: '.mr-{key}', prop: ['margin-right'] },
                { selectorPattern: '.mb-{key}', prop: ['margin-bottom'] },
                { selectorPattern: '.ml-{key}', prop: ['margin-left'] },
                { selectorPattern: '.mx-{key}', prop: ['margin-left', 'margin-right'] },
                { selectorPattern: '.my-{key}', prop: ['margin-top', 'margin-bottom'] },
            ]
        }],
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.m-1\s*{\s*margin:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.m-2\s*{\s*margin:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.mt-1\s*{\s*margin-top:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.mr-2\s*{\s*margin-right:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.mb-3\s*{\s*margin-bottom:\s*0\.75rem\s*}/);
    expect(css).toMatch(/\.ml-4\s*{\s*margin-left:\s*1rem\s*}/);
  });

  it('should generate default color utilities (textColor)', async () => {
    const userConfig = {
        theme: { 
            colors: {
                blue: {
                    100: '#F0F4FF',
                    200: '#E0E7FF',
                    300: '#BFDBFE',
                    400: '#93C5FD',
                },
                red: {
                    100: '#FEE2E2',
                    200: '#FCA5A5',
                    300: '#F87171',
                    400: '#EF4444',
                },        
            } 
        },
        utilities: [{
            name: 'colors',
            tokenPath: 'colors',
            rules: [{ selectorPattern: '.text-{key}', prop: ['color'] }]
        }]  
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.text-blue-100\s*{\s*color:\s*#F0F4FF\s*}/);
    expect(css).toMatch(/\.text-blue-400\s*{\s*color:\s*#93C5FD\s*}/);
    expect(css).toMatch(/\.text-red-100\s*{\s*color:\s*#FEE2E2\s*}/);
    expect(css).toMatch(/\.text-red-300\s*{\s*color:\s*#F87171\s*}/);
  });

  it('should generate default color utilities (backgroundColor)', async () => {
    const userConfig = {
        theme: { 
            colors: {
                blue: {
                    100: '#F0F4FF',
                    200: '#E0E7FF',
                    300: '#BFDBFE',
                    400: '#93C5FD',
                },
                red: {
                    100: '#FEE2E2',
                    200: '#FCA5A5',
                    300: '#F87171',
                    400: '#EF4444',
                },        
            } 
        },
        utilities: [{
            name: 'colors',
            tokenPath: 'colors',
            rules: [{ selectorPattern: '.bg-{key}', prop: ['background-color'] }]
        }]  
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.bg-blue-200\s*{\s*background-color:\s*#E0E7FF\s*}/);
    expect(css).toMatch(/\.bg-red-400\s*{\s*background-color:\s*#EF4444\s*}/);
  });

  it('should generate default opacity utilities', async () => {
    const userConfig = {
      theme: {
            opacity: { '0': '0', '25': '0.25', '50': '0.5', '75': '0.75', '100': '1' }
      },
      utilities: [{
            name: 'customOpacity',
            tokenPath: 'opacity',   // theme.opacity 값을 사용
            rules: [{ selectorPattern: '.opacity-{key}', prop: 'opacity' }]
        }]
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.opacity-0\s*{\s*opacity:\s*0\s*}/);
    expect(css).toMatch(/\.opacity-25\s*{\s*opacity:\s*0\.25\s*}/);
    expect(css).toMatch(/\.opacity-50\s*{\s*opacity:\s*0\.5\s*}/);
    expect(css).toMatch(/\.opacity-100\s*{\s*opacity:\s*1\s*}/);
  });

  // ---------------------------------------------------------------------------
  // 사용자 정의 테마 및 유틸리티 규칙 테스트
  // ---------------------------------------------------------------------------

  it('should generate utilities with user-defined theme and new rules', async () => {
    const userConfig = {
      theme: {
        customFontSize: {
          'sm': '12px',
          'md': '16px',
          'lg': '20px',
        },
        brand: {
          primary: '#007bff',
          secondary: '#6c757d',
        },
      },
      utilities: [
        {
          name: 'customTextSize',
          tokenPath: 'customFontSize',
          rules: [{ selectorPattern: '.font-{key}', prop: 'font-size' }],
        },
        {
          name: 'brandBorderColor',
          tokenPath: 'brand',
          rules: [{ selectorPattern: '.border-brand-{key}', prop: 'border-color' }],
        },
      ],
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.font-sm\s*{\s*font-size:\s*12px\s*}/);
    expect(css).toMatch(/\.font-lg\s*{\s*font-size:\s*20px\s*}/);
    expect(css).toMatch(/\.border-brand-primary\s*{\s*border-color:\s*#007bff\s*}/);
    expect(css).toMatch(/\.border-brand-secondary\s*{\s*border-color:\s*#6c757d\s*}/);
  });

  // ---------------------------------------------------------------------------
  // 정적 유틸리티 (tokenPath 없는 경우) 테스트
  // ---------------------------------------------------------------------------

  it('should generate static utilities without tokenPath', async () => {
    const userConfig = {
      theme: {},
      utilities: [
        {
          name: 'cursor',
          rules: [
            { selectorPattern: '.cursor-auto', prop: 'cursor', value: 'auto' },
            { selectorPattern: '.cursor-pointer', prop: 'cursor', value: 'pointer' },
            { selectorPattern: '.cursor-not-allowed', prop: 'cursor', value: 'not-allowed' },
          ],
        },
        {
            name: 'display',
            rules: [
              { selectorPattern: '.is-block', prop: 'display', value: 'block' },
              { selectorPattern: '.is-flex', prop: 'display', value: 'flex' },
            ]
        }
      ],
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.cursor-pointer\s*{\s*cursor:\s*pointer\s*}/);
    expect(css).toMatch(/\.cursor-not-allowed\s*{\s*cursor:\s*not-allowed\s*}/);
    expect(css).toMatch(/\.is-block\s*{\s*display:\s*block\s*}/);
    expect(css).toMatch(/\.is-flex\s*{\s*display:\s*flex\s*}/);
  });

//   // ---------------------------------------------------------------------------
//   // 테마 병합 테스트 (기본값 확장 및 덮어쓰기)
//   // ---------------------------------------------------------------------------

  it('should merge user theme with default theme and generate utilities', async () => {
    const userConfig = {
      theme: {
        spacing: {
          '1': '0.2rem',
          '5': '1.25rem',
        },
        colors: {
          green: {
            '500': '#10B981',
          },
          blue: {
            '50': '#EBF8FF',
            '100': '#D1EAFD',
          },
        },
      },
        utilities: [
            {
                name: 'spacing',
                tokenPath: 'spacing',
                rules: [
                    { selectorPattern: '.p-{key}', prop: ['padding'] },
                    { selectorPattern: '.pt-{key}', prop: ['padding-top'] },
                    { selectorPattern: '.pr-{key}', prop: ['padding-right'] },
                    { selectorPattern: '.pb-{key}', prop: ['padding-bottom'] },
                    { selectorPattern: '.p-{key}', prop: ['padding'] },
                    { selectorPattern: '.pl-{key}', prop: ['padding-left'] },
                    { selectorPattern: '.px-{key}', prop: ['padding-left', 'padding-right'] },
                    { selectorPattern: '.py-{key}', prop: ['padding-top', 'padding-bottom'] },
                ]
            },
            {
                name: 'colors',
                tokenPath: 'colors',
                rules: [
                    { selectorPattern: '.text-{key}', prop: ['color'] },
                ]
            }
        ]
    };
    const css = await run('', userConfig);

    // Spacing (padding)
    expect(css).toMatch(/\.p-1\s*{\s*padding:\s*0\.2rem\s*}/);   // 덮어쓴 값
    expect(css).toMatch(/\.p-2\s*{\s*padding:\s*0\.5rem\s*}/);   // 기본값 유지
    expect(css).toMatch(/\.p-5\s*{\s*padding:\s*1\.25rem\s*}/); // 추가된 값

    // Text Color
    expect(css).toMatch(/\.text-blue-50\s*{\s*color:\s*#EBF8FF\s*}/);   // 추가된 shade
    expect(css).toMatch(/\.text-blue-100\s*{\s*color:\s*#D1EAFD\s*}/);  // 추가된 shade
  });


  // ---------------------------------------------------------------------------
  // valueTransform 사용 테스트
  // ---------------------------------------------------------------------------
  it('should apply valueTransform function to token values', async () => {
    const userConfig = {
      theme: {
        lineHeight: {
          'tight': 1.25,
          'normal': 1.5,
          'loose': 2,
        },
        rawSizes: {
            'small': 10,
            'medium': 20
        }
      },
      utilities: [
        {
          name: 'leading',
          tokenPath: 'lineHeight',
          rules: [
            {
              selectorPattern: '.leading-{key}',
              prop: 'line-height',
              // valueTransform: (value) => String(value) // 숫자를 문자열로 변환 (기본 동작과 유사)
              // 여기서는 토큰 값 자체가 유효한 CSS 값이므로 valueTransform 불필요, 자동 String 변환 확인
            },
          ],
        },
        {
            name: 'pixelWidth',
            tokenPath: 'rawSizes',
            rules: [
                {
                    selectorPattern: '.w-px-{key}',
                    prop: 'width',
                    valueTransform: (value, key, theme) => `${value * 2}px` // 값 2배 후 px 단위 추가
                }
            ]
        }
      ],
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.leading-tight\s*{\s*line-height:\s*1\.25\s*}/);
    expect(css).toMatch(/\.leading-normal\s*{\s*line-height:\s*1\.5\s*}/);
    expect(css).toMatch(/\.w-px-small\s*{\s*width:\s*20px\s*}/);
    expect(css).toMatch(/\.w-px-medium\s*{\s*width:\s*40px\s*}/);
  });

  // ---------------------------------------------------------------------------
  // 규칙 정의 내 value 플레이스홀더 및 고정 값 사용 테스트
  // ---------------------------------------------------------------------------
  it('should use {value} placeholder or fixed value in rule definition', async () => {
    const userConfig = {
        theme: {
            borders: {
                'thin': '1px',
                'medium': '2px'
            }
        },
        utilities: [
            {
                name: 'borderStyle',
                tokenPath: 'borders',
                rules: [
                    {
                        selectorPattern: '.border-custom-{key}',
                        prop: 'border',
                        value: '{value} solid currentColor' // {value} 플레이스홀더 사용
                    }
                ]
            },
            {
                name: 'importantDisplay',
                rules: [
                    {
                        selectorPattern: '.d-block-important',
                        prop: 'display',
                        value: 'block !important' // 고정 값 사용 (tokenPath 없음)
                    }
                ]
            }
        ]
    };
    const css = await run('', userConfig);

    expect(css).toMatch(/\.border-custom-thin\s*{\s*border:\s*1px solid currentColor\s*}/);
    expect(css).toMatch(/\.border-custom-medium\s*{\s*border:\s*2px solid currentColor\s*}/);
    expect(css).toMatch(/\.d-block-important\s*{\s*display:\s*block !important\s*}/);
  });

  // ---------------------------------------------------------------------------
  // 에지 케이스 및 잘못된 설정 테스트
  // ---------------------------------------------------------------------------

  it('should skip utility if tokenPath is not found in theme', async () => {
    console.warn = jest.fn();
    const userConfig = {
      theme: {
        spacing: { '1': '4px' }
      },
      utilities: [
        {
          name: 'nonExistentToken',
          tokenPath: 'this.path.does.not.exist', // 존재하지 않는 토큰 경로
          rules: [{ selectorPattern: '.test-{key}', prop: 'padding' }],
        },
        { // 이 유틸리티는 정상적으로 생성되어야 함
          name: 'padding',
          tokenPath: 'spacing',
          rules: [{ selectorPattern: '.p-{key}', prop: 'padding'}]
        }
      ],
    };
    const css = await run('', userConfig);

    expect(css).not.toMatch(/\.test-/); // nonExistentToken 유틸리티는 생성되지 않아야 함
    expect(css).toMatch(/\.p-1\s*{\s*padding:\s*4px\s*}/); // 정상 유틸리티는 생성
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('[MyCustomUtilityGenerator] Token path "this.path.does.not.exist" for utility "nonExistentToken" not found in theme. Skipping.'));
    console.warn.mockRestore();
  });

  it('should skip utility if tokenPath resolves to non-object (and not a direct value for the rule)', async () => {
    console.warn = jest.fn();
    const userConfig = {
        theme: {
            myValue: 'not-an-object' // tokenPath가 객체가 아닌 값을 가리킴
        },
        utilities: [
            {
                name: 'problematicUtility',
                tokenPath: 'myValue', // tokenSet이 객체가 아님
                rules: [{ selectorPattern: '.problem-{key}', prop: 'content'}]
            }
        ]
    };
    const css = await run('', userConfig);
    expect(css).not.toMatch(/\.problem-/);
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('[MyCustomUtilityGenerator] Token path "myValue" for utility "problematicUtility" is not an object. Skipping.'));
    console.warn.mockRestore();
  });


  it('should handle empty or invalid rules gracefully', async () => {
    console.warn = jest.fn();
    const userConfig = {
        theme: {
            gap: { '1': '4px' }
        },
        utilities: [
            {
                name: 'noRulesUtil',
                tokenPath: 'gap',
                rules: [] // 빈 규칙
            },
            {
                name: 'invalidRuleUtil',
                tokenPath: 'spagapcing',
                rules: [{ selectorPattern: '.invalid-{key}' }] // prop 없음
            },
            {
                name: 'anotherInvalid',
                tokenPath: 'gap',
                rules: [{ prop: 'gap1111' }] // selectorPattern 없음
            }
        ]
    };
    const css = await run('', userConfig);
    // gap 유틸리티를 생성하지 않았는지 검증
    expect(css).not.toMatch(/\.gap-1\s*{\s*gap:\s*4px\s*}/);
    console.warn.mockRestore();
  });

  it('should handle multiple props in a rule definition', async () => {
    const userConfig = {
        theme: {
            spacing: { 'sm': '8px', 'md': '16px' }
        },
        utilities: [
            {
                name: 'marginAxis',
                tokenPath: 'spacing',
                rules: [
                    { selectorPattern: '.mx-{key}', prop: ['margin-left', 'margin-right'] },
                    { selectorPattern: '.my-{key}', prop: ['margin-top', 'margin-bottom'] }
                ]
            }
        ]
    };
    const css = await run('', userConfig);
    expect(css).toMatch(/\.mx-sm\s*{\s*margin-left:\s*8px;\s*margin-right:\s*8px\s*}/);
    expect(css).toMatch(/\.my-md\s*{\s*margin-top:\s*16px;\s*margin-bottom:\s*16px\s*}/);
  });

});