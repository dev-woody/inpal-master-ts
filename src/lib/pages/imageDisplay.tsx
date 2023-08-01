import { Button, Responsive } from "lib/styles";
import { useNavigate, useParams } from "react-router-dom";

const IamgePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Responsive>
      <img
        src={`/common/image/display?id=${id}&isThumbnail=false`}
        style={{ width: "100%" }}
      />
      <Button status="primary" needMarginTop onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </Responsive>
  );
};

export default IamgePage;
