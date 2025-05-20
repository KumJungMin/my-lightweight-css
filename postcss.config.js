const myUtilityGenerator = require("./postcss-plugins/my-utility-generator.js");
const purgecss = require('@fullhuman/postcss-purgecss');

const plugins = [myUtilityGenerator];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    purgecss.default({
      content: ['./src/**/*.html', './src/**/*.js'],
      defaultExtractor: content =>
        content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
}

module.exports = {
  plugins
};