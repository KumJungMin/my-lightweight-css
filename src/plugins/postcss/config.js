export default {
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
        },
        spacing: {
            1: '0.25rem',
            2: '0.5rem', 
            3: '0.75rem',
            4: '1rem',
        },
        opacity: { 
            '0': '0', '25': '0.25', '50': '0.5', '75': '0.75', '100': '1',
        },
        fontSize: {
            'sm': '12px',
            'md': '16px',
            'lg': '20px',
        },
    },
    
    utilities: [ 
        {
            name: 'colors',
            tokenPath: 'colors',
            rules: [{ selectorPattern: '.bg-{key}', prop: ['background-color'] }]
        },
        {
            name: 'customOpacity',
            tokenPath: 'opacity',   // use theme.opacity
            rules: [{ selectorPattern: '.op-{key}', prop: 'opacity' }]
        },
        {
            name: 'display', // not use theme tokens, static utility
            rules: [
                { selectorPattern: '.block', prop: 'display', value: 'block' },
                { selectorPattern: '.inline-block', prop: 'display', value: 'inline-block' },
                { selectorPattern: '.flex', prop: 'display', value: 'flex' },
                { selectorPattern: '.hidden', prop: 'display', value: 'none' },
            ]
        },
        {
            name: 'spacing',
            tokenPath: 'spacing',   // use theme.spacing
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
            name: 'flex',
            rules: [
                { selectorPattern: '.flex-center', 
                    prop: ['display', 'align-items', 'justify-content'], 
                    value: ['flex', 'center', 'center'] 
                },
            ]
        },
        {
            name: 'textSize',
            tokenPath: 'fontSize',
            rules: [{ selectorPattern: '.font-{key}', prop: 'font-size' }],
        },
    ]
}