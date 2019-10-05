<template>
  <main id="home" class="view">
    <div class="heading">
      <h1>
        <span>Menu.Fit</span>
      </h1>
      <p>アレルギや宗教上で食事制限のある方は食事制限情報を登録しますか</p>
    </div>
    <div class="footer">
      <md-button class="button" type="default" round @click="handleClick">スキップ</md-button>
      <md-button class="button" type="primary" round @click="handleClick">食事制限情報登録</md-button>
    </div>
  </main>
</template>

<script>
import { Button, Toast } from "mand-mobile";

export default {
  name: "App",
  components: {
    [Button.name]: Button
  },
  methods: {
    handleClick() {
      Toast.info("Button has clicked");
    }
  }
};
</script>

<style lang="stylus" scoped>
.view {
  padding: 20px 20px;
  display : absolute;
  .footer {
    .md-button {
      height: 8vh;
      font-size: 2.5vh;
      margin-bottom: 20px;
    }
  }
  .heading {
    text-align: center;
    margin-bottom: 48px;

    .md-icon {
      width: 100px;
      height: 80px;
    }

    h1 {
      color: #333;
      line-height: 1.15;
      font-size: 5vh;
      margin-bottom: 32px;

      span {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 0;
          bottom: 8px;
          width: 100%;
          height: 20px;
          background: #ecf6ff;
        }
      }
    }

    p {
      font-size: 2.5vh;
      color: #666;
      line-height: 3vh;
    }
  }
}
</style>
