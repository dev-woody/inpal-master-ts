import styled from "styled-components";
import { BreadCrumb, Responsive } from "lib/styles";
import ManufacturerBasicEditContainer from "containers/code/manufacturer/manufacturerBasicEditContainer";
import ManufacturerDetailPageContainer from "containers/code/manufacturer/manufacturerDetailPageContainer";
import PageHeader from "lib/pages/pageHeader";

const ManufacturerEditIndexBlock = styled(Responsive)``;

const ManufacturerEditIndex = () => {
  const { p, d } = JSON.parse(sessionStorage.getItem("manufacturer") || "{}");
  return (
    <>
      <ManufacturerEditIndexBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "제조사 관리 /",
                  url: `/code/manufacturer?p=${p}&d=${d}`,
                },
                {
                  name: "제조사 수정",
                  url: "",
                },
              ]}
            />
          }
        />
      </ManufacturerEditIndexBlock>
      <ManufacturerBasicEditContainer />
      <ManufacturerDetailPageContainer />
    </>
  );
};

export default ManufacturerEditIndex;
