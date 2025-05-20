const postcss = require('postcss');

function generateNestedColorUtilities({ value, ruleDef }) {
    const generatedUtilities = [];
    
    for (const [shadeKey, shadeValue] of Object.entries(value)) {
        const selector = ruleDef.selectorPattern
        .replace('{key}', key)
        .replace('{shadeKey}', shadeKey);
        const finalValue = ruleDef.valueTransform ? ruleDef.valueTransform(shadeValue) : shadeValue;

        generatedUtilities.push(
            postcss.rule({ selector }).append(postcss.decl({ prop: ruleDef.prop, value: finalValue }))
        );

        return generatedUtilities;
    }
}

function generateArrayOrRawValueUtilities({ key, value, ruleDef }) {
    const selector = key ? ruleDef.selectorPattern.replace('{key}', key) : ruleDef.selectorPattern;
    const finalValue = ruleDef.valueTransform ? ruleDef.valueTransform(value) : value;
    
    return postcss.rule({ selector }).append(postcss.decl({ prop: ruleDef.prop, value: finalValue }))
}

function generateUtilities({ ruleDef }) {
    const selector = ruleDef.selectorPattern;
    
    return postcss.rule({ selector }).append(postcss.decl({ prop: ruleDef.prop, value: ruleDef.value }))
}

module.exports = {
    generateNestedColorUtilities,
    generateArrayOrRawValueUtilities,
    generateUtilities
}