<template>
  <div>
    <md-dialog :title="title" :closable="false" v-model="isOpen">
      <div class="dialog-banner" slot="header">
        <img
          src="http://img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a"
          alt
        />
      </div>虽然其中有一些争吵、不愉快、曲折，但重要的是一家人整整齐齐。
    </md-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class MenuDetail extends Vue {
  @Prop() isOpen: boolean;
  @Prop() title: string;
  @Prop() price: number;
  @Prop() image: string;
}
</script>

<style scoped>
.dialog-banner img {
  display: block;
  width: 100%;
}
</style>

