export interface DataObj<T> {
  [key: string]: T;
}

export type response = {
  success: boolean;
  data: any;
  message: string;
  isReset: boolean;
};

export const responseForm: response = {
  success: false,
  data: null,
  message: "",
  isReset: true,
};

export interface propsTypes {
  [key: string]: any;
}

export interface userType {
  loginAt: string;
  name: string;
  isTopLevel: boolean;
  email: string;
  signInfo: {
    userId: string;
    password: null;
  };
}
