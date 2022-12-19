import { IResponse } from './../../components/dto/data.interface';
import { useState, useEffect } from 'react';

const useFetch = (urls: string[]) => {
  // const useFetch = () => {
  // const useFetch = (url: string) => {
  const [state, setState] = useState<{ data: IResponse[]; loading: boolean }>();
  // const urls: string[] = [
  //   'http://localhost:3000/documents1',
  //   'http://localhost:3000/documents2',
  // ];
  // useEffect(() => {
  setState({ data: null, loading: true });

  const fetchData = async () => {
    // const requests = urls.map((url) => {
    //   const preFetchData =  fetch(url);
    // });
    // console.log(requests, 'ddddddddd2222');

    // const data = await Promise.all(requests);
    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const promises = responses.map((response) => response.json());
    const data = await Promise.all(promises);
    // console.log(data, 'data!!!!!!!!!!!!!!!!!!');
    const result = data.flat();
    // const data = await fetch(url).then((res) => res.json());
    // setState([data, false, null]);
    setState({ data: result, loading: false });

    //   const data = await fetch(url).then((res) => res.json());

    //   setState([data, false]);
  };
  // }, [urls]);

  return { state, fetchData };
};

export default useFetch;
