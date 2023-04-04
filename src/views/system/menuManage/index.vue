<template>
    <Card :bordered="false">
        <div class="b_flex b_justify_between">
            <Input style="width: 200px" v-model="list.params.keyword" placeholder="Basic usage" />
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
    </Card>
    <Card title="Menu List" :bordered="false">
        <BTable ref="bTableRef" :columns="columns" :list="list">
            <template #action="record">
                <div class="editable-row-operations">
                    <span>
                        <a @click="edit(record.scope.text)">Edit</a>
                        <Divider type="vertical" />
                        <Popconfirm title="Are you sure delete this menu?" ok-text="Yes" cancel-text="No"
                            @confirm="del(record.scope.text)">
                            <a href="#">Delete</a>
                        </Popconfirm>
                    </span>
                </div>
            </template>
        </BTable>
    </Card>
    <add :form="form.add" v-model:visible="show.add" @save="save" />
</template>
<script setup lang="ts">
import BTable from "@/components/BTable/index.vue"
import add from './model/add.vue'
import { ref, reactive } from '@vue/reactivity'
import { addMenu, removeMenu } from '@/service'
import { Message } from 'view-ui-plus'
import { IRouterItem } from "@/interface"

const bTableRef = ref()

const columns = [
    {
        title: '路由名称',
        key: 'name',
        width: 200
    },
    {
        title: '路由地址',
        key: 'path'
    },
    {
        title: '路由组件名称',
        key: 'component'
    },
    {
        title: '路由类型',
        key: 'type'
    },
    {
        title: '权限',
        key: 'role'
    },
    {
        title: 'Action',
        key: '',
        slots: { customRender: 'action' }
    }
]
const show = reactive({
    add: false
})
const form = reactive({
    add: {}
})

const openAdd = () => {
    form.add = {
        id: 0,
        name: '',
        meta: {
            name: '',
            icon: ''
        },
        component: '',
        parentId: 0,
        path: '',
        role: '',
        type: ''
    }
    show.add = true
}

const edit = (item: IRouterItem) => {
    form.add = item
    show.add = true
}
const del = (item: IRouterItem) => {
    removeMenu({ id: item.id }).then((res) => {
        Message.success(res.data)
        bTableRef.value.loadPage()
    })
}

const save = (data: any) => {
    addMenu(data).then((_) => {
        Message.success('操作成功！')
        show.add = false
        bTableRef.value.loadPage()
    })
}
const list = reactive({
    url: '/bb/web/menu/get',
    method: 'GET',
    params: {
        keyword: ''
    }
})
</script>

