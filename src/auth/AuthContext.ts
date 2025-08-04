import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserType = User | null;

export interface InitialState {
  user: UserType;
  authenticated: boolean;
  loading: boolean;
  register: (data: { name: string; email: string; password: string }) => void;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  authenticated: false,
  loading: false,
  register: () => {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<InitialState>(initialState);

export default AuthContext;
