export interface IRequestServer {
  endpoint: string;
  method: string;
  data: { list: string[] };
}

const localhost = 'http://localhost:3000';

export const urls: string[] = [
  `${localhost}/documents1`,
  `${localhost}/documents2`,
];

const request = ({ endpoint, method, data }: IRequestServer) => {
  fetch(endpoint, {
    body: JSON.stringify(data),
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const cancelFetch = (data: { list: string[] }) => {
  request({
    endpoint: `${localhost}/cancel`,
    method: 'POST',
    data,
  });
};
