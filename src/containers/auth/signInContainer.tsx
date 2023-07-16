import { useEffect } from "react";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { userActions } from "reducers/user";
import SignInForm from "components/auth/signInForm";
import { DataObj } from "types/globalTypes";

function SignInContainer() {
  const navigate = useNavigate();
  const { isSignIn } = useAppSelector((state) => ({
    isSignIn: state.masterAdmin.signIn,
  }));

  const dispatch = useAppDispatch();
  const onSubmit = (data: DataObj<string>) => {
    dispatch(masterAdminActions.signIn({ ...data }));
  };

  useEffect(() => {
    if (isSignIn.success) {
      dispatch(userActions.saveUser(isSignIn.data));
      navigate("/");
    }
  }, [isSignIn, dispatch]);

  useEffect(() => {
    dispatch(masterAdminActions.reset("signIn"));
    dispatch(userActions.reset({}));
    return () => {
      dispatch(masterAdminActions.reset("signIn"));
    };
  }, []);

  return <SignInForm onSubmit={onSubmit} isSignIn={isSignIn} />;
}

export default SignInContainer;
