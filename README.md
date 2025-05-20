# my-lightweight-css


// src/default-config.js 또는 사용자가 제공하는 설정 파일
module.exports = {
  theme: { // 기존 테마 토큰은 그대로 유지
    spacing: {
      '1': '0.25rem', '2': '0.5rem', '3': '0.75rem', '4': '1rem',
    },
    colors: {
      blue: { '500': '#3b82f6', '600': '#2563eb' },
      red: { '500': '#ef4444' },
    },
    opacity: { // 예시: 새로운 테마 토큰
      '0': '0', '25': '0.25', '50': '0.5', '75': '0.75', '100': '1',
    }
  },
  utilities: [ // 사용자가 직접 유틸리티 규칙을 정의하는 부분
    {
      name: 'padding',
      tokenPath: 'spacing', // theme.spacing 값을 사용
      rules: [ // 동일한 토큰으로 여러 규칙 생성 가능 (예: p, pt, pb 등)
        { selectorPattern: '.p-{key}', prop: 'padding' },
        { selectorPattern: '.pt-{key}', prop: 'padding-top' },
        { selectorPattern: '.pb-{key}', prop: 'padding-bottom' },
        { selectorPattern: '.pl-{key}', prop: 'padding-left' },
        { selectorPattern: '.pr-{key}', prop: 'padding-right' },
      ]
    },
    {
      name: 'margin',
      tokenPath: 'spacing',
      rules: [
        { selectorPattern: '.m-{key}', prop: 'margin' },
        { selectorPattern: '.mt-{key}', prop: 'margin-top' },
        // ... mb, ml, mr
      ]
    },
    {
      name: 'textColor',
      tokenPath: 'colors', // theme.colors 값을 사용 (중첩 객체 처리 필요)
      rules: [
        // 중첩된 색상 객체를 처리하기 위해 패턴에 {shadeKey} 추가
        { selectorPattern: '.text-{key}-{shadeKey}', prop: 'color' }
      ]
    },
    {
      name: 'backgroundColor',
      tokenPath: 'colors',
      rules: [
        { selectorPattern: '.bg-{key}-{shadeKey}', prop: 'background-color' }
      ]
    },
    {
      name: 'customOpacity', // 사용자가 직접 정의하는 유틸리티 예시
      tokenPath: 'opacity',   // theme.opacity 값을 사용
      rules: [
        {
          selectorPattern: '.opacity-{key}',
          prop: 'opacity',
          // valueTransform: (value) => `${parseFloat(value) / 100}` // 필요하다면 값 변환
        }
      ]
    },
    {
      name: 'display', // 테마 토큰을 사용하지 않는 단순 유틸리티 예시
      // tokenPath 를 생략하거나 빈 값으로 두면, rules 에 직접 value 명시
      rules: [
        { selectorPattern: '.block', prop: 'display', value: 'block' },
        { selectorPattern: '.inline-block', prop: 'display', value: 'inline-block' },
        { selectorPattern: '.flex', prop: 'display', value: 'flex' },
        { selectorPattern: '.hidden', prop: 'display', value: 'none' },
      ]
    }
  ]
};