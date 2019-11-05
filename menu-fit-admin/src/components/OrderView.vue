<template>
  <a-table :columns="columns" :dataSource="data" :loading="loading">
    <template slot="avatar" slot-scope="user">
      <a-avatar shape="square" size="small" icon="user" :src="user.profile.picture" />
      <span>{{user.profile.name}}</span>
    </template>
    <template slot="status" slot-scope="status">
      <a-tag v-if="status == -1" color="#f50">キャンセル済み</a-tag>
      <a-tag v-if="status == 0" color="#2db7f5">支払待ち</a-tag>
      <a-tag v-if="status == 1" color="#87d068">支払済み</a-tag>
      <a-tag v-if="status == 2" color="#f50">退店</a-tag>
    </template>
    <template slot="payment" slot-scope="payment">
      <a-tag v-if="payment == 'line-pay'" color="blue">LINE Pay</a-tag>
      <a-tag v-if="payment == 'cash'" color="blue">現金</a-tag>
    </template>
    <template slot="detail" slot-scope="detail">
      <a-popover title="注文詳細">
        <template slot="content">
          <div v-for="(item, index) in detail" :key="index">
          <p>{{item.menu.title}} x{{item.amount}}</p>
          <p>合計金額 ¥{{item.total}}</p>
          </div>
        </template>
        <a-button type="primary">注文詳細</a-button>
      </a-popover>
    </template>
  </a-table>
</template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "テーブル",
    dataIndex: "table.tableNo",
    width: "7rem"
  },
  {
    title: "顧客",
    dataIndex: "user",
    width: "10rem",
    scopedSlots: { customRender: "avatar" }
  },
  {
    title: "注文状態",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "支払方法",
    dataIndex: "payment",
    scopedSlots: { customRender: "payment" }
  },
  {
    title: "合計金額",
    dataIndex: "total"
  },
  {
    title: "注文詳細",
    dataIndex: "detail",
    width: "10rem",
    scopedSlots: { customRender: "detail" }
  }
];

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    };
  },
  methods: {
    async fetch(params = {}) {
      this.loading = true;
      await this.$http.get("/admin/orders").then(data => {
        this.loading = false;
        this.data = data.data;
      });
    }
  }
};
</script>
