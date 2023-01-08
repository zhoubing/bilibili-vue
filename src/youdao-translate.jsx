/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
const axios = require('axios');
const crypto = require("crypto-js");

const types = {
    type: 'YOUDAO_TRANSLATION_WIDGET',
    icon: 'https://static.codemao.cn/appcraft/extension-widgets/production/blink-button.svg',
    title: '有道翻译',
    isInvisibleWidget: true,
    isGlobalWidget: true,
    properties: [
      {
        key: '__width', // 内置属性
        label: '宽度',
        valueType: 'number', // 数字类型
        defaultValue: 68,
      },
      {
        key: '__height', // 内置属性
        label: '高度',
        valueType: 'number', // 数字类型
        defaultValue: 36,
      },
      {
        key: 'trans_content',
        label: '翻译内容',
        valueType: 'string', // 字符串类型
        defaultValue: 'Hello',
      },
      {
        key: 'app_key',
        label: 'AppKey',
        valueType: 'string', // 字符串类型
        defaultValue: '7ae29ee68b869af8',
      },
      {
        key: 'app_secret',
        label: 'AppSecret',
        valueType: 'string', // 字符串类型
        defaultValue: 'BfhXtWH8EkNYEDyyWSQimHnO04VjcmOH',
      },
      {
        key: 'from',
        label: '源语言',
        valueType: 'string',
        defaultValue: 'auto',
        dropdown: [
          // 下拉属性
          { label: '英文', value: 'en' },
          { label: '中文', value: 'zh-CHS' },
        ],
      },
      {
        key: 'to',
        label: '目标语言',
        valueType: 'string',
        defaultValue: 'auto',
        dropdown: [
          // 下拉属性
          { label: '英文', value: 'en' },
          { label: '中文', value: 'zh-CHS' },
        ],
      },
      {
        key: 'disabled',
        label: '是否禁用',
        valueType: 'boolean', // 布尔类型
        defaultValue: false,
      },
      {
        key: 'backgroundColor',
        label: '按钮颜色',
        valueType: 'color',
        defaultValue: '#1495ef',
      },
    ],
    methods: [
      {
        key: 'blink',
        label: '开始',
        params: [
          {
            key: 'times',
            label: '次数',
            valueType: 'number',
            defaultValue: 5,
          },
        ],
      },
    ],
    events: [
      {
        key: 'onClick',
        label: '被点击',
        params: [
          {
            key: 'content',
            label: '按钮文案',
            valueType: 'string',
          },
        ],
      },
    ],
  };
  
  // 生成随机颜色
  function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = 'rgba(' + r + ',' + g + ',' + b + ')';
    return color;
  }
  
  class BlinkButtonWidget extends InvisibleWidget {
    // 初始化
    constructor(props) {
      super(props);
      console.log('constructor!!!');
    }
  
    // 方法定义，用于事件处理
    onClick = () => {
      console.log('onClick!!!');
      this.emit('onClick', this.content);
      this.clickCount++;
    };

    stringToByte = (str) => {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    };

    truncate = (s) => {
        var len = s.length;
        return len <= 20 ? s : (s.substring(0, 10) + len + s.substring(len - 10, len));
    };

    // 方法定义
    blink = (times) => {
        console.log("Hello Youdao");
        var time_stamps = Date.parse(new Date());
        var cur_time = time_stamps / 1000;
        var q = "Hello"
        var APP_KEY = "123"
        var APP_SECRET = "456"
        var signStr = APP_KEY + this.truncate(q) + time_stamps.toString() + cur_time.toString() + APP_SECRET;
        var sign = this.getDigest(signStr);
        console.log(sign)
    };
  

    getDigest = (string) => {
        var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var byte_arr = this.stringToByte(string);
        console.log(crypto)
        var crypt_arr = crypto.SHA256(byte_arr)
        var j = crypt_arr.length;
        var bytes = new Array();
        for (var i = 0; i < crypt_arr * 2; i++) {
            bytes.push(hexDigits[byte0 >>> 4 & 0xf])
            bytes.push(hexDigits[byte0 & 0xf])

        }
        return new String(bytes);
    };


    // 获取按钮点击次数
    getClickCount = () => {
      return this.clickCount;
    };

  }
  
  exports.types = types;
  exports.widget = BlinkButtonWidget;
  