class PageSettingsPriceSteps {
  constructor() {
    /*$(document).on('submit', `form[name='settings']`, function() {
      const data = $(this).serializeJSON();

      let requiredValues = Object.keys(data);
      for(let key of requiredValues) {
        if(!data[key]) {
          alert('Missing value: ' + key);
          return false;
        }

      }
      for(let key of requiredValues) {
        if($(this).find(`[name='${key}']`).attr('type') == 'number') {
          data[key] = parseFloat(data[key]);
        }
        settings.set(key, data[key]);
      }
      settings.save();
      return false;
    });*/

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
    /*$(`form[name='settings'] input`).each(function() {
      const name = $(this).attr('name');
      const setting = settings.get(name)
      if(setting) {
        $(this).val(setting)
      }
      $(this).attr('placeholder', settings.getDefault(name))
    });*/
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
