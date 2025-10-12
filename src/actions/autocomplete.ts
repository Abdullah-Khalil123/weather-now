import { axiosInstance } from '@/utils/axios';

const getAutoComplete = async (query?: string) => {
  try {
    const response = await axiosInstance.get('search.json', {
      params: {
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAutoComplete };
