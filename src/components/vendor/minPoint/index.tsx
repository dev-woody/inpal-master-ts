import styled from "styled-components";
import { Responsive } from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import MinPointContainer from "containers/vendor/minPoint/minPointContainer";
import MinPointRegisterContainer from "containers/vendor/minPoint/minPointRegisterContainer";
import MinPointEditContainer from "containers/vendor/minPoint/minPointEditContainer";

const MinPointIndexBlock = styled(Responsive)``;

const MinPointIndex = () => {
  return (
    <Fragment>
      <MinPointIndexBlock>
        <PageHeader title="최소 적립금 관리" />
      </MinPointIndexBlock>
      <Routes>
        <Route path="/:vendorId" element={<MinPointContainer />} />
        <Route
          path="/:vendorId/register"
          element={<MinPointRegisterContainer />}
        />
        <Route
          path="/:vendorId/detail/:id"
          element={<MinPointEditContainer />}
        />
      </Routes>
    </Fragment>
  );
};

export default MinPointIndex;
