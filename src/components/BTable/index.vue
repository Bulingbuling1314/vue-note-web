<template>
    <!-- 表格组件 -->
    <Table :list="list" :data="result.dataSource" :columns="columns" :pagination="false" :row-selection="isSelect">
        <template v-for="item in Object.keys($slots)" #[item]="scope" :key="item">
            <slot :name="item" :scope="scope"></slot>
        </template>
    </Table>
</template>
 
<script lang="ts" setup>
import { reactive, useSlots } from 'vue'
import service from '@/service/request'
import { IColumnItem, IList, } from './interface';

const props = defineProps({
    columns: Array as () => IColumnItem[],
    isSelect: Boolean,
    list: Object as () => IList
})

const result = reactive({
    dataSource: []
})

// 插槽的实例
const slots = useSlots()

// 渲染的数据
const renderArr = Object.keys(slots)

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

// 子组件必须暴露该方法 父组件才能调用
defineExpose({ loadPage })
</script>