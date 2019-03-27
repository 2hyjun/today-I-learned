export function parseBool(str?: string | number | boolean | null): boolean {
  if (str === null || str === undefined) {
    return false;
  }

  if (typeof str === 'boolean') {
    return str;
  }

  if (typeof str === 'number') {
    return str === 1;
  }

  if (str === '') {
    return false;
  }

  if (str === '1') {
    return true;
  }

  str = str.replace(/^\s+|\s+$/g, '');
  if (str.toLowerCase() === 'true' || str.toLowerCase() === 'yes') {
    return true;
  }

  str = str.replace(/,/g, '.');
  str = str.replace(/^\s*\-\s*/g, '-');

  if (!isNaN(+str)) {
    return parseFloat(str) !== 0;
  }

  return false;
}
