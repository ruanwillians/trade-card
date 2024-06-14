import { tradeCardApi } from 'src/boot/axios';
import {
  LoginBody,
  SignInBody,
} from '../types/loginSignIn';

export const loginUser = async (
  body: LoginBody,
) => {
  return await tradeCardApi
    .post('/login', body)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const SignInUser = async (
  body: SignInBody,
) => {
  return await tradeCardApi
    .post('/register', body)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};
