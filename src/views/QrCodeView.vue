<template>
  <div>
    <van-button @click="login" type="primary">登陆</van-button>
    <van-button @click="download" type="primary">下载</van-button>
    <van-button @click="get_detail" type="primary">获取详细信息</van-button>
    <img style="width: 120px; height: 120px" :src="qrcode" />
    <img
      referrer="no-referrer|origin|unsafe-url"
      style="width: 120px; height: 120px"
      :src="avatar"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  name: "QrCodeView",
  methods: {
    login() {
      this.axios
        .get("http://localhost:8080/api/dataservice/qrcode")
        .then((result) => {
          console.log(result);
          this.qrcode = "data:image/jpeg;base64," + result.data;
          let timer = setInterval(() => {
            this.axios
              .get("http://localhost:8080/api/dataservice/login_info")
              .then((result) => {
                if (result.data !== "") {
                  this.avatar = result.data;
                  Toast("提示内容");
                  clearInterval(timer);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }, 15000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    get_detail() {
      this.axios
        .get("http://localhost:8080/api/dataservice/detail")
        .then((result) => {
          if (result.data !== "") {
            console.log(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    download() {
      this.axios
        .get("http://localhost:8080/api/dataservice/qrcode")
        .then((result) => {
          console.log(result);
          this.qrcode = "data:image/jpeg;base64," + result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      qrcode: "",
      avatar: "",
    };
  },
  created() {},
};
</script>
<style scoped></style>
