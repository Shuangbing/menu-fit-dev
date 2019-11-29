<template>
  <div class="main">
    <a-modal
      title="会計"
      :visible="accountingVisible"
      @ok="accountingOrder(selectAccountingOrder._id, selectAccountingOrder.total, deposit)"
      @cancel="deposit=0; accountingVisible = false"
    >
      <p>合計金額: ¥{{selectAccountingOrder.total}}</p>
      <span>預かり金額:</span>
      <a-input-number
        v-model="deposit"
        style="width: 7rem; margin-bottom: 1rem;"
        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\¥\s?|(,*)/g, '')"
      />
      <a-button type="default" @click="deposit+=10000">¥10,000</a-button>
      <a-button type="default" @click="deposit+=5000">¥5,000</a-button>
      <a-button type="default" @click="deposit+=1000">¥1,000</a-button>
      <p>お釣り: ¥{{deposit - selectAccountingOrder.total}}</p>
    </a-modal>
    <div style="text-align: right; margin-bottom: 10px;">
      <a-checkbox @change="onChange">自動更新</a-checkbox>
      <a-button type="primary" icon="redo" :loading="$store.state.loading" @click="refresh">更新</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" :loading="$store.state.loading" rowKey="_id">
      <template slot="table" slot-scope="table">
        <a-tag color="#808080">{{ table.tableNo }}</a-tag>
      </template>
      <template slot="avatar" slot-scope="user">
        <a-avatar shape="square" size="small" icon="user" :src="user.profile.picture" />
        <span>{{user.profile.name}}</span>
      </template>
      <template slot="status" slot-scope="row">
        <a-tag v-if="row.status == -1" color="#f50">キャンセル</a-tag>
        <a-tag v-if="row.status == 0" color="#2db7f5">支払待ち</a-tag>
        <a-tag v-if="row.status == 1" color="#87d068">支払済み</a-tag>
        <a-tag v-if="row.status == 2" color="#333">完了</a-tag>
        <a-button
          v-if="row.status == 0"
          @click="deposit=0; selectAccountingOrder=row; accountingVisible = true"
          type="default"
        >会計</a-button>
      </template>
      <template slot="payment" slot-scope="payment">
        <a-tag v-if="payment == 'line-pay'" color="blue">LINE Pay</a-tag>
        <a-tag v-if="payment == 'cash'" color="blue">現金</a-tag>
      </template>
      <template slot="total" slot-scope="total">¥{{total}}</template>
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

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class OrderIndex extends Vue {
  data = {};
  pagination = {};
  loading = false;
  intervalId: NodeJS.Timer | null;
  accountingVisible: boolean = false;
  deposit: number = 0;
  selectAccountingOrder: any = {};

  columns = [
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
      width: "15rem",
      scopedSlots: { customRender: "detail" }
    }
  ];

  async accountingOrder(orderId: string, amount: number, deposit: number) {
    if (deposit >= amount) {
      await this.$axios.$put("/admin/orders/accounting/" + orderId);
      this.accountingVisible = false;
      this.selectAccountingOrder = {};
      this.refresh();
    }
  }

  async asyncData({ app }) {
    return {
      data: await app.$axios.$get("/admin/orders")
    };
  }

  onChange(e) {
    if (e.target.checked) {
      this.intervalId = setInterval(this.refresh, 5000);
    } else {
      clearInterval(this.intervalId);
    }
  }

  async refresh() {
    this.data = await this.$axios.$get("/admin/orders");
  }

  destroyed() {
    clearInterval(this.intervalId);
  }
}
</script>
