export default function(value) {
  if (!value || typeof value !== 'string') return value;
  else return value.toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, '');
}