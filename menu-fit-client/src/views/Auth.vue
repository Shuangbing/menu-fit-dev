<template>
  <div class="main">
    <md-steps :steps="steps"></md-steps>
    <div class="button">
      <md-button class="md-button-line" @click="$router.push('/client/auth/login')" type="default">
      LINEでログイン
      </md-button>
      <md-button class="md-button-alipay" type="default">
      Alipayでログイン
      </md-button>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.main {
  background-color: #f9fafb;
  height: 100vh;
}

.button {
  margin: 30px 30px 30px 30px;
  height: 90vh;
}

.md-button-line {
  background-color: #58bf38;
  color: white;
  margin-bottom: 20px;
}

.md-button-alipay {
  background-color: #44a9e8;
  color: white;
}
</style>

<script>
import { Steps } from "mand-mobile";

export default {
  name: "steps-demo",
  components: {
    [Steps.name]: Steps
  },
  data() {
    return {
      steps: [
        {
          name: "ログイン"
        },
        {
          name: "注文"
        },
        {
          name: "支払い"
        }
      ]
    };
  }
};
</script>
