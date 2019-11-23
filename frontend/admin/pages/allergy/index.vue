<template>
  <div>
    <AllergyForm :editData="editData" />
    <div style="text-align: right; margin-bottom: 10px;">
      <a-button type="primary" @click="showEditor(null)">新規追加</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" :loading="$store.state.loading" rowKey="_id">
      <template slot="action" slot-scope="data">
        <a-button
          slot="action"
          style="margin-right: 10px;"
          type="primary"
          @click="showEditor(data._id)"
        >編集</a-button>
        <a-popconfirm
          title="このアレルギーを削除しますか"
          @confirm="confirm(data._id)"
          okText="はい"
          cancelText="いいえ"
        >
          <a-button type="danger">削除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import AllergyForm from "../../components/Form/Allergy.vue";

@Component({
  components: { AllergyForm }
})
export default class CategoryIndex extends Vue {
  editData = {};
  data = {};

  columns = [
    {
      title: "アレルギー",
      dataIndex: "title",
      width: "60%"
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      scopedSlots: { customRender: "action" }
    }
  ];

  async showEditor(editID?: string) {
    if (editID) {
      this.editData = await this.$axios.$get("/admin/allergies/" + editID);
    } else {
      this.editData = null;
    }
    this.$store.commit("showEditor", true);
  }

  @Watch("$store.state.editVisible")
  private dataChange(val: any, oldVal: any) {
    if (val == false) {
      this.refresh();
    }
  }

  async confirm(id) {
    await this.$axios.delete("/admin/allergies/" + id);
    this.refresh();
  }

  async refresh() {
    this.data = await this.$axios.$get("/admin/allergies");
  }

  async asyncData({ app }) {
    return {
      data: await app.$axios.$get("/admin/allergies")
    };
  }
}
</script>

