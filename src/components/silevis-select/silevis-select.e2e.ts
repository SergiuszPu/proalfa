import { newE2EPage } from '@stencil/core/testing';

describe('silevis-select', () => {
  // TODo testy nie powinny uzywać elementów z sieci
  // TODO brak formatowania polecam np: prettier,
  const selectSilevis = `
  <silevis-select>
  <silevis-select-option active>
    <img slot="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU" />
    Sergiusz Pu, 35
  </silevis-select-option>
  <silevis-select-option>
    <img slot="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU" />
    On tu, 45
  </silevis-select-option>
  <silevis-select-option>
    <img slot="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgoHCc0rNp3hBP7yHkhIEkev-tVfaM4GrMQ&usqp=CAU" />
    Jakis John, 25
  </silevis-select-option>
</silevis-select>`;

  const selectNoOptions = `
  <silevis-select>
  </silevis-select>;
  `;

  // TODO brak funckji beforeEach dla powtarzalnych czynności przed testem
  // TODO Brak metodoligii AAA
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<silevis-select></silevis-select>');
    const element = await page.find('silevis-select');
    expect(element).toHaveClass('hydrated');
  });

  it('component are mounted', async () => {
    const page = await newE2EPage();
    await page.setContent(selectSilevis);


    const selectOptions = await page.findAll('silevis-select-option');
    // TODO ta asercja nie ma sensu, gdyz nie zalezy od niczego co chcemy przetestowac
    expect(selectOptions).toHaveLength(3);

    selectOptions.forEach(option => {
      expect(option).toHaveClass('hydrated');
    });
  });

  it('render component without options', async () => {
    const page = await newE2EPage();
    await page.setContent(selectNoOptions);

    // TODO te troche to bez sensu
    const selectOptions = await page.findAll('silevis-select-option');
    expect(selectOptions).toHaveLength(0);
  });

  // TODO  sensie ze nie wolno ukryć selecta? niezby zrozumiana nazwa dla testu
  it('should not have hide option', async () => {
    const page = await newE2EPage();
    await page.setContent(selectSilevis);

    const select = await page.find('silevis-select');
    await select.click();

    const options = await page.findAll('silevis-select-option');

    options.forEach(option => {
      expect(option).not.toHaveClass('hide');
    });
  });

  // TODO
  it('have attribute avtive', async () => {
    const page = await newE2EPage();
    await page.setContent(selectSilevis);

    // TODO taka formula zwróci zawsze pierwszy element, niezbyt elastyczna
    const component = await page.find('silevis-select-option');
    expect(component).toHaveAttribute('active');
  });

  // TODO w jaki sposób mozna klikac w event? ;)
  it('event was clicked', async () => {
    const page = await newE2EPage();


    const changeEvent = await page.spyOnEvent('silevisSelectActivated');

    await page.waitForChanges();
    expect(changeEvent).toHaveFirstReceivedEventDetail(true);
  });
});
