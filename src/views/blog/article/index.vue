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
                <a-button
                    type="primary"
                    @click="openAdd"
                >
                    <template #icon>
                        <b-icon icon="PlusOutlined" />
                    </template>
                    Add Menu
                </a-button>
            </div>
        </div>
    </a-card>
    <a-card
        title="Menu List"
        :bordered="false"
    >
        <b-table
            ref="bTableRef"
            :columns="columns"
            :list="list"
        >
            <template #action="record">
                <div class="editable-row-operations">
                    <span>
                        <a @click="edit(record.scope.text)">Edit</a>
                        <a-divider type="vertical" />
                        <a-popconfirm
                            title="Are you sure delete this menu?"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="del(record.scope.text)"
                        >
                            <a href="#">Delete</a>
                        </a-popconfirm>
                    </span>
                </div>
            </template>
        </b-table>
    </a-card>
    <add
        :form="form.add"
        v-model:visible="show.add"
        @save="save"
    />
</template>
<script lang="ts">
import tableMixins from '@/mixins/tableMixins'
import { IMenuItem } from '@/api/@types/IMenu'
import add from './model/add.vue'
import { ref, reactive } from '@vue/reactivity'
import { addMenu, removeMenu } from '@/api/menu'
import { message } from 'ant-design-vue'

export default {
    components: {
        ...tableMixins().components,
        add
    },
    setup() {
        const bTableRef = ref()
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

        const edit = (item: IMenuItem) => {
            form.add = item
            show.add = true
        }
        const del = (item: IMenuItem) => {
            removeMenu({ id: item.id }).then((res) => {
                message.success(res.data)
                bTableRef.value.loadPage()
            })
        }

        const save = (data: any) => {
            addMenu(data).then((_) => {
                message.success('操作成功！')
                show.add = false
                bTableRef.value.loadPage()
            })
        }
        return {
            show,
            form,
            bTableRef,
            columns: [
                {
                    title: '路由名称',
                    dataIndex: 'name',
                    width: 200
                },
                {
                    title: '路由地址',
                    dataIndex: 'path'
                },
                {
                    title: '路由组件名称',
                    dataIndex: 'component'
                },
                {
                    title: '路由类型',
                    dataIndex: 'type'
                },
                {
                    title: '权限',
                    dataIndex: 'role'
                },
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    slots: { customRender: 'action' }
                }
            ],
            list: {
                url: '/bb/web/menu/get',
                method: 'GET'
            },
            edit,
            del,
            openAdd,
            save
        }
    }
}
</script>

