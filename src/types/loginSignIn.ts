export interface LoginBody {
  email: string;
  password: string;
}

export interface SignInBody {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  id: string;
}
