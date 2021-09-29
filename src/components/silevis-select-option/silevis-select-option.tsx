import { Component, h, Event, EventEmitter, Prop, Host } from '@stencil/core';
// TODO Zbędny import, nie pozostawiamy nieuzywanego kodu

// TODO Brak dokumentacji
@Component({
  tag: 'silevis-select-option',
  styleUrl: 'silevis-select-option.css',
  shadow: true,
})
export class SilevisSelectOption {
  // TODO `any`
  // TODO kolejność metod/własnoci publicnych i prewatnych, kolejność elementów dekorowanych wg Stencila
  // TODO Brak dokumentacji
  // TODO Nazwa enetu jest identyczna, zatem dodatkowy parametr jest zbędny
  @Event({ eventName: 'silevisSelectActivated' }) silevisSelectActivated: EventEmitter<any>;
  // TODO brak wartości domyślnych
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
