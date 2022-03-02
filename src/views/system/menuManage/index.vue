<template>
    <a-card title="菜单列表" :bordered="false">
      <a-table
        :columns="columns"
        :data-source="data"
        :pagination="{ pageSize: 50 }"
      >
        <template #action>
          <a>Delete</a>
        </template>
      </a-table>
    </a-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  { title: 'Action', dataIndex: '', key: 'x', slots: { customRender: 'action' } },
];

const data = [...Array(10)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}));

export default defineComponent({
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>

