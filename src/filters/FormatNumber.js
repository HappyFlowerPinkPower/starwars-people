export default function(value) {
  if (!value || typeof value !== 'string') return value;
  else return new Intl.NumberFormat('en-US').format(value);
}