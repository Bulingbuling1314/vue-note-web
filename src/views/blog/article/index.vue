<template>
    <div>
        <Card :bordered="false">
            <div class="b_flex b_justify_between">
                <Input style="width: 200px" v-model="value" placeholder="Basic usage" />
                <div class="b_btn_group">
                    <Button type="primary" @click="openAdd">
                        <template #icon>
                            <Icon type="ios-checkmark" />
                        </template>
                        Add Menu
                    </Button>
                </div>
            </div>
        </Card>
        <Card title="Menu List" :bordered="false">
            <BTable ref="bTableRef" :columns="columns" :list="list">
                <template #action="{ scope }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(scope)">编辑</Button>
                    <Button type="error" size="small" @click="del(scope)">删除</Button>
                </template>
            </BTable>
        </Card>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { articleSave, articleRemove } from '@/service'
import BTable from '@/components/BTable/index.vue'
import { Message } from 'view-ui-plus'
import { IArticle } from '@/service/interface'

const bTableRef = ref()
const show = reactive({
    add: false
})
const value = ref("")
const form = reactive({
    add: {
        title: '',
        intro: '',
        blogContent: ''
    }
})

const columns = [
    {
        title: '序号',
        key: 'id',
        width: 80
    },
    {
        title: '标题',
        key: 'title'
    },
    {
        title: '创建时间',
        key: 'createDate',
        width: 200
    },
    {
        title: '更新时间',
        key: 'updateDate',
        width: 200
    },
    {
        title: '作者',
        key: 'author',
        width: 100
    },
    {
        title: '描述',
        key: 'intro'
    },
    {
        title: '操作',
        slot: 'action',
        width: 200
    }
]

const openAdd = () => {
    form.add = {
        title: '',
        intro: '',
        blogContent: ''
    }
    show.add = true
}

const edit = (item: IArticle) => {
    console.log(item)
    form.add = { ...form.add, ...item }
    show.add = true
}
const del = (item: IArticle) => {
    articleRemove({ id: item.id }).then((res) => {
        Message.success(res.data)
        bTableRef.value.loadPage()
    })
}

const save = (data: any) => {
    articleSave(data).then((_) => {
        Message.success('操作成功！')
        show.add = false
    })
}
onMounted(() => {
})



const list = {
    url: '/web/article/getAll',
    method: 'GET'
}
</script>

