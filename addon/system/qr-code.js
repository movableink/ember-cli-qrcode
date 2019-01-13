/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 *
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 *
 * QRCode for JavaScript
 *
 * Copyright (c) 2009 Kazuhiko Arase, davidshimjs, and others.
 *
 * URL: http://www.d-project.com/
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * The word "QR Code" is registered trademark of
 * DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 *
 **/

import { CodeLimitLength, ErrorCorrectLevel } from './constants';
import CodeModel from './model';

/**
 * Create a QR Code model
 *
 * Error Correction Capability Levels
 *   * 'L' - ~7% correction
 *   * 'M' - ~15% correction
 *   * 'Q' - ~25% correction
 *   * 'H' - ~30% correction
 *
 * @public
 * @param {String} text
 * @param {String} correctLevelString
 * @return {CodeModel} code
 */
export default function makeCode(text, correctLevelString='L') {
  const correctLevel = ErrorCorrectLevel[correctLevelString] || ErrorCorrectLevel.L;
  const code = new CodeModel(getTypeNumber(text, correctLevel), correctLevel);
  code.addData(text);
  code.make();

  return code;
}

/**
 * Get the type by string length
 *
 * @private
 * @param {String} sText
 * @param {Number} nCorrectLevel
 * @return {Number} type
 */
function getTypeNumber(sText, nCorrectLevel) {
  let nType = 1;
  const length = getUTF8Length(sText);

  for (let i = 0, len = CodeLimitLength.length; i < len; i++) {
    let nLimit = 0;

    switch (nCorrectLevel) {
      case ErrorCorrectLevel.L:
        nLimit = CodeLimitLength[i][0];
        break;
      case ErrorCorrectLevel.M:
        nLimit = CodeLimitLength[i][1];
        break;
      case ErrorCorrectLevel.Q:
        nLimit = CodeLimitLength[i][2];
        break;
      case ErrorCorrectLevel.H:
        nLimit = CodeLimitLength[i][3];
        break;
    }

    if (length <= nLimit) {
      break;
    } else {
      nType++;
    }
  }

  if (nType > CodeLimitLength.length) {
    throw new Error(`Data exceeded max length (${length})`);
  }

  return nType;
}

/**
 * Get the number of bytes in a utf-8 string
 *
 * @private
 * @param {String} sText
 * @return {Number} length
 */
function getUTF8Length(sText) {
  const replacedText = encodeURI(sText)
    .toString()
    .replace(/%[0-9a-fA-F]{2}/g, 'a');
  return replacedText.length + (replacedText.length != sText ? 3 : 0);
}
