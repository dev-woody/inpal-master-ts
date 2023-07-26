export interface signInfo {
  userId: string;
  password: string;
}

export interface adminInfo extends signInfo {
  name: string;
  email: string;
  phone: string;
  isTopLevel: boolean;
  loginAt: string;
  tokenInfo: {
    token: string;
    refreshToken: string;
  };
  signInfo: {
    userId: string;
    password: string;
  };
}
