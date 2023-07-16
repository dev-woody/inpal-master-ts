import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive } from "lib/styles";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { changeDays, changePhone } from "lib/functions/changeInput";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { Button } from "lib/styles";

const VendorPaymentDetailBlock = styled(Responsive)``;

const user = {
  id: "12341234",
  userId: "testadmin",
  name: "테스트회사",
  email: "test@test.com",
  phone: "01012345678",
  createdAt: "20221212",
  updatedAt: "20221212",
  vendorStatus: "APPROVING",
};

// const VendorPaymentDetail = ({ user }: { user: any }) => {
const VendorPaymentDetail = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const VendorStatusOption = [
    {
      name: "승인대기",
      id: "APPROVING",
    },
    {
      name: "휴면",
      id: "WAIT",
    },
    {
      name: "사용중",
      id: "USE",
    },
    {
      name: "사용중지",
      id: "STOP",
    },
  ];

  return (
    <>
      <VendorPaymentDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 정산 관리 /",
                  url: `/vendor/payment/${vendorId}`,
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </VendorPaymentDetailBlock>
      <VendorPaymentDetailBlock>
        <Description>
          <DescriptionContent label="아이디" content={user?.userId} />
          <DescriptionContent label="이름" content={user?.name} />
          <DescriptionContent label="이메일" content={user?.email} />
          <DescriptionContent
            label="전화번호"
            content={changePhone(user?.phone)}
          />
          <DescriptionContent
            label="생성일"
            content={changeDays(user?.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(user?.updatedAt)}
          />
        </Description>
        <Button needMarginTop onClick={() => navigate(`/vendor/list`)}>
          수정
        </Button>
      </VendorPaymentDetailBlock>
    </>
  );
};

export default VendorPaymentDetail;
