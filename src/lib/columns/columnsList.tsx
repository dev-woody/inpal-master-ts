import {
  changeDeliveryStatus,
  changeDays,
  changePhone,
  changeStatus,
  changeTextCut,
  changeSellStatus,
} from "lib/functions/changeInput";
import { Button } from "lib/styles";
import { Link } from "react-router-dom";

import {
  FaUserCog,
  FaPalette,
  FaClipboard,
  FaGift,
  FaTicketAlt,
  FaBox,
  FaSitemap,
  FaIndustry,
  FaBoxes,
  FaChartBar,
  FaRulerCombined,
  FaUserAlt,
  FaMoneyBillAlt,
  FaReceipt,
  FaHardHat,
  FaPaintRoller,
} from "react-icons/fa";

type sideListType = {
  name: string;
  url: string;
  children?: {
    icon?: any;
    menuName: string;
    url: string;
    disable?: boolean;
  }[];
};

export type ColumnsType = {
  title: string;
  dataIndex: string;
  isDesc?: boolean;
  render?: (data: any, list?: any) => JSX.Element | string | undefined;
};

//* sidebarList
export const sidebarList: sideListType[] = [
  {
    name: "마스터",
    url: "/admin",
    children: [
      {
        icon: <FaUserCog />,
        menuName: "관리자",
        url: "/master",
      },
      {
        icon: <FaPalette />,
        menuName: "색상관리",
        url: "/color",
      },
      {
        icon: <FaTicketAlt />,
        menuName: "쿠폰",
        url: "/cupon",
      },
      {
        icon: <FaClipboard />,
        menuName: "게시판",
        url: "/board",
        disable: true,
      },
      {
        icon: <FaGift />,
        menuName: "프로모션",
        url: "/promotion",
        disable: true,
      },
    ],
  },
  {
    name: "품목",
    url: "/code",
    children: [
      {
        icon: <FaPaintRoller />,
        menuName: "품목 조회",
        url: "/product",
      },
      {
        icon: <FaSitemap />,
        menuName: "카테고리 조회",
        url: "/category",
      },
      {
        icon: <FaIndustry />,
        menuName: "제조사 조회",
        url: "/manufacturer",
      },
      {
        icon: <FaRulerCombined />,
        menuName: "단위관리",
        url: "/unit",
      },
      {
        icon: <FaBox />,
        menuName: "상품속성 조회",
        url: "/property",
      },
    ],
  },
  {
    name: "상품",
    url: "/goods",
    children: [
      {
        icon: <FaBoxes />,
        menuName: "상품그룹 조회",
        url: "/group",
      },
      {
        icon: <FaChartBar />,
        menuName: "판매량 조회",
        url: "/sell",
        disable: true,
      },
    ],
  },
  {
    name: "판매사",
    url: "/vendor",
    children: [
      {
        icon: <FaUserAlt />,
        menuName: "판매사 조회",
        url: "/list",
      },
      {
        icon: <FaReceipt />,
        menuName: "주문 조회",
        url: "/order",
        disable: true,
      },
    ],
  },
  {
    name: "시공업자",
    url: "/dealer",
    children: [
      {
        icon: <FaHardHat />,
        menuName: "시공업자 조회",
        url: "/list",
      },
      {
        icon: <FaReceipt />,
        menuName: "주문 조회",
        url: "/order",
      },
    ],
  },
  {
    name: "정산",
    url: "/calculate",
    children: [
      {
        icon: <FaMoneyBillAlt />,
        menuName: "정산 관리",
        url: "/list",
        disable: true,
      },
    ],
  },
];

export const masterAllListColumns = [
  {
    title: "아이디",
    dataIndex: "info",
    render: (info: any) => info.signInfo.userId,
  },
  {
    title: "이름",
    dataIndex: "info",
    render: (info: any) => info.name,
  },
  {
    title: "이메일",
    dataIndex: "info",
    render: (info: any) => info.email,
  },
  {
    title: "휴대폰",
    dataIndex: "info",
    render: (info: any) => changePhone(info.phone),
  },
  {
    title: "생성일",
    dataIndex: "base",
    render: (base: any) => changeDays(base.createdAt),
  },
  {
    title: "수정일",
    dataIndex: "base",
    render: (base: any) => changeDays(base.updatedAt),
  },
  {
    title: "권한",
    dataIndex: "info",
    render: (info: any) => (info.isTopLevel ? "최고권한" : "하위권한"),
  },
];

