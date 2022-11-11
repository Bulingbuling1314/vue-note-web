<template>
    <!-- 表格组件 -->
    <a-table
        :list="list"
        :dataSource="result.dataSource"
        :columns="columns"
        :pagination="false"
        :row-selection="isSelect ? rowSelection : null"
        rowKey="id"
    >
        <template
            #[item]="scope"
            v-for="item in Object.keys($slots)"
            :key="item"
        >
            <slot
                :name="item"
                :scope="scope"
            ></slot>
        </template>
    </a-table>
</template>
 
<script lang="ts" setup>
import { reactive, useSlots } from 'vue'
import service from '@/utils/request'

const props = defineProps({
    columns: Object,
    isSelect: Boolean,
    list: Object
})

const result = reactive({
    dataSource: []
})

// 插槽的实例
const slots = useSlots()

// 渲染的数据
const renderArr = Object.keys(slots)

console.log(renderArr)

const emits = defineEmits(['batch'])

// 是否多选
const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
        console.log(selectedRowKeys, selectedRows)
        emits('batch', selectedRowKeys)
    },
    getCheckboxProps: (record: any) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name
    })
}

// 递归处理cheildren
const formatResult = (result: any) => {
    return result.map((item: any) => {
        if (item.meta) {
            item.meta = JSON.parse(item.meta)
        }
        if (item.children) {
            if (item.children.length === 0) delete item.children
            else formatResult(item.children)
        }

        return item
    })
}

const loadPage = () => {
    service({
        url: props.list?.url,
        method: props.list?.method
    }).then((res) => {
        result.dataSource = formatResult(res.data)
    })
}
loadPage()
</script>