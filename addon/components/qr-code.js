import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import qrCode from '../system/qr-code';
import layout from '../templates/components/qr-code';

export default Component.extend({
  layout,

  size: htmlSafe('100%'),
  darkColor: '#000000',
  lightColor: '#FFFFFF',

  code: computed('text', function() {
    return qrCode(this.text);
  }),

  viewBox: computed('code', function() {
    const nCount = this.code.getModuleCount();
    return htmlSafe(`0 0 ${nCount} ${nCount}`);
  }),

  rows: computed('code', function() {
    const { code } = this;
    const nCount = code.getModuleCount();

    return [...Array(nCount)].map((_, row) => {
      return [...Array(nCount)].map((_, col) => {
        return code.isDark(row, col);
      });
    });
  })
});
