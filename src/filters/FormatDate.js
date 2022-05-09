import moment from 'moment';

export default function(value) {
  if (!value || typeof value !== 'string') return value;
  else return moment(String(value)).format('MM/DD/YYYY hh:mm');
}