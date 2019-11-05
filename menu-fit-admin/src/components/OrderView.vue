<template>
  <div class="main">
    <div style="text-align: right; margin-bottom: 10px;">
      <a-checkbox @change="onChange">自動更新</a-checkbox>
      <a-button type="primary" icon="redo" :loading="loading" @click="fetch">更新</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" :loading="loading">
      <template slot="table" slot-scope="table">
        <a-tag color="#808080">{{ table.tableNo }}</a-tag>
      </template>
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
      <template slot="total" slot-scope="total">
        ¥{{total}}
      </template>
      <template slot="detail" slot-scope="detail">
        <a-popover title="注文詳細">
          <template slot="content">
            <div v-for="(item, index) in detail" :key="index">
              <p>
                <a-tag color="red">{{item.menu.title}}</a-tag>
                ¥{{item.menu.price}}
                <a-tag color="red">x{{item.amount}}</a-tag>
                = 小計 ¥{{item.total}}
              </p>
            </div>
          </template>
          <a-button type="primary">注文詳細</a-button>
        </a-popover>
      </template>
    </a-table>
  </div>
</template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "テーブル",
    dataIndex: "table",
    width: "7rem",
    scopedSlots: { customRender: "table" }
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
    dataIndex: "total",
    scopedSlots: { customRender: "total" }
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
    onChange(e) {
      if (e.target.checked) {
        this.timer();
      } else {
        clearInterval(this.timer);
      }
    },
    async timer() {
      return setInterval(() => {
        this.fetch();
      }, 5000);
    },
    async fetch(params = {}) {
      this.loading = true;
      await this.$http.get("/admin/orders").then(data => {
        this.loading = false;
        this.data = data.data;
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
