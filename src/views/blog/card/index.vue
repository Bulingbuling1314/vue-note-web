<template>
    <div class="b-manage">
        <div class="b-manage-head">
            <div>
                管理页面
            </div>
            <div class="go-home" @click="$router.push('/')">
                首页
            </div>
        </div>
        <div class="w b-manage-card">
            <Divider orientation="left">新增标签</Divider>
            <div class="card-input">
                <Form ref="labelFormRef" :model="labelForm" :rules="ruleInline" inline>
                    <FormItem prop="name">
                        <Input v-model="labelForm.name" placeholder="label name" style="width: 300px" />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="addLabel">Save</Button>
                        <Button @click="reset">Reset</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :columns="labelColumns" :data="labelData">
                <template #action="{ row }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="labelEdit(row)">Edit</Button>
                    <Button type="error" size="small" @click="labelRemove(row)">Delete</Button>
                </template>
            </Table>
        </div>
        <div class="w b-manage-card">
            <Divider orientation="left">新增子标签</Divider>
            <div class="card-input">
                <Form ref="cardFormRef" :model="cardForm" :rules="cardRuleInline" inline>
                    <FormItem prop="name">
                        <Input v-model="cardForm.name" placeholder="name" style="width: 300px" />
                    </FormItem>
                    <FormItem prop="url">
                        <Input v-model="cardForm.url" placeholder="Url" style="width: 300px" />
                    </FormItem>
                    <FormItem prop="cardId">
                        <Select v-model="cardForm.cardId" style="width:300px">
                            <Option v-for="item in labelData" :value="item.id" :key="item.name">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="addCard">Save</Button>
                        <Button @click="reset">Reset</Button>
                    </FormItem>
                </Form>
            </div>
            <Table :columns="cardColumns" :data="cardData">
                <template #action="{ row }">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="cardEdit(row)">Edit</Button>
                    <Button type="error" size="small" @click="cardRemove(row)">Delete</Button>
                </template>
            </Table>
        </div>
    </div>
</template>
<script lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { articleSave, articleRemove } from '@/service'
import { Message } from 'view-ui-plus'
import { IArticle } from '@/service/interface'

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

const columns = [
    {
        title: '序号',
        dataIndex: 'id'
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
    console.log(bTableRef)
})



const list = {
    url: '/bb/web/article/getAll',
    method: 'GET'
}
</script>

