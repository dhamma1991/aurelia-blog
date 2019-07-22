import {bindable} from 'aurelia-framework';

export class PostForm {
  @bindable post;
  @bindable title;

  submit() {

  }

  valueChanged(newValue, oldValue) {
    //
  }
}
