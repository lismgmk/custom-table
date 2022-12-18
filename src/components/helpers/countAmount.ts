import { IData, IRows } from '../dto/data.interface';

export const countEmont = (
  //   key: Pick<typeof EnNameColumns, 'volume' | 'qty'>,
  // key: Record<string, any>,
  allRows: IData,
  key: string,
) => {
  return Object.values(allRows).reduce(
    (acc, current) => acc + Number(current[key as keyof IRows]),
    0,
  );
};
