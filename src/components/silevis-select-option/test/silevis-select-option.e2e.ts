import { newE2EPage } from '@stencil/core/testing';

describe('silevis-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<silevis-select-option></silevis-select-option>');

    const element = await page.find('silevis-select-option');
    expect(element).toHaveClass('hydrated');
  });
});
