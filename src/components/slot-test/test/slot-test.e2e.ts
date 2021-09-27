import { newE2EPage } from '@stencil/core/testing';

describe('slot-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<slot-test></slot-test>');

    const element = await page.find('slot-test');
    expect(element).toHaveClass('hydrated');
  });
});
