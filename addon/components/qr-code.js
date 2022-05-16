import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { htmlSafe } from "@ember/template";
import qrCode from "../system/qr-code";

export default class QRCode extends Component {
  @tracked text;

  constructor() {
    super(...arguments);
    this.size = this.args.size || htmlSafe("100%");
    this.darkColor = this.args.darkColor || "#000000";
    this.lightColor = this.args.lightColor || "#FFFFFF";
  }

  get code() {
    if (!this.args.text) {
      throw new Error("Must pass @text argument");
    }

    return qrCode(this.args.text);
  }

  get viewBox() {
    const nCount = this.code.getModuleCount();
    return htmlSafe(`0 0 ${nCount} ${nCount}`);
  }

  get rows() {
    const { code } = this;
    const nCount = code.getModuleCount();

    return [...Array(nCount)].map((_, row) => {
      return [...Array(nCount)].map((_, col) => {
        return code.isDark(row, col);
      });
    });
  }
}
