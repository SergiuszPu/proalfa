import { newE2EPage } from '@stencil/core/testing';

let page;
let select;
class Get {
  static Select = async () => await page.find('silevis-select');
  static Options = async () => await page.findAll('silevis-select-option');
  static ArrowSelect = async () => await page.find('silevis-select >>> div[class="arrow"]');
  static Input = async () => await page.find('silevis-select >>> input');
  static slot = async () => await page.find('silevis-select >>> div[class="slot"]');
  static NoOptions = async () => await page.find('silevis-select >>> .no-options');
}
describe('silevis-select', () => {
  const selectSilevis = `
  <silevis-select>
  <silevis-select-option active>
    <img slot="image" src="./assets/1.png" />
    Sergiusz Pu, 35
  </silevis-select-option>
  <silevis-select-option>
    <img slot="image" src="./assets/2.png" />
    On tu, 45
  </silevis-select-option>
  <silevis-select-option>
    <img slot="image" src="./assets/3.png" />
    Jakis John, 25
  </silevis-select-option>
  </silevis-select>`;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(selectSilevis);
    select = await Get.Select();
  });

  it('select has 3 options', async () => {
    const options = await Get.Options();

    expect(options).toHaveLength(3);
  });

  it('only one option have active attribute after render', async () => {
    const options = await Get.Options();

    options.forEach((option, index) => {
      if (index === 0) {
        expect(option).toHaveAttribute('active');
      } else {
        expect(option).not.toHaveAttribute('acitve');
      }
    });
  });

  it('change active slot after click ', async () => {
    await select.click();

    const options = await Get.Options();

    await options[2].click();
    expect(options[2]).toHaveAttribute('active');
  });

  it('should search correct option', async () => {
    const input = await Get.Input();

    await select.click();
    await input.click();
    await input.press('KeyS');
    await input.press('KeyE');

    let newValue = await input.getProperty('value');
    expect(newValue).toBe('se');
  });

  it('should show correct option', async () => {
    const input = await Get.Input();
    const options = await Get.Options();

    await select.click();
    await input.click();
    await input.press('KeyJ');
    await input.press('KeyA');
    await input.press('KeyK');
    
    let newValue = await input.getProperty('value');
    expect(options[2].innerText.toLowerCase()).toContain(newValue)
  });

  it('should not find any options', async () => {
    const input = await Get.Input();
    const options = await Get.Options();
    
    await select.click();
    await input.click();
    await input.press('KeyB');
    await input.press('KeyA');
    await input.press('KeyD');
    
    let newValue = await input.getProperty('value');
    options.forEach((option) => {
      expect(option.innerText.toLowerCase()).not.toContain(newValue)
    })
  });

  it('should search correct option', async () => {
    const input = await Get.Input();

    await select.click();
    await input.click();
    await input.press('KeyS');
    await input.press('KeyE');

    let newValue = await input.getProperty('value');
    expect(newValue).toBe('se');
  });

  it('search should be empty', async () => {
    const input = await Get.Input();

    await select.click();
    await input.click();

    let value = await input.getProperty('value');
    expect(value).toBe('');
  });

  describe('test select without options', () => {
    const selectNoOptions = `
  <silevis-select>
  </silevis-select>;
  `;

    it('opened menu should show single option with text "There is no option"', async () => {
      page = await newE2EPage();
      await page.setContent(selectNoOptions);
      select = await Get.Select();
      const options = await Get.Options();

      await select.click();

      const noOptionsElement = await Get.NoOptions();
      expect(noOptionsElement.innerText).toBe('There is no option');
      options.forEach(option => expect(option).toHaveClass('hide'));
    });
  });
});
