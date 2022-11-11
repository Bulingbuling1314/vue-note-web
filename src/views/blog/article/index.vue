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
import { IArticle } from '@/api/@types/IArticle'
import add from './model/add.vue'
import { ref, reactive } from '@vue/reactivity'
import { createArticle } from '@/api/article'
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
            add: {
                title: '',
                intro: '',
                blogContent: ''
            }
        })

        const openAdd = () => {
            form.add = {
                title: '',
                intro: '',
                blogContent: ''
            }
            show.add = true
        }

        const edit = (item: IArticle) => {
            console.log(bTableRef)
            bTableRef.value.loadPage()
            // form.add = item
            // show.add = true
        }
        const del = (item: IArticle) => {
            // removeMenu({ id: item.id }).then((res) => {
            //     message.success(res.data)
            //     bTableRef.value.loadPage()
            // })
        }

        const save = (data: any) => {
            createArticle(data).then((_) => {
                message.success('操作成功！')
                show.add = false
            })
        }
        return {
            show,
            form,
            bTableRef,
            columns: [
                {
                    title: 'Id',
                    dataIndex: 'id',
                    width: 200
                },
                {
                    title: '标题',
                    dataIndex: 'title'
                },
                {
                    title: '创建时间',
                    dataIndex: 'createDate'
                },
                {
                    title: '更新时间',
                    dataIndex: 'updateDate'
                },
                {
                    title: '作者',
                    dataIndex: 'author'
                },
                {
                    title: '描述',
                    dataIndex: 'intro'
                },
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    slots: { customRender: 'action' }
                }
            ],
            list: {
                url: '/bb/web/article/getAll',
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

