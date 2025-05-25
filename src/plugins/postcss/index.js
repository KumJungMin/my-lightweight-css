import config from './config.js';
import { getPostCssUtilities } from './utils.js';

export default {
  postcssPlugin: 'css-utility-generator',
  Once(root) {
      const generatedCssRules = getPostCssUtilities({ utilities: config.utilities, theme: config.theme });

      if (generatedCssRules.length > 0) {
          root.append(...generatedCssRules);
      }
  }
};

export const postcss = true;