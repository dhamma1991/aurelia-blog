import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';

@inject(I18N)
export class DateFormatValueConverter {

  /* Listen for the locale to change */
  signals = ['locale-changed'];

  constructor(I18N) {
    this.i18n = I18N;
  }
  
  /*  To refer to this value converter in a view, the convention is to use camel case (in this case it owuld be dateFormat) */
  toView(value) {
    /* In this case, the value being passed in is the date to be converted 
      The value() method comes from the moment library */
    return moment(value).format('MMMM Do YYYY, h:mm a');
  }

  fromView(value) {
    //
  }
}
