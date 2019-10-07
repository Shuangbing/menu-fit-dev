<template>
  <a-table
    :columns="columns"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="avatar" slot-scope="avatar">
      <a-avatar shape="square" size="large" icon="user" :src="avatar"/>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "プロフィール写真",
    dataIndex: "profile.picture",
    width: "10rem",
    scopedSlots: { customRender: "avatar" }
  },
  {
    title: "名前",
    dataIndex: "profile.name",
    width: "20%"
  },
  {
    title: "openID",
    dataIndex: "openID"
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
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    async fetch(params = {}) {
      console.log("params:", params);
      this.loading = true;
      await this.$http.get("/admin/users").then((data) => {
        console.log(data)
        const pagination = { ...this.pagination };
        pagination.total = 200;
        this.loading = false;
        this.data = data.data;
        this.pagination = pagination;
      });
    }
  }
};
</script>
