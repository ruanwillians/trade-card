import { tradeCardApi } from 'src/boot/axios';

export const getTrades = async (page: number) => {
  return await tradeCardApi
    .get(`/trades?rpp=10&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
