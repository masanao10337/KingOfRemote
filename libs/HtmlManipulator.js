class HtmlManipulator {

  // king of timeのページタイトルを取得する
  get pageTitle() {
    return document
    .querySelector(".htBlock-pageTitleSticky")
    ?.textContent
    .replace('このページのヘルプ', '') //ほとんどのページにこの文字列が含まれているので削除
    .trim();
  }
}
