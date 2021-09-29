import { newSpecPage } from '@stencil/core/testing';
import { SlotTest } from '../slot-test';

describe('slot-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlotTest],
      html: `<slot-test></slot-test>`,
    });
    expect(page.root).toEqualHtml(`
      <slot-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </slot-test>
    `);
  });
});
