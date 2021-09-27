import { Component, h, Event, EventEmitter, State } from '@stencil/core';
import { User } from '../types';

@Component({
  tag: 'silevis-select-option',
  styleUrl: 'silevis-select-option.css',
  shadow: true,
})
export class SilevisSelectOption {
  users: User[] = [
    {
      id: 1,
      name: 'Kim',
      lastname: 'Dzonk',
      age: 41,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
    {
      id: 2,
      name: 'Kam',
      lastname: 'Uno',
      age: 42,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
    {
      id: 3,
      name: 'Sergiusz',
      lastname: ' Pu',
      age: 43,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
    {
      id: 4,
      name: 'Paweł',
      lastname: ' Nart',
      age: 44,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
    {
      id: 5,
      name: 'Rafał',
      lastname: 'Skóra',
      age: 45,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
    {
      id: 6,
      name: 'Piotr',
      lastname: 'Mikosza',
      age: 46,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
    {
      id: 7,
      name: 'Patryk',
      lastname: 'Eliasz',
      age: 47,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU',
    },
  ];

  @State() selectUser: object;
  @State() selected: string | number;
  @State() value: string;
  @Event({ eventName: 'silevisSelectActivated' }) silevisSelectActivated: EventEmitter<Object>;

  handleSelect(event) {
    this.selectUser = this.users.filter(user => {
      return user.name === event.target.value;
    });
    this.silevisSelectActivated.emit(this.selectUser);
  }

  usersClone = this.users.slice(0, this.users.length);

  handleChange(event) {
    this.value = event.target.value.toLowerCase();

    this.users = this.usersClone.filter(user => {
      if (this.value.length === 0) {
        return (this.users = this.usersClone);
      } else {
        return user.name.toLowerCase().includes(this.value) || user.lastname.toLowerCase().includes(this.value);
      }
    });
  }

  render() {
    return (
      <div class="options">
        <label>
          Filter
          <input type="text" value={this.value} onInput={event => this.handleChange(event)} />
        </label>
        <label>
          Choose User
          <select onInput={event => this.handleSelect(event)}>
            <option>-----------</option>
            {this.users.map(option => (
              <option value={option.name} selected={this.selected === option.id}>
                {option.name} {option.lastname}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}
