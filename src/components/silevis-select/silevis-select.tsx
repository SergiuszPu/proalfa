import { Component, h, State, Listen, Host } from '@stencil/core';

@Component({
  tag: 'silevis-select',
  styleUrl: 'silevis-select.scss',
  shadow: true,
})
export class SilevisSelectComponent {
  @State() selectedUser: string;
  @State() hidenUserSlot = false;
  @State() expandUserList = true;

  private slottedElements: HTMLElement[] = [];

  @Listen('silevisSelectActivated')
  silevisSelectActivated(event: CustomEvent<HTMLElement>) {
    this.slottedElements.filter(slot => {
      if (slot === event.target) {
        slot.setAttribute('active', 'true');
      } else {
        slot.setAttribute('active', 'false');
      }
    });
  }

  private handleSlotChange = (event: Event) => {
    if (!(event.target instanceof HTMLSlotElement)) {
      return;
    }
    this.slottedElements = event.target.assignedElements().filter((item: Element): item is HTMLElement => {
      return item instanceof HTMLElement;
    });
  };

  private searchUser(event) {
    this.selectedUser = event.target.value.toLowerCase();
    this.slottedElements.filter(slot => {
      const isHide = !/\d/.test(this.selectedUser) && !slot.innerText.toLowerCase().includes(this.selectedUser);
      slot.setAttribute('hide', isHide ? 'true' : 'false');
    });
  }

  private onToggle() {
    this.expandUserList = !this.expandUserList;
  }

  render() {
    return (
      <Host>
        <div class="select">
          <h1>{this.expandUserList ? 'Select User' : '------------------'}</h1>
          <div class="arrow" onClick={() => this.onToggle()}>
            {this.expandUserList ? '+' : '-'}
          </div>
        </div>
        <div
          class={{
            hide: this.expandUserList,
          }}
        >
          <input type="text" value={this.selectedUser} onInput={event => this.searchUser(event)} />
          <slot onSlotchange={this.handleSlotChange}>
            <div class="no-options">There is no option</div>
          </slot>
        </div>
      </Host>
    );
  }
}
