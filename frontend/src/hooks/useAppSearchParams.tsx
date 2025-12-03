import { useCallback } from 'react';
import { useSearchParams } from 'react-router';

type ParamValue = string | number | boolean | null | undefined;

interface ParamObject {
  [key: string]: ParamValue;
}

const useAppSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateParams = useCallback(
    (updates: ParamObject) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );
  return {
    searchParams,
    updateParams,
    getParam,
    setSearchParams,
  };
};

export default useAppSearchParams;
