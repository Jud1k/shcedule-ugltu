import axios from 'axios';
import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail;
      toast.error(message);
      console.log(error);
    } else if (error instanceof Error) {
      console.log(error);
      toast.error(error.message);
    } else {
      console.log('Unknown error: ', error);
      toast.error('Произошла неизвестная ошибка');
    }
  };

  const handleSuccess = (message: string) => {
    if (message) {
      toast.success(message);
    }
  };
  return { handleApiError, handleSuccess };
};
