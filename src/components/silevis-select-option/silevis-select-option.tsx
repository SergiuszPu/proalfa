import { Component, h, Event, EventEmitter, Prop, Host } from '@stencil/core';

@Component({
  tag: 'silevis-select-option',
  styleUrl: 'silevis-select-option.css',
  shadow: true,
})
export class SilevisSelectOption {
  @Event({ eventName: 'silevisSelectActivated' }) silevisSelectActivated: EventEmitter<any>;
  @Prop({ mutable: true }) active: boolean;
  @Prop() hide: boolean;

  handleChange() {
    this.active = !this.active;
    this.silevisSelectActivated.emit();
  }

  render() {
    return (
      <div
        onClick={() => this.handleChange()}
        class={{
          options: true,
          active: this.active,
          hide: this.hide,
        }}
      >
        <slot name="image" />
        <h1><slot></slot></h1>
      </div>
    );
  }
}
