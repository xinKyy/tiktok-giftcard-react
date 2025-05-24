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
  id: number;
  username: string;
  email: string;
  status: number;
  createTime: string;
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
export const getUserInfo = () => get<UserInfo>('/user/info');

// 礼品卡列表
export interface GiftCard {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  status: number;
}
export interface GiftCardListResult {
  total: number;
  list: GiftCard[];
}
export const getGiftCardList = (params?: { page?: number; size?: number; category?: number; keyword?: string }) =>
  get<GiftCardListResult>('/gift-cards', params);

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
export const createOrder = (data: CreateOrderParams) => post<Order>('/order/create', data);

// 订单列表
export interface OrderListResult {
  total: number;
  list: Order[];
}
export const getOrderList = (params?: {
  page?: number;
  size?: number;
  status?: number;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
}) => get<OrderListResult>('/order/list', params);

// 订单详情
export const getOrderDetail = (id: number) => get<Order>(`/order/${id}`);

// 取消订单
export const cancelOrder = (id: number) => post<null>(`/order/${id}/cancel`);

// 创建支付
export const createPayment = (id: number, data: { paymentMethodId: string }) =>
  post<{ paymentUrl: string }>(`/order/${id}/pay`, data);

// 支付回调 & 通知 (通常不直接调用，后台接收)
export const paymentCallback = (data: any) => post<string>('/payment/callback', data);
export const paymentNotify = (data: any) => post<string>('/payment/notify', data);
