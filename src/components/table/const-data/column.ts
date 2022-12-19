import { v4 as uuid } from 'uuid';

export const columns = [
  { rowName: 'name', label: 'Наименование', id: uuid() },
  { rowName: 'sum', label: 'Сумма', id: uuid() },
  { rowName: 'qty', label: 'Количество', id: uuid() },
  { rowName: 'volume', label: 'Объем', id: uuid() },
  { rowName: 'status', label: 'Статус', id: uuid() },
  { rowName: 'delivery_date', label: 'Дата доставки', id: uuid() },
  { rowName: 'currency', label: 'Валюта', id: uuid() },
  { rowName: 'all', label: 'Всего', id: uuid() },
];
