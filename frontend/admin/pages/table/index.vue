<template>
  <div>
    <TableForm :editData="editData" />
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
          title="このテーブルを削除しますか"
          @confirm="confirm(data._id)"
          okText="はい"
          cancelText="いいえ"
        >
          <a-button type="danger">削除</a-button>
        </a-popconfirm>
      </template>
      <template slot="smoking" slot-scope="smoking">
        <a-tag v-if="smoking" color="#108ee9">喫煙席</a-tag>
        <a-tag v-if="!smoking" color="#f50">禁煙席</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import TableForm from "../../components/Form/Table.vue";
import { Contact } from "../../types";

@Component({
  components: { TableForm }
})
export default class TableIndex extends Vue {
  editData = {};
  data = {};

  columns = [
    {
      title: "テーブル",
      dataIndex: "tableNo"
    },
    {
      title: "喫煙席",
      dataIndex: "smoking",
      scopedSlots: { customRender: "smoking" }
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
      this.editData = await this.$axios.$get("/admin/tables/" + editID);
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

  async confirm(id: string) {
    await this.$axios.delete("/admin/tables/" + id);
    this.refresh();
  }

  async refresh() {
    this.data = await this.$axios.$get("/admin/tables");
  }

  async asyncData({ app }) {
    return {
      data: await app.$axios.$get("/admin/tables")
    };
  }
}
</script>
