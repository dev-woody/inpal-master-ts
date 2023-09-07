import styled from "styled-components";
import {
  BreadCrumb,
  Button,
  Description,
  DescriptionContent,
  Responsive,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { NavigateFunction, useParams } from "react-router-dom";

type EvaluationDetailProps = {
  evaluationInfo: response;
  navigate: NavigateFunction;
};

const EvaluationDetailBlock = styled(Responsive)``;

const EvaluationDetail = ({
  evaluationInfo,
  navigate,
}: EvaluationDetailProps) => {
  const { id, groupId, itemId } = useParams();
  const vendorInfo = JSON.parse(sessionStorage.getItem("vendorPageInfo") || "{}");
  const { n, d, p } = JSON.parse(
    sessionStorage.getItem("groupVendorPageInfo") || "{}"
  );
  return (
    <>
      <EvaluationDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?n=${vendorInfo.n}&d=${vendorInfo.d}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${id}`,
                },
                {
                  name: "상품그룹 관리 /",
                  url: `/vendor/list/${id}/goods/group?n=${n}&d=${d}&p=${p}`,
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/vendor/list/${id}/goods/group/${groupId}`,
                },
                {
                  name: "아이템 상세정보 /",
                  url: `/vendor/list/${id}/goods/group/${groupId}/item/${itemId}`,
                },
                {
                  name: "리뷰 상세정보",
                  url: ``,
                },
              ]}
            />
          }
        />
      </EvaluationDetailBlock>
      <EvaluationDetailBlock>
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent
            label="작성자 아이디"
            content={evaluationInfo?.data?.info?.clientUserId}
          />
          <DescriptionContent
            label="평점"
            content={evaluationInfo?.data?.info?.score + "점"}
          />
          <DescriptionContent
            span="12"
            label="작성 내용"
            content={evaluationInfo?.data?.info?.description}
          />
        </Description>

        <Button
          type="button"
          onClick={() => navigate(`/vendor/list/${id}/goods/group/${groupId}/item/${itemId}`)}
          withInput
        >
          뒤로가기
        </Button>
      </EvaluationDetailBlock>
    </>
  );
};

export default EvaluationDetail;
