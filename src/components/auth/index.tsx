import SignInContainer from "containers/auth/signInContainer";
import { Route, Routes } from "react-router-dom";

const SignInIndex = () => {
  return (
    <Routes>
      <Route path="/*" element={<SignInContainer />} />
    </Routes>
  );
};

export default SignInIndex;
