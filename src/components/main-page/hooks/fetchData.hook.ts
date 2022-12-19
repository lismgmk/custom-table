import { useEffect, useState } from 'react';
import { IResponse } from '../../../global-dto/data.interface';

export const useFetchData = (urls: string[]) => {
	
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchData, setFetchData] = useState<{
    data: IResponse[];
    error: string;
  }>({ data: null, error: null });

  useEffect(() => {
    (async function () {
      try {
        const requests = urls.map((url) => fetch(url));
        const responses = await Promise.all(requests);
        const promises = responses.map((response) => response.json());
        const data = await Promise.all(promises);
        const result = data.flat();
        setFetchData({ data: result, error: null });
      } catch (e) {
        setFetchData({
          data: null,
          error: e.message || 'something wrong',
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [urls]);

  return { fetchData, loading };
};
