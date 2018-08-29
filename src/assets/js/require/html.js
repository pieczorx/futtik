class html {
  static captchaListElement(p) {
    return `
    <div class="e l" data-id="${p.id}">
      <img src="${p.imgUrl}" />
      <form name="solveCaptcha">
        <input type="text" name="id" value="${p.id}" />
        <input type="text" name="answer" />
      </form>
    </div>
    `;
  }
}
