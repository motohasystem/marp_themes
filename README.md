# marp_themes

このリポジトリは、MARPのスライドやブログタイトル画像のスタイルを管理するためのカスタムテーマと、ゲームパッドを使ってMARPスライドを操作するためのJavaScriptを含んでいます。

## ファイル構成

- `mytheme.css`
  - MARP用のカスタムスタイルです。このテーマを使用して、スライドに独自のデザインを適用できます。
  
- `title_image.css`
  - MARPを使用してブログのタイトル画像を生成するためのスタイルシートです。このCSSを使って、MARPのスライドとしてタイトル画像をデザインできます。
  
- `gamepad.js`
  - ゲームパッドを使ってMARPのスライドをページ送りするための実験用JavaScriptファイルです。このスクリプトを使って、ゲームパッドでスライドの操作を試すことができます。

## 使い方

### `mytheme.css`

1. MARPのスライド作成時に、このCSSを適用することでスライド全体にカスタムデザインが反映されます。
2. スライドの先頭に以下のように指定します:

```markdown
---
theme: ./mytheme.css
---
```

### `title_image.css`

1. MARPでブログのタイトル画像を作成する際にこのスタイルシートを利用します。
2. スライドの先頭に以下のように指定します:

```markdown
---
theme: ./title_image.css
---
```

3. タイトルスライドをデザインし、画像としてエクスポートします。

### `gamepad.js`

1. MARPスライドの操作をゲームパッドで試したい場合、このスクリプトをスライド内でロードします。
2. スライドのHTMLファイルに以下を追加します:

```html
<script src="./gamepad.js"></script>
```

3. ゲームパッドを接続し、スライドのページ送りができるか試してみてください。

## ライセンス

このリポジトリの内容は、特にライセンスが記載されていない限り、MITライセンスのもとで公開されています。

