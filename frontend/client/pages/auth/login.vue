<template>
  <div class="main">
    <div id="fb-root"></div>
    <script
      async
      defer
      crossorigin="anonymous"
      src="http://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v5.0"
    ></script>
    <md-steps style="padding: 100px 50px;" :steps="steps"></md-steps>
    <div class="button">
      <button @click="LoginLine" class="btn-line">
        <img class="btn-icon" src="~assets/images/line.png" />LINEでログイン
      </button>
      <button class="btn-fb">
        <img class="btn-icon" src="~assets/images/facebook.png" />Facebookでログイン
      </button>
      <!-- <div class="md-button-line" @click="LoginLine" type="default">LINEでログイン</div>
      <md-button class="md-button-alipay" type="default">Alipayでログイン</md-button>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Login extends Vue {
  steps = [
    {
      name: "ログイン"
    },
    {
      name: "注文"
    },
    {
      name: "支払い"
    }
  ];

  async mounted() {
    //Auto Login by LINE
    if (navigator.userAgent.includes("Line/")) {
      this.LoginLine();
    }
  }

  async LoginLine() {
    await this.$axios
      .get(
        "/client/auth/login?tableID=" + this.$route.query.tableID ||
          localStorage.tableID
      )
      .then(res => {
        window.location = res.data;
      });
  }
}
</script>

<style scoped>
.main {
  background-color: #f9fafb;
  height: 100vh;
}

.button {
  width: 15rem;
  margin: auto;
  height: auto;
  padding: 50px 0;
}

.btn-icon {
  height: 1.5rem;
  width: 1.5rem;
  margin: auto 0.1rem auto 0.5rem;
  float: left;
}

.btn-line {
  border-radius: 0.5rem;
  background-color: #00c300; /* Blue background */
  height: 3rem;
  width: 15rem;
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: auto; /* Some padding */
  font-size: 1rem; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
  margin: 1rem auto;
}

.btn-fb {
  border-radius: 0.5rem;
  background-color: #1877f2; /* Blue background */
  height: 3rem;
  width: 15rem;
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: auto; /* Some padding */
  font-size: 1rem; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}
</style>
