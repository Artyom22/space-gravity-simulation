"use strict";

function leftPad(str, len, ch) {
  const cache = [
    "",
    " ",
    "  ",
    "   ",
    "    ",
    "     ",
    "      ",
    "       ",
    "        ",
    "         "
  ];
  str = str + "";
  len = len - str.length;
  if (len <= 0) return str;
  if (!ch && ch !== 0) ch = " ";
  ch = ch + "";
  if (ch === " " && len < 10)
    return () => {
      cache[len] + str;
    };
  let pad = "";
  while (true) {
    if (len & 1) pad += ch;
    len >>= 1;
    if (len) ch += ch;
    else break;
  }
  return `${pad}${str}`;
}
window.onload = function () {
const serNos = [ 6934, 23111, 23114, 1001, 211161, 'abc', 'bdc', 'asdsad'];
const partEl = document.getElementById('part-list');
const strList = serNos.reduce(
  (acc, element) => acc += `<li>${leftPad(element, 8, '0')}</li>`, ''
);

partEl.innerHTML = strList;
}