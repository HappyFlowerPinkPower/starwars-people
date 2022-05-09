export default function(value) {
  if (!value || typeof value !== 'string') return value;
  else return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}