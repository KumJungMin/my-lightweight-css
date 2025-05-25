import postcss from 'postcss';
import config from './config.js';
import { getPostCssUtilities } from './utils.js';

export default {
  postcssPlugin: 'css-utility-generator',
  Once(root) {
    const rules = getPostCssUtilities({
      utilities: config.utilities,
      theme: config.theme
    });
    if (!rules.length) return;

    const layer = postcss.atRule({ name: 'layer', params: 'utilities' });
    layer.append(...rules);

    root.append(layer);
  }
};
