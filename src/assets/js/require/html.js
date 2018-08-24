class html {
  static captchaListElement(p) {
    return `
    <div class="e l" data-id="${p.id}">
      <img src="${p.imgUrl}" />
    </div>
    `;
  }
}
