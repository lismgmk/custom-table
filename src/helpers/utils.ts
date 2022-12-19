import { format, isValid } from 'date-fns';

export function isStrings(value: any) {
  return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: any) {
  return typeof value == 'number' && !isNaN(value);
}

export function isDate(value: string | number) {
  return !Number.isNaN(new Date(value).getTime());
}

export function toDateUI(value: string | number) {
  return format(new Date(value), 'MM/dd/yyyy');
}

export function toLower(value: any) {
  if (isStrings(value)) {
    return value.toLowerCase();
  }
  return value;
}
