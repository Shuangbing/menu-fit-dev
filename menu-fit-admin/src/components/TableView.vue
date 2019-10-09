<template>
  <div>
    <a-row :gutter="24" type="flex">
      <a-col :span="6" :order="1" v-for="item in this.data" :key="item">
        <a-card :title="item.tableNo" hoverable style="margin-bottom: 1.5rem">
          <a-avatar style="backgroundColor:#87d068" icon="user" />
          <a-avatar style="backgroundColor:#87d068" icon="user" />
          <a-avatar style="backgroundColor:#87d068" icon="user" />
          <template class="ant-card-actions" slot="actions">
            <a-tag v-if="item.using" color="#f50">使用中</a-tag>
            <a-tag v-if="!item.using" color="#2db7f5">空席</a-tag>
            <a-icon type="edit" @click="$router.push('/table/' + item._id)" />
            <a-popconfirm
              title="このテーブル削除しますか"
              @confirm="confirm(item._id)"
              okText="はい"
              cancelText="いいえ"
            >
              <a href="#">
                <a-icon type="delete" />
              </a>
            </a-popconfirm>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false
    };
  },
  methods: {
    async confirm(id) {
      await this.$http.delete("/admin/tables/"+id).then(res => {
        this.$message.success('テーブル削除しました');
        this.fetch();
      });
    },
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
      this.loading = true;
      await this.$http.get("/admin/tables").then(res => {
        const pagination = { ...this.pagination };
        pagination.total = 200;
        this.loading = false;
        this.data = res.data;
        console.log(this.data);
        this.pagination = pagination;
      });
    }
  }
};
</script>
