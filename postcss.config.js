import myUtilityGenerator from './src/plugins/postcss/index.js';
import purgecss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer'

const plugins = [myUtilityGenerator, autoprefixer];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    purgecss.default({
      content: ['./src/**/*.html', './src/**/*.vue'],
      defaultExtractor: content =>
        content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  );
}


export default {
  plugins,
};