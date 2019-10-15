<template>
  <div class="main">
    <div class="md-example-child md-example-child-bill-1">
      <md-bill>
        <div class="header-slot" slot="header">
          <h1 class="title">注文内容</h1>
          <p class="desc">注文内容を確認し支払いをしてください</p>
        </div>
        <md-detail-item title="注文内容" />
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="唐揚げ６個入り ¥100 x 2">&yen;100</md-detail-item>
        <md-detail-item title="合計金額">&yen;30,000</md-detail-item>
        <div class="footer-slot" slot="footer">
          <md-field title="支払方法" class="radio-field">
            <md-radio-list v-model="payment" :options="payments" icon-size="lg" />
          </md-field>
          <md-button type="primary" round>支払う</md-button>
        </div>
      </md-bill>
    </div>
  </div>
</template>

<script>
import { Bill, DetailItem, Icon, Tag } from "mand-mobile";

export default {
  name: "bill-demo",
  components: {
    [Bill.name]: Bill,
    [DetailItem.name]: DetailItem,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  data() {
    return {
      payments: [
          {
          value: 'line_pay',
          text: 'LINE Pay',
          brief: 'サクッと!ポイント2倍!',
        },
        {
          value: 'cash',
          text: '現金',
          brief: '100円につき1ポイント',
        },
      ],
      payment: "line_pay"
    };
  }
};
</script>

<style lang="stylus">
.main {
  padding: 1rem 1rem;
}

.md-example-child-bill-1 {
  .md-bill {
    background-color: #FFF;
    box-shadow: 0 6px 24px rgba(17, 26, 52, 0.05);

    &.md-water-mark {
      overflow: visible;
    }

    .md-bill-neck {
      &:before, &:after {
        content: '';
        position: absolute;
        top: 0;
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-color: #F3F4F5;
      }

      &:before {
        left: -46px;
      }

      &:after {
        right: -46px;
      }
    }

    .header-slot {
      padding: 40px 0 20px 0;

      .title {
        color: #111A34;
        font-size: 60px;
        line-height: 1;
      }

      .desc {
        margin-top: 16px;
        color: #858B9C;
        font-size: 26px;
      }
    }

    .footer-slot {
      padding: 32px 0;
      color: #858B9C;
      font-size: 22px;
      line-height: 1.5;
      border-top: solid 1px #E1E4EB;
    }
  }
}
</style>
