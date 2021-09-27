import { Component, h, Listen, State } from '@stencil/core';
import { User } from '../types';

@Component({
  tag: 'silevis-select',
  styleUrl: 'silevis-select.css',
  shadow: true,
})
export class silevisSelectComponent {
  @State() selectedUser;

  @Listen('silevisSelectActivated') 
  silevisSelectActivated(event: CustomEvent<User>) {    
    return (this.selectedUser = event.detail);
  }

  render() {
    return (
      <div>
        <silevis-select-option></silevis-select-option>
        {this.selectedUser?.map(selected => (
          <div class="selected">
            <img src={selected.url}></img>
            <h1>{selected.name} {selected.lastname} {selected.age}</h1>
          </div>
        ))}
      </div>
    );
  }
}
