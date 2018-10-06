class PageSettingsPriceSteps {
  constructor() {
    $(document).on('click', `[data-role='settingsPriceStepAdd']`, () => {
      this.addPriceStep();
    });
    $(document).on('click', `[data-role='settingsPriceStepSave']`, () => {
      this.savePriceSteps();
    });

    pltfrm.on('change', () => {
      this.loadPriceSteps();
    })
  }

  _load() {
    this.active = true;
    this.elList = $(`[data-role='settingsPriceStepList']`);
    this.loadPriceSteps();
  }

  _stop() {
    this.active = false;
  }

  loadPriceSteps() {
    if(!this.active) {
      return;
    }
    this.elList.empty();
    for(let priceStep of database.priceSteps[currentPlatform()]) {
      this.elList.append(html.priceStepListElement(priceStep))
    }
  }

  addPriceStep() {
    this.elList.append(html.priceStepListElement({
      min: 0,
      max: 0,
      sellSteps: -1,
      minProfit: 0
    }))
  }

  savePriceSteps() {
    let finalSteps = [];
    this.elList.find('.e').each(function() {
      const values = {};
      $(this).find('input').each(function() {
        const name = $(this).attr('name');
        const val = $(this).val();
        values[name] = parseInt(val);
      });
      if(values.max > 0 || values.minProfit > 0) {
        finalSteps.push(values)
      }
    });

    database.priceSteps[currentPlatform()] = finalSteps;
    this.loadPriceSteps();
  }
}
