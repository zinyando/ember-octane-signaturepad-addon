import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SignaturePad extends Controller {


  @action
  setSignature(data) {
    this.set('signature', data);
  }
}