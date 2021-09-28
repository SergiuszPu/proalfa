// import { newSpecPage } from '@stencil/core/testing';
// import { SilevisSelectComponent } from './silevis-select';

// describe('my-component', () => {
//   it('renders', async () => {
//     const { root } = await newSpecPage({
//       components: [SilevisSelectComponent],
//       html: '<silevis-select></silevis-select>',
//     });
//     expect(root).toEqualHtml(`
//         <mock:shadow-root>
//         <div class="options">
//         <h1>Name, Lastname</h1>
//         <div class="arrow" onClick={() => this.onToggle()}>
//           &#8595;
//         </div>
//       </div>
//         </mock:shadow-root>
//     `);
//   });

//     it('renders with values', async () => {
//       const { root } = await newSpecPage({
//         components: [SilevisSelectComponent],
//         html: `<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>`,
//       });
//       expect(root).toEqualHtml(`
//         <my-component first="Stencil" last="'Don't call me a framework' JS">
//           <mock:shadow-root>
//             <div>
//               Hello, World! I'm Stencil 'Don't call me a framework' JS
//             </div>
//           </mock:shadow-root>
//         </my-component>
//       `);
//     });
// });
