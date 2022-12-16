// import { INameColumns } from './../dto/data.interface';

import { EnNameColumns } from '../dto/data.interface';

// const rowOrder: Record<string, any> = {
//   id: '',
//   name: '',
//   status: 'active',
//   sum: 0,
//   qty: 0,
//   volume: 0,
//   delivery_date: '',
//   currency: '',
// };

// function orderKey(obj: IResponse) {
//   Object.keys(rowOrder).forEach((el) => {
//     rowOrder[el];
//     // = obj[el as keyof IResponse];
//   });

//   rowOrder.forEach((k) => {
//     const v = obj[k as keyof IResponse];
//     delete obj[k as keyof IResponse];
//     obj[k as keyof IResponse] = v.toString();
//   });
//   return obj;
// }

export function orderKey(obj: Record<string, any>) {
  for (const n in EnNameColumns) {
    const v = obj[n];
    delete obj[n];
    obj[n] = v || null;
  }
  return obj;
}
