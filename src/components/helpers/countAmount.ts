import { IRows } from '../dto/data.interface';

export const countEmont = (allRows: IRows[], key: string) => {
  return allRows.reduce(
    (acc, current) => acc + Number(current[key as keyof IRows]),
    0,
  );
};
