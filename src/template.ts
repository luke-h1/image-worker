import { sanitizeHtml } from "./sanitizer";



function getCss(titleLength: number) {
  let fontSize = 200;
  let lines = 3;
  if (titleLength > 80) {
    fontSize = 90;
    lines = 4;
  } else if (titleLength > 60) {
    fontSize = 110;
    lines = 4;
  } else if (titleLength > 50) {
    fontSize = 120;
  } else if (titleLength > 20) {
    fontSize = 140;
  }

  return `
/* http://meyerweb.com/eric/tools/css/reset/
  v2.0 | 20110126
  License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

body {
  // background-image: #000;
  height: 100vh;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  padding: 20px;
}

.container {
  position: relative;
  height: calc(100vh - 40px);
  padding: 20px;
  background: rgba(248, 248, 248, 0.8);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.title {
  font-size: ${fontSize}px;
  line-height: ${fontSize + 5}px;
  height: ${(fontSize + 10) * lines}px;
  overflow: hidden;
  color: #313131;
}

.author {
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 20px;
  font-size: 3em;
  color: #525252;
}

.author-image {
  width: 1em;
  border-radius: 50%;
  margin-bottom: -9px;
}

.website {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 20px;
  font-size: 2em;
  color: #525252;
}
`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { title, author, image, website } = parsedReq;

  return `
<!DOCTYPE html>
<html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed&display=swap" rel="stylesheet">
  <style>
    ${getCss(title.length)}
  </style>
  <body>
    <div class="container">
      <div class="title">${sanitizeHtml(title)}</div>
      <div class="author">
        <img src="${image}" class="author-image" />
        ${sanitizeHtml(author)}
      </div>
      <div class="website">${website}</div>
    </div>
  </body>
</html>
`;
}
