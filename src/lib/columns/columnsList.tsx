import {
  changeDeliveryStatus,
  changeDays,
  changePhone,
  changeStatus,
  changeTextCut,
  changeSellStatus,
  priceToString,
} from "lib/functions/changeInput";

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
  FaBook,
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
  render?: (
    data: any,
    list?: any,
    index?: number
  ) => JSX.Element | string | number | undefined;
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
        icon: <FaBook />,
        menuName: "약관관리",
        url: "/terms",
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
        disable: true,
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

export const masterAllListColumns: ColumnsType[] = [
  {
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
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
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
  {
    title: "코드",
    dataIndex: "info",
    render: (info) => info.code,
  },
  {
    title: "모델명",
    dataIndex: "info",
    render: (info) => changeTextCut(info.basic.info.model),
  },
  {
    title: "이름",
    dataIndex: "info",
    render: (info) => changeTextCut(info.basic.info.name),
  },
  {
    title: "생성일",
    dataIndex: "base",
    isDesc: true,
    render: (base) => changeDays(base.createdAt),
  },
  {
    title: "수정일",
    dataIndex: "base",
    isDesc: true,
    render: (base) => changeDays(base.updatedAt),
  },
  {
    title: "재고",
    dataIndex: "info",
    isDesc: true,
    render: (info) => info.stock,
  },
  {
    title: "판매량",
    dataIndex: "info",
    isDesc: true,
    render: (info) => info.sellCount,
  },
  {
    title: "판매상태",
    dataIndex: "info",
    render: (info) => changeSellStatus(info.sellStatus),
  },
];

//* vendorAllListColumns
export const vendorAllListColumns: ColumnsType[] = [
  {
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
      return info.bizInfo.info.basic.info.name;
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
];

export const vendorOrderLogColumns: ColumnsType[] = [
  {
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
  {
    title: "상태",
    dataIndex: "info",
    render: (info) => changeDeliveryStatus(info.status),
  },
  {
    title: "관리자",
    dataIndex: "info",
    render: (info) => info.userId,
  },
  {
    title: "메모",
    dataIndex: "info",
    render: (info) => (info.description ? info.description : "-"),
  },
  {
    title: "수정일",
    dataIndex: "base",
    render: (base) => changeDays(base.updatedAt),
  },
];

//* vendorAdminListColumns
export const vendorAdminListColumns: ColumnsType[] = [
  {
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
  {
    title: "코드",
    dataIndex: "info",
    render: (info) => (info.code === null ? "미승인" : info.code),
  },
  {
    title: "사업자명",
    dataIndex: "info",
    render: (info) => info.bizInfo.info.basic.info.name,
  },
  {
    title: "대표품목",
    dataIndex: "info",
    render: (info) => info.bizInfo.info.basic.info.headProduct.info.nameKr,
  },
  {
    title: "보유 포인트",
    dataIndex: "savedPoint",
    isDesc: true,
    render: (savedPoint) => savedPoint + "P",
  },
  {
    title: "생성일",
    dataIndex: "base",
    isDesc: true,
    render: (base) => changeDays(base.createdAt),
  },
  {
    title: "수정일",
    dataIndex: "base",
    isDesc: true,
    render: (base) => changeDays(base.updatedAt),
  },
  {
    title: "상태",
    dataIndex: "info",
    render: (info) => changeStatus(info.bizStatus),
  },
  // {
  //   title: "주문 조회",
  //   dataIndex: "id",
  //   render: (id: string) => {
  //     return (
  //       <Link
  //         to={`/dealer/order/orderByDealerId/${id}`}
  //         onClick={(e) => {
  //           e.stopPropagation();
  //         }}
  //       >
  //         <Button>조회</Button>
  //       </Link>
  //     );
  //   },
  // },
];

//* vendorOrderColumns
export const vendorOrderColumns: ColumnsType[] = [
  {
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
  {
    title: "구매자명",
    dataIndex: "info",
    render: (info) => info.clientInfo.clientName,
  },
  {
    title: "주문자명",
    dataIndex: "info",
    render: (info) => info.address.info.application,
  },
  {
    title: "주문자 연락처",
    dataIndex: "info",
    render: (info) => info.address.info.mobile,
  },
  {
    title: "모델명",
    dataIndex: "info",
    render: (info) => info.item.info.basic.info.model,
  },
  {
    title: "상품명",
    dataIndex: "info",
    render: (info) => info.item.info.basic.info.name,
  },
  {
    title: "주문수량",
    dataIndex: "info",
    render: (info) => info.count + "개",
  },
  {
    title: "주문금액",
    dataIndex: "info",
    render: (info) => priceToString(info.payTotal) + "원",
  },
  {
    title: "주문상태",
    dataIndex: "info",
    render: (info) => changeDeliveryStatus(info.orderStatus),
  },
];

//* vendorPaymentColumns
export const vendorPaymentColumns: ColumnsType[] = [
  {
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
    title: "번호",
    dataIndex: "",
    render: (_, __, index) => index,
  },
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
