import {newE2EPage } from '@stencil/core/testing';

describe('silevis-select-option', () => {
  let page;
  let option;

  class Get {
    static Option = async () => await page.find('silevis-select-option')
    static ImageSlot = async () => await page.find('silevis-select-option >>> slot[name="image"]');
    static DefaultSlot = async () => await page.find('option-component >>> slot:not([name="image"])')
  }

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<silevis-select-option></silevis-select-option>');
    option = await Get.Option();
  });

  it('render option', async () => {
    expect(option).toHaveClass('hydrated');
  });

  it('option has image slot', async () => {
    expect(await Get.ImageSlot()).not.toBeUndefined();
  });

  it('option has default slot', async () => {
    expect(await Get.DefaultSlot()).not.toBeUndefined();
  })

  it('click option', async () => {
    const clickEvent = await option.spyOnEvent('silevisSelectActivated');
    
    await option.click();

    // expect(clickEvent).toHaveReceivedEventTimes(1);
    expect(clickEvent).toHaveReceivedEvent()
  });
});
