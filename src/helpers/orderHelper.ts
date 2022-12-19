import { EnNameColumns } from '../global-dto/data.interface';

export function orderKey(obj: Record<string, any>) {
  for (const n in EnNameColumns) {
    const v = obj[n];
    delete obj[n];
    obj[n] = v || null;
  }
  return obj;
}
