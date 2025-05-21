
const defaultConfig = require('./default-config.js');
const { mergeDeep } = require('./utils.js');
const { getPostCssUtilities } = require('./utility-generators.js');

module.exports = (userConfig = {}) => {
  return {
    postcssPlugin: 'my-custom-utility-generator',
    Once(root) {
        const baseTheme = defaultConfig.theme ? JSON.parse(JSON.stringify(defaultConfig.theme)) : {};
        const finalTheme = mergeDeep(baseTheme, userConfig.theme || {});

        const finalUtilities = [
            ...(defaultConfig.utilities || []),
            ...(userConfig.utilities || [])
        ];
        
        const generatedCssRules = getPostCssUtilities({ utilities: finalUtilities, theme: finalTheme });

        if (generatedCssRules.length > 0) {
            root.append(...generatedCssRules);
        }
    }
  };
};