//* colorColumns
export const colorColumns: ColumnsType[] = [
  {
    title: "색상",
    dataIndex: "info",
    render: (info: any) => {
      return (
        <div
          style={{
            background: info.rgb,
            width: "20px",
            height: "20px",
            display: "inline-block",
            borderRadius: "0.75rem",
          }}
        ></div>
      );
    },
  },
  {
    title: "색상명",
    dataIndex: "info",
    render: (info) => info.name,
  },
  {
    title: "코드명",
    dataIndex: "info",
    render: (info) => info.kind,
  },
  {
    title: "헥사코드",
    dataIndex: "info",
    render: (info) => info.rgb,
  },
];

export const categoryListColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "카테고리명",
    dataIndex: "description",
  },
];

export const optionColumns: ColumnsType[] = [
  {
    title: "이름",
    dataIndex: "name",
    render: (name: string) => changeTextCut(name),
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    isDesc: true,
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    isDesc: true,
    render: (updatedAt: string) => changeDays(updatedAt),
  },
  {
    title: "재고",
    dataIndex: "stock",
    isDesc: true,
  },
  {
    title: "판매량",
    dataIndex: "sellCount",
    isDesc: true,
  },
  {
    title: "판매상태",
    dataIndex: "sellStatus",
    render: (sellStatus: string) => changeSellStatus(sellStatus),
  },
];

export const itemColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "모델명",
    dataIndex: "model",
    render: (model: string) => changeTextCut(model),
  },
  {
    title: "이름",
    dataIndex: "name",
    render: (name: string) => changeTextCut(name),
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    isDesc: true,
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    isDesc: true,
    render: (updatedAt: string) => changeDays(updatedAt),
  },
  {
    title: "가격",
    dataIndex: "price",
  },
  {
    title: "재고",
    dataIndex: "stock",
    isDesc: true,
  },
  {
    title: "판매량",
    dataIndex: "sellCount",
    isDesc: true,
  },
  {
    title: "판매상태",
    dataIndex: "sellStatus",
    render: (sellStatus: string) => changeSellStatus(sellStatus),
  },
];

