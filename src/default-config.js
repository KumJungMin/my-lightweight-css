// default design token list

module.exports = {
    theme: {
        spacing: {
            1: '0.25rem',
            2: '0.5rem', 
            3: '0.75rem',
            4: '1rem',
        },
        
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
        },

        // 예시: 새로운 테마 토큰
        opacity: { 
            '0': '0', '25': '0.25', '50': '0.5', '75': '0.75', '100': '1',
        }
    },
    
    
    // 사용자가 직접 유틸리티 규칙을 정의하는 부분
    utilities: [ 
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
            rules: [
                { selectorPattern: '.block', prop: 'display', value: 'block' },
                { selectorPattern: '.inline-block', prop: 'display', value: 'inline-block' },
                { selectorPattern: '.flex', prop: 'display', value: 'flex' },
                { selectorPattern: '.hidden', prop: 'display', value: 'none' },
            ]
        },
        {
            name: 'spacing', // 테마 토큰을 사용하지 않는 단순 유틸리티 예시
            tokenPath: 'spacing',   // theme.spacing 값을 사용
            rules: [
                { selectorPattern: '.m-{key}', prop: ['margin'] },
                { selectorPattern: '.mt-{key}', prop: ['margin-top'] },
                { selectorPattern: '.mr-{key}', prop: ['margin-right'] },
                { selectorPattern: '.mb-{key}', prop: ['margin-bottom'] },
                { selectorPattern: '.ml-{key}', prop: ['margin-left'] },
                { selectorPattern: '.mx-{key}', prop: ['margin-left', 'margin-right'] },
                { selectorPattern: '.my-{key}', prop: ['margin-top', 'margin-bottom'] },

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
            name: 'colors', // 테마 토큰을 사용하지 않는 단순 유틸리티 예시
            tokenPath: 'colors',   // theme.colors 값을 사용
            rules: [
                { selectorPattern: '.bg-{key}', prop: ['background-color'] },
                { selectorPattern: '.text-{key}', prop: ['color'] },
                { selectorPattern: '.border-{key}', prop: ['border-color'] },
            ]
        }
    ]
}