import { Component, h, Event, EventEmitter, Prop, Host } from '@stencil/core';

@Component({
  tag: 'silevis-select-option',
  styleUrl: 'silevis-select-option.scss',
  shadow: true,
})
export class SilevisSelectOption {
  // set active attribute to user slot
  @Prop({ mutable: true }) active = false;

  //hide and show user slot when filter
  @Prop() hide = false;

  //Emit clicked slot user
  @Event() silevisSelectActivated: EventEmitter<HTMLElement>;

  render() {
    return (
      <Host
        onClick={() => this.handleChange()}
        class={{
          active: this.active,
          hide: this.hide,
        }}
      >
        <slot name="image" />
        <h1>
          <slot></slot>
        </h1>
      </Host>
    );
  }

  private handleChange() {
    this.active = !this.active;
    this.silevisSelectActivated.emit();
  }
}
