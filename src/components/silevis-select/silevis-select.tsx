import { Component, h, State, Listen, Element } from '@stencil/core';
// TODO nieuywany import, nieuporządkowe pliki w tym katalogu

// brak dokumentacji,
@Component({
  tag: 'silevis-select',
  styleUrl: 'silevis-select.css',
  shadow: true,
})
export class SilevisSelectComponent {
  // TODO formatowanie, brak ";"
  @State() selectedUser: string
  // TODO nieuzywane pole
  @State() active = true;
  // TODO zdaje się ze jedna własnosc od rozwiniecia wystarczy
  @State() hide = false
  @State() toggle = true;

  private slottedElements: HTMLElement[] = [];

  // TODO kolejnosc pól etc.
  @Listen('silevisSelectActivated')
  silevisSelectActivated(event: CustomEvent<any>) {
    this.slottedElements.filter(slot => {
      slot.setAttribute('active', 'false');
      if (slot === event.target) {
        slot.setAttribute('active', 'true');
      }
    });
  }

  // TODO zbędne publiczne metody
  handleSlotChange = (event: Event) => {
    if (!(event.target instanceof HTMLSlotElement)) {
      return;
    }
    this.slottedElements = event.target.assignedElements().filter((item: Element): item is HTMLElement => {
      return item instanceof HTMLElement;
    });
  };

  searchUser(event) {
    this.selectedUser = event.target.value.toLowerCase();
    this.slottedElements.filter(slot => {
      if (!/\d/.test(this.selectedUser) && !slot.innerText.toLowerCase().includes(this.selectedUser)) {
        // TODO tutaj zmienia się jeden argument, nie całe wywołanie setAttribute
        slot.setAttribute('hide', 'true')
      } else {
        slot.setAttribute('hide', 'false')
      }
    });
  }

  onToggle() {
    this.toggle = !this.toggle;
  }

  /**
   * TODO zwracana struktura nie jest zbyt przemyślana, zawiera te same elementy, ponadto częsci wspólnie nie mają
   * np: tych samych rodziców lub są one zbędne, do opakowania elementów polecam zamiast zwyklego "diva", element "Host"
   *
   *
   * @returns
   */
  render() {
    if (this.toggle) {
      return (
        <div class="options">
          <h1>Select User</h1>
          <div class="arrow" onClick={() => this.onToggle()}>
            &#8595;
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="options">
            <h1>------------------</h1>
            <div class="arrow" onClick={() => this.onToggle()}>
              &#8593;
            </div>
          </div>
          <input type="text" value={this.selectedUser} onInput={event => this.searchUser(event)} />
          <slot onSlotchange={this.handleSlotChange}>
            <h1>there is no option</h1>
          </slot>
        </div>
      );
    }
  }
}
