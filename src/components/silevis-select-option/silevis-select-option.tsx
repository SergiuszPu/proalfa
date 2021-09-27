import { Component, h, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'silevis-select-option',
  styleUrl: 'silevis-select-option.css',
  shadow: true,
})
export class SilevisSelectOption {

  @State() selectUser: object;
  @State() selected: string | number;
  @State() value: string;
  @Event({ eventName: 'silevisSelectActivated' }) silevisSelectActivated: EventEmitter<Object>;
  @State() openTrue: boolean =true


  render() {
    return (
      <div class={{active: this.openTrue}}>
        <div class="options">
          <slot name="image" />
          <h1>
            <slot />
          </h1>
        </div>
      </div>
    );
  }
}