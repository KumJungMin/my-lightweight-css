const postcss = require('postcss');
const config = require('../tailwind-like.config.js');

module.exports = {
  postcssPlugin: 'my-utility-generator',
  Once(root) {
    const utilities = [];

    // Generate padding utilities
    for (const [key, value] of Object.entries(config.theme.spacing)) {
      utilities.push(postcss.rule({ selector: `.p-${key}` }).append(postcss.decl({ prop: 'padding', value })));
      utilities.push(postcss.rule({ selector: `.pt-${key}` }).append(postcss.decl({ prop: 'padding-top', value })));
      utilities.push(postcss.rule({ selector: `.pb-${key}` }).append(postcss.decl({ prop: 'padding-bottom', value })));
      utilities.push(postcss.rule({ selector: `.pl-${key}` }).append(postcss.decl({ prop: 'padding-left', value })));
      utilities.push(postcss.rule({ selector: `.pr-${key}` }).append(postcss.decl({ prop: 'padding-right', value })));
    }

    // Generate margin utilities
    for (const [key, value] of Object.entries(config.theme.spacing)) {
      utilities.push(postcss.rule({ selector: `.m-${key}` }).append(postcss.decl({ prop: 'margin', value })));
      utilities.push(postcss.rule({ selector: `.mt-${key}` }).append(postcss.decl({ prop: 'margin-top', value })));
      utilities.push(postcss.rule({ selector: `.mb-${key}` }).append(postcss.decl({ prop: 'margin-bottom', value })));
      utilities.push(postcss.rule({ selector: `.ml-${key}` }).append(postcss.decl({ prop: 'margin-left', value })));
      utilities.push(postcss.rule({ selector: `.mr-${key}` }).append(postcss.decl({ prop: 'margin-right', value })));
    }

    // Generate color utilities
    for (const [color, shades] of Object.entries(config.theme.colors)) {
      for (const [shade, value] of Object.entries(shades)) {
        utilities.push(postcss.rule({ selector: `.bg-${color}-${shade}` }).append(postcss.decl({ prop: 'background-color', value })));
        utilities.push(postcss.rule({ selector: `.text-${color}-${shade}` }).append(postcss.decl({ prop: 'color', value })));
      }
    }

    root.append(...utilities);
  }
};
