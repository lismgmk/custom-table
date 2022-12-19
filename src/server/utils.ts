export interface IRequestServer {
  endpoint: string;
  method: string;
  data: { list: string[] };
}

const request = ({ endpoint, method, data }: IRequestServer) => {
  fetch(endpoint, {
    body: JSON.stringify(data),
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const cancelFetch = (data: {list: string[]}) => {
  request({
    endpoint: 'http://localhost:3000/cancel',
    method: 'POST',
    data,
  });
};

