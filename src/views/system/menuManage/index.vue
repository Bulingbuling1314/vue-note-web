<template>
  <a-card :bordered="false">
    <div class="b_flex b_justify_between">
      <a-input
        style="width: 200px"
        v-model:value="value"
        placeholder="Basic usage"
      />
      <div class="b_btn_group">
        <a-button>Default Button</a-button>
        <a-button type="primary" @click="openAdd">
          <template #icon>
            <b-icon icon="PlusOutlined" />
          </template>
          Add Menu
        </a-button>
      </div>
    </div>
  </a-card>
  <a-card title="Menu List" :bordered="false">
    <b-table :columns="columns" :dataSource="data" :url="url">
      <template #action="record">
        <div class="editable-row-operations">
          <span>
            <a @click="edit(record.scope.text)">Edit</a>
            <a-divider type="vertical" />
            <a @click="del(record.scope.text)">Delete</a>
          </span>
        </div>
      </template>
    </b-table>
  </a-card>
  <add :form="form.add" v-model:visible="show.add" />
</template>
<script lang="ts">
import tableMixins from "@/mixins/tableMixins";
import { IMenuItem } from "@/api/@types/IMenu";
import add from "./model/add.vue";
import { reactive } from "@vue/reactivity";

export default {
  components: {
    ...tableMixins().components,
    add,
  },
  setup() {
    const show = reactive({
      add: false,
    });
    const form = reactive({
      add: {},
    });

    const edit = (item: IMenuItem) => {
      form.add = item;
      show.add = true;
    };
    const del = (item: IMenuItem) => {
      console.log(item);
    };
    return {
      show,
      form,
      columns: [
        {
          title: "路由名称",
          dataIndex: "name",
          width: 200,
        },
        {
          title: "路由地址",
          dataIndex: "path",
        },
        {
          title: "路由组件名称",
          dataIndex: "path",
        },
        {
          title: "路由类型",
          dataIndex: "type",
        },
        {
          title: "权限",
          dataIndex: "role",
        },
        {
          title: "Action",
          dataIndex: "",
          key: "x",
          slots: { customRender: "action" },
        },
      ],
      url: {
        list: "/bb/web/menu/get",
      },
      edit,
      del,
      openAdd: () => (show.add = true),
    };
  },
};
</script>

