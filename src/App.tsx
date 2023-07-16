import "App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "lib/pages/errorPage";
import Main from "lib/pages/main";
import SignInIndex from "components/auth";
import MasterIndex from "components/admin";
import CodeIndex from "components/code";
import GoodIndex from "components/goods";
import VendorIndex from "components/vendor";
import DealerIndex from "components/dealer";
import Dashboard from "lib/pages/dashboard";
import PrivateRouter from "lib/pages/privateRouter";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} errorElement={<ErrorPage />}>
        <Route element={<PrivateRouter authentication={false} />}>
          <Route path="signIn" element={<SignInIndex />} />
        </Route>
        <Route element={<PrivateRouter authentication={true} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="admin/*" element={<MasterIndex />} />
          <Route path="code/*" element={<CodeIndex />} />
          <Route path="goods/*" element={<GoodIndex />} />
          <Route path="vendor/*" element={<VendorIndex />} />
          <Route path="dealer/*" element={<DealerIndex />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
