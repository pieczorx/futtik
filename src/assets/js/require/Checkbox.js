class Checkbox {
  constructor(name, state) {
    this.name = name;
    $(document).on('click', '.checkbox', function() {
      $(this).find('input').click();
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
