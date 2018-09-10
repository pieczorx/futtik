class PageSettings {
  constructor() {
    $(document).on('submit', `form[name='settings']`, function() {
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
    });
  }

  _load() {
    $(`form[name='settings'] input`).each(function() {
      const name = $(this).attr('name');
      const setting = settings.get(name)
      if(setting) {
        $(this).val(setting)
      }
      $(this).attr('placeholder', settings.getDefault(name))
    });
  }

  _stop() {

  }
}
