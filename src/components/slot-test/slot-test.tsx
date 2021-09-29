import { Component, h } from '@stencil/core';

@Component({
  tag: 'slot-test',
  styleUrl: 'slot-test.css',
  shadow: true,
})
export class SlotTest {
  render() {
    return [
      <slot name="item-start" />,
      <h1>Here is my main content</h1>,
      <slot name="item-end" />
    ]
  }
}
