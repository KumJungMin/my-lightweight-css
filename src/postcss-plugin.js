const postcss = require('postcss');
const defaultConfig = require('./default-config.js');
const { mergeDeep, getThemeValue } = require('./utils.js');
const { generateUtilities, generateArrayOrRawValueUtilities, generateNestedColorUtilities } = require('./utility-generators.js');

module.exports = (userConfig = {}) => {
  const finalConfig = mergeDeep(defaultConfig, userConfig);
  const theme = finalConfig.theme || {};
  const utilityDefinitions = finalConfig.utilities || [];

  return {
    postcssPlugin: 'my-custom-utility-generator',
    Once(root) {
      const utilities = getPostCssUtilities({ utilityDefinitions, theme })

      if (utilities.length > 0) root.append(...utilities);
    }
  };
};


function getPostCssUtilities({ utilityDefinitions, theme }) {
    const generatedUtilities = [];

    utilityDefinitions.forEach(utilityDef => {
        const themeValues = getThemeValue(theme, utilityDef.tokenPath);

        utilityDef.rules.forEach(ruleDef => {
            if (themeValues && typeof themeValues === 'object' && !Array.isArray(themeValues)) {

                // Case1: when themeValues is an object (e.g., spacing, colors)
                for (const [key, value] of Object.entries(themeValues)) {
                    const isNestedColor = utilityDef.tokenPath === 'colors' && typeof value === 'object' && !Array.isArray(value); // (e.g., colors.blue.500)
                    const isArrayOrRawValue = typeof value !== 'object' || Array.isArray(value); // e.g., spacing.1
                
                    if (isNestedColor) {
                        generatedUtilities.push(...generateNestedColorUtilities({ value, ruleDef }));
                    } else if (isArrayOrRawValue) {
                    generatedUtilities.push(generateArrayOrRawValueUtilities({ key, value, ruleDef }));
                    }
                }
            } else if (ruleDef.value !== undefined) {
                // Case2: when not using theme values and directly specifying values in the rules (e.g., display utilities)
        
                generatedUtilities.push(generateUtilities({ ruleDef }));
            }
        });
    });
}