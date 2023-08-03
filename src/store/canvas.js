import { getOnlyKey } from "../utils";

const defaultCanvas = {
  // 页面样式
  style: {
    width: 320,
    height: 568,
    backgroundColor: "#ffffff00",
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxSizing: "content-box",
  },
  // 组件
  cmps: [],

  // 仅用于测试
  cmps: [
    {
      key: getOnlyKey(),
      desc: "文本",
      value: "文本",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 30,
        fontSize: 12,
        color: "red",
      },
    },
  ],
};

// 状态
export default class Canvas {
  constructor(_canvas = defaultCanvas) {
    this.canvas = _canvas; // 页面数据

    this.listeners = [];
  }

  // get

  getCanvas = () => {
    return { ...this.canvas };
  };

  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  // set
  setCanvas = (_canvas) => {
    Object.assign(this.canvas, _canvas);
  };

  addCmp = (_cmp) => {
    const cmp = { key: getOnlyKey(), ..._cmp };
    // 更新画布数据
    this.canvas.cmps.push(cmp); // 将小组件添加到组件数组中，准备渲染到画布上
    // 更新组件
    this.updateApp();
  };

  updateApp = () => {
    // 组件更新
    this.listeners.forEach((lis) => lis());
  };

  subscribe = (listener) => {
    // 订阅事件
    this.listeners.push(listener);
    // 返回一个取消订阅的函数
    return () => {
      this.listeners = this.listeners.filter((lis) => lis !== listener);
    };
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      addCmp: this.addCmp,
      subscribe: this.subscribe,
    };

    return obj;
  };
}
