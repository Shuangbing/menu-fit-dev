<template>
  <div>
    <MenuForm :editData="editData" :categories="categories" :allergies="allergies" />
    <div style="text-align: right; margin-bottom: 10px;">
      <a-button type="primary" @click="showEditor(null)">新規追加</a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="$store.state.loading"
      rowKey="_id"
    >
      <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
      <template slot="picture" slot-scope="picture">
        <a-avatar shape="square" :size="100" icon="question" :src="picture" />
      </template>
      <template slot="action" slot-scope="data">
        <a-button
          slot="action"
          style="margin-right: 10px;"
          type="primary"
          @click="showEditor(data._id)"
        >編集</a-button>
        <a-button slot="action" type="danger">販売停止</a-button>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import MenuForm from "../../components/Form/Menu.vue";

@Component({
  components: { MenuForm }
})
export default class MenuIndex extends Vue {
  editData = {};
  data = {};
  pagination = {};
  columns = [
    {
      title: "料理写真",
      dataIndex: "picture",
      width: "10rem",
      scopedSlots: { customRender: "picture" }
    },
    {
      title: "タイトル",
      dataIndex: "title",
      sorter: true,
      scopedSlots: { customRender: "title" }
    },
    {
      title: "カテゴリー",
      dataIndex: "category.title"
    },
    {
      title: "価格",
      dataIndex: "price",
      width: "20%"
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      scopedSlots: { customRender: "action" }
    }
  ];

  async asyncData({ app }) {
    return {
      data: await app.$axios.$get("/admin/menus"),
      categories: await app.$axios.$get("/admin/categories"),
      allergies: await app.$axios.$get("/admin/allergies")
    };
  }

  async refresh() {
    this.data = await this.$axios.$get("/admin/menus");
  }

  async showEditor(editID?: string) {
    if (editID) {
      this.editData = await this.$axios.$get("/admin/menus/" + editID);
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
}
</script>
