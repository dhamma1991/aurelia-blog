import moment from 'moment';

export class DateFormatValueConverter {
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
