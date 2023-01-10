/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
const axios = require("axios");
const crypto = require("crypto-js");

const types = {
  type: "YOUDAO_TRANSLATION_WIDGET",
  icon: "https://static.codemao.cn/appcraft/extension-widgets/production/blink-button.svg",
  title: "有道翻译",
  isInvisibleWidget: true,
  isGlobalWidget: true,
  properties: [
    {
      key: "__width", // 内置属性
      label: "宽度",
      valueType: "number", // 数字类型
      defaultValue: 68,
    },
    {
      key: "__height", // 内置属性
      label: "高度",
      valueType: "number", // 数字类型
      defaultValue: 36,
    },
    {
      key: "app_key",
      label: "AppKey",
      valueType: "string", // 字符串类型
      // defaultValue: "7ae29ee68b869af8",
      defaultValue: "",
    },
    {
      key: "app_secret",
      label: "AppSecret",
      valueType: "string", // 字符串类型
      // defaultValue: "BfhXtWH8EkNYEDyyWSQimHnO04VjcmOH",
      defaultValue: "",
    },
    {
      key: "from",
      label: "源语言",
      valueType: "string",
      defaultValue: "auto",
      dropdown: [
        // 下拉属性
        { label: "英文", value: "en" },
        { label: "中文", value: "zh-CHS" },
      ],
    },
    {
      key: "to",
      label: "目标语言",
      valueType: "string",
      defaultValue: "en",
      dropdown: [
        // 下拉属性
        { label: "英文", value: "en" },
        { label: "中文", value: "zh-CHS" },
      ],
    },
  ],
  methods: [
    {
      key: "translate",
      label: "开始",
      params: [
        {
          key: "str",
          label: "翻译内容",
          valueType: "string",
          defaultValue: "",
        },
      ],
      valueType: "string",
    },
  ],
  events: [
    {
      key: "onError",
      label: "出错",
      params: [
        {
          key: "content",
          label: "出错信息",
          valueType: "string",
        },
      ],
    },
  ],
};

class BlinkButtonWidget extends InvisibleWidget {
  // 初始化
  constructor(props) {
    super(props);
    console.log(this.app_key);
    console.log(props.app_key);
    this.app_key = props.app_key;
    this.app_secret = props.app_secret;
    this.to = props.to;
    this.from = props.from;
  }
  // 方法定义，用于事件处理
  truncate = (s) => {
    const len = s.length;
    return len <= 20
      ? s
      : s.substring(0, 10) + len + s.substring(len - 10, len);
  };

  // 方法定义
  translate = (str) => {
    if (!this.app_key || !this.app_secret) {
      this.emit("onError", "app key或app secret为空");
      return;
    }
    const time_stamps = new Date().getTime();
    const cur_time = Math.round(new Date().getTime() / 1000);
    // const q = "Hello world!";
    const q = str;
    const APP_KEY = "7ae29ee68b869af8";
    const APP_SECRET = "BfhXtWH8EkNYEDyyWSQimHnO04VjcmOH";
    const signStr =
      APP_KEY + this.truncate(q) + time_stamps + cur_time + APP_SECRET;
    const sign = this.getDigest(signStr);
    // console.log(sign);
    let result =
      "q=" +
      q +
      "&" +
      "sign=" +
      sign +
      "&" +
      "appKey=" +
      APP_KEY +
      "&" +
      "salt=" +
      time_stamps +
      "&" +
      "from=" +
      "en" +
      "&" +
      "to=" +
      "zh-CHS" +
      "&" +
      "signType=" +
      "v3" +
      "&" +
      "curtime=" +
      cur_time +
      "&";
    console.log(result);
    return result;
  };

  getDigest = (string) => {
    return crypto.SHA256(string).toString();
  };
}

exports.types = types;
exports.widget = BlinkButtonWidget;
