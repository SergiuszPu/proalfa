import { Component, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'silevis-select',
  styleUrl: 'silevis-select.css',
  shadow: true,
})
export class SilevisSelectComponent {
  @State() selectedUser: string
  @State() active = true;
  @State() hide = false
  @State() toggle: boolean = true;

  private slottedElements: HTMLElement[] = [];

  @Listen('silevisSelectActivated')
  silevisSelectActivated(event: CustomEvent<any>) {
    this.slottedElements.filter(slot => {
      slot.setAttribute('active', 'false');
      if (slot === event.target) {
        slot.setAttribute('active', 'true');
      }
    });
  }

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
      if (!slot.innerText.toLowerCase().includes(this.selectedUser)) {
        slot.setAttribute('hide', 'true')
      } else {
        slot.setAttribute('hide', 'false')
      }
    });
  }

  onToggle() {
    this.toggle = !this.toggle;
  }

  render() {
    if (this.toggle) {
      return (
        <div class="options">
          <h1>Name, Lastname</h1>
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
