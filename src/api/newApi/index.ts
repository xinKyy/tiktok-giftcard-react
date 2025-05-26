// TikTok 礼品卡系统 API 封装
import { get, post } from '../../http/requestNew';

// 公钥获取
export const getPublicKey = () => get<{ publicKey: string }>('/auth/public-key');

// 发送验证码
export interface SendCodeParams {
  email: string;
  type: 1 | 2 | 3;
}
export const sendVerificationCode = (data: SendCodeParams) => post<null>('/auth/sendVerificationCode', data);

// 注册
export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  verificationCode: string;
}
export interface UserInfo {
  id?: number;
  username?: string;
  email?: string;
  status?: number;
  createTime?: string;
}
export const register = (data: RegisterParams) => post<UserInfo>('/auth/register', data);

// 登录
export interface LoginParams {
  username: string;
  password?: string;
  verificationCode: string;
}
export interface LoginResult {
  token: string;
  refreshToken: string;
}
export const login = (data: LoginParams) => post<LoginResult>('/auth/login', data);

// 刷新Token
export interface RefreshTokenParams {
  refreshToken: string;
}
export const refreshToken = (data: RefreshTokenParams) => post<LoginResult>('/auth/refresh', data);

// 修改密码
export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  verificationCode: string;
}
export const changePassword = (data: ChangePasswordParams) => post<null>('/auth/changePassword', data);

// 获取用户信息
export const getUserInfoNewAPI = () => get<UserInfo>('/user/info');

// 礼品卡列表
export interface GiftCard {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  status: number;
  amount: number;
  value: number;
  check: boolean;
}
export const getGiftCardList = (params?: { page?: number; size?: number; category?: number; keyword?: string }) =>
  get<GiftCard[]>('/giftCard/list', params);

// 礼品卡详情
export const getGiftCardDetail = (id: number) => get<GiftCard>(`/gift-cards/${id}`);

// 创建订单
export interface CreateOrderParams {
  giftCardId: number;
  quantity: number;
}
export interface Order {
  id: number;
  orderNo: string;
  giftCardId: number;
  quantity: number;
  totalAmount: number;
  status: number;
  createTime: string;
  payTime?: string;
  giftCard?: Pick<GiftCard, 'id' | 'name' | 'price'>;
}

export interface OrderItem {
    id: number;
    orderId: number;
    giftCardId: number;
    giftCardName: string;
    giftCardImage: string | null;
    quantity: number;
    price: number;
    subtotal: number;
    createTime: string;  // ISO 字符串
    updateTime: string;
}

export interface OrderDetails {
    id: number;
    orderNo: string;
    userId: number;
    userName: string;
    userEmail: string;
    giftCardId: number | null;
    quantity: number;
    unitPrice: number | null;
    totalAmount: number;
    status: number;
    paymentMethod: string | null;
    tradeNo: string | null;
    failReason: string | null;
    payTime: string | null;
    createTime: string;
    updateTime: string;
    deleted: number;
}

export interface OrderStatistics {
    totalAmount: number;
    totalItems: number;
    totalQuantity: number;
}

export interface OrderDetailResponse {
    items: OrderItem[];
    order: Order;
    statistics: OrderStatistics;
}

export const createOrder = (data: CreateOrderParams[]) => post<Order>('/order/create', data);

// 订单列表
export interface OrderItem {
    id: number
    orderId: number
    giftCardId: number
    giftCardName: string
    giftCardImage: string | null
    quantity: number
    price: number
    subtotal: number
    createTime: string
    updateTime: string
}

export interface OrderRecord {
    id: number
    orderNo: string
    userId: number
    userName: string
    userEmail: string
    giftCardId: number | null
    quantity: number
    unitPrice: number | null
    totalAmount: number
    status: number
    paymentMethod: string | null
    tradeNo: string | null
    failReason: string | null
    payTime: string | null
    createTime: string
    updateTime: string
    deleted: number
}

export interface OrderResponse {
    total: number
    current: number
    pages: number
    size: number
    records: OrderRecord[]
    orderItems: Record<number, OrderItem[]>
}

export const getOrderList = (data?: {
  page?: number;
  pageSize?: number;
  status?: number;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
}) => post<OrderResponse>('/order/list', data);

// 订单详情
export const getOrderDetail = (id: string) => get<OrderDetailResponse>(`/order/query/${id}`);


export interface PaymentMethod {
    id: number
    countryCode: string
    countryName: string
    paymentType: string
    paymentName: string
    paymentIcon: string
    sort: number
    status: number
    createTime: string
    updateTime: string
}


export const getPaymentList = () => get<PaymentMethod[]>(`/payment/method/country/JPY`);

// 取消订单
export const cancelOrder = (id: number) => post<null>(`/order/${id}/cancel`);

// 创建支付
export const createPayment = (data: { paymentMethodId: number, orderId: number }) =>
  post<string>(`/order/pay`, data);

// 支付回调 & 通知 (通常不直接调用，后台接收)
export const paymentCallback = (data: any) => post<string>('/payment/callback', data);
export const paymentNotify = (data: any) => post<string>('/payment/notify', data);
