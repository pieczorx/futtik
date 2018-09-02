class Checkbox {
  constructor(name, state) {
    this.name = name;
    $(document).on('click', '.checkbox .box', function() {
      $(this).closest('.checkbox').find('input').click();
    });
  }
  html() {
    return `
    <div class="checkbox">
      <input type="checkbox" name="${this.name}">
      <span class="box"><i class="far fa-check"></i></span>
    </div>
    `;
  }
}
