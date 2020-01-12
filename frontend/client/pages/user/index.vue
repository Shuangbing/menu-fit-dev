<template>
  <div>
    <md-field>
      <md-cell-item :title="data.name" brief="アカウント">
        <img class="avatar" slot="left" :src="data.avatar" />
      </md-cell-item>
      <md-cell-item title="注文履歴" @click="$router.push('/user/order')" arrow />
      <md-cell-item title="アレルギー情報登録" @click="openAllergySelector" arrow />
    </md-field>

    <div class="alert">
      <AllergySelector :allergiesArray="data.allergiesArray" :allergiesData="data.allergies" />
    </div>

    <div class="sub-button">
      <md-button type="primary" round @click="$router.push('/order')">注文画面に戻る</md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import AllergySelector from "../../components/AllergySelector.vue";

@Component({
  components: { AllergySelector }
})
export default class User extends Vue {
  data = {};

  openAllergySelector() {
    this.$store.commit("setAllergyVisible", true);
  }

  async asyncData({ app }) {
    return {
      data: await app.$axios.$get("/client/user")
    };
  }
}
</script>

<style>

.sub-button {
  padding: 1rem 2rem;
}
.avatar {
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  background-color: #e6e6e6;
}
</style>
