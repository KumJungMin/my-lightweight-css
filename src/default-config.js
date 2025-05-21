// default design token list

module.exports = {
    theme: {
        spacing: {
            1: '0.25rem',
            2: '0.5rem', 
            3: '0.75rem',
            4: '1rem',
        },
        opacity: { 
            '0': '0', '25': '0.25', '50': '0.5', '75': '0.75', '100': '1',
        }
    },
    
    utilities: [ 
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
    ]
}