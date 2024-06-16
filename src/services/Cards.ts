import { tradeCardApi } from 'src/boot/axios';
import { AddCards } from 'src/types/Cards';

export const getCards = async (page: number) => {
  return await tradeCardApi
    .get(`/cards?rpp=100&page=${page}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const getMeCards = async () => {
  return await tradeCardApi
    .get('/me')
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
export const addMeCards = async (
  body: AddCards,
) => {
  return await tradeCardApi
    .post('/me/cards', body)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