//* vendorAllListColumns
export const vendorAllListColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "info",
    render: (info: any) => {
      if (info.code) {
        return info.code;
      } else {
        return "미발급";
      }
    },
  },
  {
    title: "회사명",
    dataIndex: "info",
    render: (info: any) => {
      return info.bizInfo.basic.name;
    },
  },
  {
    title: "생성일",
    dataIndex: "base",
    isDesc: true,
    render: (base: any) => changeDays(base.createdAt),
  },
  {
    title: "수정일",
    dataIndex: "base",
    isDesc: true,
    render: (base: any) => changeDays(base.updatedAt),
  },
  {
    title: "상태",
    dataIndex: "info",
    render: (info: any) => changeStatus(info.bizStatus),
  },
  {
    title: "판매대금 조회",
    dataIndex: "base",
    render: (base: any) => {
      return (
        <Link
          to={`/vendor/payment/${base.id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button>조회</Button>
        </Link>
      );
    },
  },
  {
    title: "주문 조회",
    dataIndex: "id",
    render: (id: string) => {
      return (
        <Link
          to={`/vendor/order/orderByVendorId/${id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button>조회</Button>
        </Link>
      );
    },
  },
];

//* vendorAdminListColumns
export const vendorAdminListColumns: ColumnsType[] = [
  {
    title: "아이디",
    dataIndex: "userId",
  },
  {
    title: "이름",
    dataIndex: "name",
  },
  {
    title: "전화번호",
    dataIndex: "phone",
    render: (phone: string) => changePhone(phone),
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    render: (updatedAt: string) => changeDays(updatedAt),
  },
  {
    title: "권한",
    dataIndex: "topLevel",
    render: (topLevel: string) => (topLevel ? "최고권한" : "하위권한"),
  },
];

//* dealerAllListColumns
export const dealerAllListColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "사업자명",
    dataIndex: "name",
  },
  {
    title: "대표품목",
    dataIndex: "headProduct",
  },
  {
    title: "보유 포인트",
    dataIndex: "savedPoint",
    isDesc: true,
    render: (savedPoint) => savedPoint + "P",
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    isDesc: true,
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    isDesc: true,
    render: (updatedAt: string) => changeDays(updatedAt),
  },
  {
    title: "상태",
    dataIndex: "dealerStatus",
    render: (dealerStatus: string) => changeStatus(dealerStatus),
  },
  {
    title: "주문 조회",
    dataIndex: "id",
    render: (id: string) => {
      return (
        <Link
          to={`/dealer/order/orderByDealerId/${id}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button>조회</Button>
        </Link>
      );
    },
  },
];

//* vendorOrderColumns
export const vendorOrderColumns = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "주문시간",
    dataIndex: "paymentAt",
    render: (paymentAt: string) => changeDays(paymentAt),
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    isDesc: true,
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    isDesc: true,
    render: (updatedAt: string) => changeDays(updatedAt),
  },
  {
    title: "주문금액",
    dataIndex: "dealerOrderItem",
    isDesc: true,
    render: (dealerOrderItem: any) => dealerOrderItem?.countedTotalPrice + "원",
  },
  {
    title: "송장번호",
    dataIndex: "deliveryNum",
  },
  {
    title: "주문상태",
    dataIndex: "orderStatus",
    render: (orderStatus: string) => changeDeliveryStatus(orderStatus),
  },
];

//* vendorPaymentColumns
export const vendorPaymentColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "기본요금",
    dataIndex: "basicFee",
  },
  {
    title: "무료조건",
    dataIndex: "freeCondition",
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    render: (updatedAt: string) => changeDays(updatedAt),
  },
];

//* vendorOrderColumns
export const vendorOrderItemColumns = [
  {
    title: "옵션명",
    dataIndex: "goodsGroupOption",
    render: (goodsGroupOption: any) => goodsGroupOption.name,
  },
  {
    title: "사양",
    dataIndex: "goodsGroupOption",
    render: (goodsGroupOption: any) => goodsGroupOption.spec,
  },
  {
    title: "가격",
    dataIndex: "goodsGroupOption",
    render: (goodsGroupOption: any) => goodsGroupOption.price,
  },
];

//*  dealerOrderColumns
export const dealerOrderColumns = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "주문량",
    dataIndex: "orderCount",
  },
  {
    title: "주문금액",
    dataIndex: "orderTotalPrice",
    isDesc: true,
  },
  {
    title: "생성일",
    dataIndex: "createdAt",
    isDesc: true,
    render: (createdAt: string) => changeDays(createdAt),
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
    isDesc: true,
    render: (updatedAt: string) => changeDays(updatedAt),
  },
];

//*  sellChargeColumns
export const sellChargeColumns = [
  {
    title: "판매사 명",
    dataIndex: "vendorName",
  },
  {
    title: "작성자",
    dataIndex: "masterUserId",
  },
  {
    title: "품목명",
    dataIndex: "productName",
  },
  {
    title: "판매 수수료",
    dataIndex: "chargeRatio",
  },
];

//*  minPointColumns
export const minPointColumns = [
  {
    title: "판매사 명",
    dataIndex: "vendorName",
  },
  {
    title: "작성자",
    dataIndex: "masterUserId",
  },
  {
    title: "품목명",
    dataIndex: "productName",
  },
  {
    title: "판매 수수료",
    dataIndex: "pointRatio",
  },
];

export const dealerOrderDetailColumns: ColumnsType[] = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "송장번호",
    dataIndex: "deliveryNum",
  },
  {
    title: "상품명",
    dataIndex: "dealerOrderItem",
    render: (dealerOrderItem: any) => dealerOrderItem?.goodsItem.name,
  },
  {
    title: "수령인",
    dataIndex: "addr_name",
  },
  {
    title: "판매상태",
    dataIndex: "orderStatus",
    render: (orderStatus: string) => changeDeliveryStatus(orderStatus),
  },
];
