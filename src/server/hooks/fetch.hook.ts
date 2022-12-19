import { IResponse } from './../../components/dto/data.interface';
import { useState, useEffect } from 'react';

// const useFetch = (urls: string[]) => {
const useFetch = () => {
  // const useFetch = (url: string) => {
  const [state, setState] = useState<[IResponse[][], boolean, string]>([
    null,
    false,
    null,
  ]);
  const urls: string[] = [
    'http://localhost:3000/documents1',
    'http://localhost:3000/documents2',
  ];
  useEffect(() => {
    setState([null, true, null]);

    (async () => {
      try {
        // const requests = urls.map((url) => {
        //   const preFetchData =  fetch(url);
        // });
        // console.log(requests, 'ddddddddd2222');

        // const data = await Promise.all(requests);
        const requests = urls.map((url) => fetch(url));
        const responses = await Promise.all(requests);
        const promises = responses.map((response) => response.json());
        const data = await Promise.all(promises);
        console.log(data, 'data!!!!!!!!!!!!!!!!!!');
        // const result =  data.flat();
        // const data = await fetch(url).then((res) => res.json());
        // setState([data, false, null]);
        // setState([result, false, null]);
      } catch (e) {
        console.log(e, 'ddddd');
        setState([null, false, 'Some server error']);
      }
      //   const data = await fetch(url).then((res) => res.json());

      //   setState([data, false]);
    })();
  }, [urls]);

  return state;
};

export default useFetch;
