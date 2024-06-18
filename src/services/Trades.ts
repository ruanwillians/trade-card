import { tradeCardApi } from 'src/boot/axios';
import { AddTrades } from 'src/types/Trades';

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

export const createTrade = async (
  body: AddTrades,
) => {
  return await tradeCardApi
    .post('/trades', body)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
