class PubSub {
  static instance:any;
  subscribers:any;
  constructor() {
    if (PubSub.instance) {
      return PubSub.instance;  // 如果实例已存在，直接返回它
    }
    this.subscribers = {};  // 用于存储事件和对应的订阅者
    PubSub.instance = this;  // 将当前实例保存为单例
  }

  // 订阅事件
  subscribe(event:any, callback:any) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];  // 初始化事件的订阅者列表
    }
    this.subscribers[event].push(callback);
  }

  // 发布事件
  publish(event:any, data?:any) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback:any) => callback(data));
    }
  }

  // 取消订阅
  unsubscribe(event:any, callback:any) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event].filter((subscriber:any) => subscriber !== callback);
  }
}


export const EventName = {
  InterfaceError:"InterfaceError",
  NoAuth:"NoAth",
  KLineData:"KLineData",
};


const eventSub = new PubSub();

export default eventSub;
