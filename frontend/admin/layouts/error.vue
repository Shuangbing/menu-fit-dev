<template>
  <div class="main">
    <a-alert message="エラー" :description="error.message" type="warning" showIcon />
    <a-button style="margin-top: 1rem" @click="back">戻る</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class Error extends Vue {
  @Prop() error: any;
  
  back() {
    history.back();
  }
}
</script>
