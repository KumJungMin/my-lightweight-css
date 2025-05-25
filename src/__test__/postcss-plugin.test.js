import postcss from 'postcss';
import UtilityPlugin from '../plugins/postcss/index.js';

async function run(inputCss) {
  const pluginInstance = UtilityPlugin;
  const result = await postcss([pluginInstance]).process(inputCss);
  return result.css;
}

describe('My Custom Utility Generator Plugin', () => {
  it('should generate default spacing utilities (padding)', async () => {
    const css = await run('');

    expect(css).toMatch(/\.p-1\s*{\s*padding:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.p-2\s*{\s*padding:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.pt-1\s*{\s*padding-top:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.pr-2\s*{\s*padding-right:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.pb-3\s*{\s*padding-bottom:\s*0\.75rem\s*}/);
    expect(css).toMatch(/\.pl-4\s*{\s*padding-left:\s*1rem\s*}/);
  });

  it('should generate default spacing utilities (margin)', async () => {
    const css = await run('');

    expect(css).toMatch(/\.m-1\s*{\s*margin:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.m-2\s*{\s*margin:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.mt-1\s*{\s*margin-top:\s*0\.25rem\s*}/);
    expect(css).toMatch(/\.mr-2\s*{\s*margin-right:\s*0\.5rem\s*}/);
    expect(css).toMatch(/\.mb-3\s*{\s*margin-bottom:\s*0\.75rem\s*}/);
    expect(css).toMatch(/\.ml-4\s*{\s*margin-left:\s*1rem\s*}/);
  });

  it('should generate default color utilities (backgroundColor)', async () => {
    const css = await run('');

    expect(css).toMatch(/\.bg-blue-100\s*{\s*background-color:\s*#F0F4FF\s*}/);
    expect(css).toMatch(/\.bg-blue-400\s*{\s*background-color:\s*#93C5FD\s*}/);
    expect(css).toMatch(/\.bg-red-100\s*{\s*background-color:\s*#FEE2E2\s*}/);
    expect(css).toMatch(/\.bg-red-300\s*{\s*background-color:\s*#F87171\s*}/);
  });

  it('should generate default color utilities (backgroundColor)', async () => {
    const css = await run('');

    expect(css).toMatch(/\.bg-blue-200\s*{\s*background-color:\s*#E0E7FF\s*}/);
    expect(css).toMatch(/\.bg-red-400\s*{\s*background-color:\s*#EF4444\s*}/);
  });

  it('should generate default opacity utilities', async () => {
    const css = await run('');

    expect(css).toMatch(/\.op-0\s*{\s*opacity:\s*0\s*}/);
    expect(css).toMatch(/\.op-25\s*{\s*opacity:\s*0\.25\s*}/);
    expect(css).toMatch(/\.op-50\s*{\s*opacity:\s*0\.5\s*}/);
    expect(css).toMatch(/\.op-100\s*{\s*opacity:\s*1\s*}/);
  });
});

describe('Flexbox utilities', () => {
  it('should generate flexbox utilities', async () => {
    const css = await run('');

    expect(css).toMatch(/\.flex-center\s*{\s*display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center\s*}/);
  });
});