<template>
	<div class="order-view">
		<md-notice-bar
			v-show="!data.table_smoking"
			icon="warn"
			mode="closable"
			type="warning"
		>禁煙席のため喫煙はご遠慮ください</md-notice-bar>
		<OrderCart :menu="data.menu" :total="totalPrice()" :tableID="tableID" />
		<md-dialog title="タイトル" :closable="true">内容</md-dialog>
		<div class="header">
			<div class="title">
				<p>{{this.data.restrant_name}}</p>
				<md-tag
					size="large"
					shape="circle"
					type="fill"
					fill-color="#6495ED"
					font-color="#fff"
				>{{this.data.table_no}}</md-tag>
			</div>
			<img class="title" src="/shop.jpg" width="100" height="100" />
		</div>
		<div class="menu">
      <md-tab-bar :items="data.categories" @change="categoryFilter" :maxLength="10" />
			<md-scroll-view :scrolling-x="false" :auto-reflow="true" style="padding: 0 1rem;">
				<md-cell-item
					class="scroll-view-item"
					v-for="item in menuCategories"
					v-bind:key="item._id"
					:title="item.title"
					no-border
				>
					<img class="holder" slot="left" :src="item.picture" @click="showMenuDetail(item)" />
					<p style="font-size: 0.7rem; margin-top: 5px;">￥{{item.price}}</p>
					<a>
						<md-tag
							v-if="isHasAllergy(item.allergies) > 0"
							size="small"
							shape="fillet"
							type="fill"
							fill-color="rgba(255, 91, 96, .1)"
							font-weight="normal"
							font-color="#FF5B60"
						>アレルギー</md-tag>
					</a>
					<md-stepper v-model="item.cart" slot="right" min="0" :max="item.max" read-only />
				</md-cell-item>
			</md-scroll-view>
		</div>
    <div class="footer">
      <OrderBottom :totalPrice="totalPrice()" />
    </div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import OrderBottom from "../../components/OrderBottom.vue";
import OrderCart from "../../components/OrderCart.vue";
import { Dialog } from "mand-mobile";

@Component({
	components: {
		OrderBottom,
		OrderCart
	}
})
export default class Order extends Vue {
	data: any = {};
	menuCategories = [];

	isHasAllergy(allergies) {
		const allergiesTemp = [];
		allergies.forEach(element => {
			if (this.data.user.allergies.indexOf(element) > -1) {
				allergiesTemp.push(element);
			}
		});
		return allergiesTemp.length;
	}

	showMenuDetail(menu) {
		Dialog.alert({
			title: menu.title,
			content: menu.summary,
			confirmText: "閉じる"
		});
	}

	async asyncData({ app, query }) {
		if (query.tableId != undefined) localStorage.tableId = query.tableId;
		let data = await app.$axios.$get(
			"/client/order/" + localStorage.tableId
		);
		data.categories.unshift({ name: "0", label: "すべて" });
		return {
			tableID: localStorage.tableId,
			data: data,
			menuCategories: data.menu
		};
	}

	totalPrice() {
		var total = 0;
		if (this.data.menu) {
			this.data.menu.forEach(element => {
				if (element.cart > 0) {
					total = total + element.cart * element.price;
				}
			});
			return total;
		}
	}

	async categoryFilter(item, index, prevIndex) {
		this.menuCategories = [];
		if (item.name == 0) {
			this.menuCategories = this.data.menu;
			return;
		}
		if (this.data.menu) {
			this.data.menu.forEach(element => {
				if (element.category == item.name) {
					this.menuCategories.push(element);
				}
			});
		}
	}
}
</script>

<style scoped>
body {
	background-color: #f9fafb;
}

.order-view {
	display: grid;
	height: 100vh;
  grid-template-rows: 20% 65% 20%;
  grid-template-columns: 100%;
}

.scroll-view-item {
	padding: 0.5rem 0;
	font-size: 24px;
	border-bottom: 0.5px solid #efefef;
}

.footer {
	position: fixed;
	left: 0;
	right: 0;
	grid-row: 3;
  grid-column: 1;
}

.holder {
	display: block;
	width: 4rem;
	height: 4rem;
	border-radius: 1rem;
	background-color: #e6e6e6;
}

.header {
	grid-row: 1;
  grid-column: 1;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-items: center;
	background-color: #f9fafb;
}

.menu {
  grid-row: 2;
  grid-column: 1;
}

.title {
	margin: 1rem 1rem 1rem 1rem;
	font-size: 1.2rem;
	border-radius: 1rem;
}
</style>