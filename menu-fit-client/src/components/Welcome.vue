<style scoped>
.layout {
  margin: 0 auto;
  text-align: center;
}
.button {
  width: 80vw;
  margin: 10px 0 10px 0;
}
.footer {
  position: relative;
  top: 70vh;
}
</style>

<template>
  <div class="layout">
    <div class="footer">
      <md-button class="button" type="default" round>スキップ</md-button>
      <md-button class="button" type="primary" round>食事制限情報登録</md-button>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from "mand-mobile";
export default {
  name: "button-demo",
  components: {
    [Button.name]: Button
  }
};
</script>