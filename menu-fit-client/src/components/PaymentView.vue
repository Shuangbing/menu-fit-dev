<template>
  <div class="md-example-child md-example-child-result-page md-example-child-result-page-3">
    <md-result-page
      class="customized"
      img-url="https://popcorn-images-aws.s3.ap-northeast-1.amazonaws.com/popcorn_white.png"
      text="支払完了"
      subtext="しばらくお待ちください"
    >
      <span></span>
    </md-result-page>
    <span></span>
  </div>
</template>

<script>
import { ResultPage } from "mand-mobile";

export default {
  name: "result-page-demo",
  components: {
    [ResultPage.name]: ResultPage
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
  },
  methods: {
    async fetch() {
    }
  },
  data() {
    return {
      data: []
    };
  }
};
</script>
