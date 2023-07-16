export type SignIn = {
  adminInfo: {
    id: string;
    signInfo: {
      userId: string;
      password: null;
    };
    name: string;
    email: string;
    phone: string;
    isTopLevel: boolean;
    loginAt: string;
  };
  tokenInfo: {
    token: string;
    refreshToken: string;
  };
};
