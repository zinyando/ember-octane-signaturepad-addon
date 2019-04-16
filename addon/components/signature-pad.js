import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SignaturePad extends Component {

  constructor() {
    super(...arguments);
    this.backBtnClass = this.args.backBtnClass || 'btn btn-default';
    this.backBtnText = this.args.backBtnText || 'Back';

    this.clearBtnClass = this.args.clearBtnClass || 'btn btn-default';
    this.clearBtnText = this.args.clearBtnText || 'Clear';

    this.acceptBtnText = this.args.acceptBtnText || 'Authorize';
    this.acceptBtnClass = this.args.acceptBtnClass || 'btn btn-success';

    this.canvas = null;
    this.signaturePad = null;

    this.resizeCanvas = this.resizeCanvas.bind(this)
  }

  @action
  createSignaturePad(element) {
    var signaturePad = new window.SignaturePad(element);

    this.canvas = element;
    this.signaturePad = signaturePad;

    window.addEventListener('resize', this.resizeCanvas)
    window.addEventListener('orientationchange', this.resizeCanvas)

    this.resizeCanvas();
  }

  @action
  removeSignaturePad() {
    window.removeEventListener('resize', this.resizeCanvas)
    window.removeEventListener('orientationchange', this.resizeCanvas)
  }

  resizeCanvas() {
    let canvas = this.canvas;
    let signaturePad = this.signaturePad;

    const ratio =  Math.max(window.devicePixelRatio || 1, 1)

    canvas.width = canvas.offsetWidth * ratio
    canvas.height = canvas.offsetHeight * ratio
    canvas.getContext('2d').scale(ratio, ratio)
    signaturePad.clear()
  }

  clear() {
    this.signaturePad.clear();
  }

  back() {
    this.args.back(this.data);
  }

  accept() {
    const signaturePad = this.signaturePad;
    const isEmpty = signaturePad.isEmpty();
    const data = isEmpty ? '' : signaturePad.toDataURL('image/svg+xml');

    this.data = data;
    this.args.submit(this.data);
  }
}
