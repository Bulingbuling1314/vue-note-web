<template>
    <Modal v-bind="$attrs" width="1000px" title="ADD MENU" @ok="handleOk">
        <Form ref="formRef" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <FormItem :label="$t('System.menuManage.id')" name="id">
                <Input v-model="form.id" />
            </FormItem>
            <FormItem :label="$t('System.menuManage.name')" name="name">
                <Input v-model="form.meta.name" />
            </FormItem>
            <FormItem :label="$t('System.menuManage.component')" name="component">
                <Input v-model="form.component" />
            </FormItem>
            <FormItem :label="$t('System.menuManage.type')" name="type">
                <Input v-model="form.type" />
            </FormItem>
            <FormItem :label="$t('System.menuManage.parentName')" name="parentId">
                <Select v-model="form.parentId" placeholder="please select parentName">
                    <Select-option :value="0">无</Select-option>
                    <Select-option v-for="item in menuList" :key="item.id" :value="item.id">{{ item.meta.name
                    }}</Select-option>
                </Select>
            </FormItem>
            <FormItem :label="$t('System.menuManage.icon')" name="icon">
                <Input v-model="form.meta.icon" />
            </FormItem>
            <FormItem :label="$t('System.menuManage.path')" name="path">
                <Input v-model="form.path" />
            </FormItem>
            <FormItem :label="$t('System.menuManage.role')" name="role">
                <Input v-model="form.role" />
            </FormItem>
            <FormItem :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">Create</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
            </FormItem>
        </Form>
    </Modal>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { getMenu } from '@/service'
export default defineComponent({
    props: ['form'],
    setup(props, { emit }) {
        const formRef = ref()
        const menuList: Array<any> = reactive([])
        const rules = {
            name: [
                {
                    required: true,
                    message: 'Please input Activity name',
                    trigger: 'blur'
                }
            ],
            region: [
                {
                    required: true,
                    message: 'Please input Activity zone',
                    trigger: 'blur'
                }
            ],
            date1: [
                {
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'change',
                    type: 'object'
                }
            ],
            type: [
                {
                    type: 'array',
                    required: true,
                    message: 'Please input at least one activity type',
                    trigger: 'blur'
                }
            ],
            resource: [
                {
                    required: true,
                    message: 'Please select activity resource',
                    trigger: 'change'
                }
            ],
            desc: [
                {
                    required: true,
                    message: 'Please input activity form',
                    trigger: 'blur'
                }
            ]
        }
        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    console.log('values', props.form, toRaw(props.form))
                })
        }
        const resetForm = () => {
            formRef.value.resetFields()
        }
        getMenu().then((res) => {
            res.data.map((item: any) => {
                menuList.push({ ...item, meta: JSON.parse(item.meta) })
            })
        })

        const handleOk = () => {
            const data = {
                ...props.form,
                name: props.form.path.toLocaleUpperCase(),
                meta: JSON.stringify(props.form.meta)
            }
            emit('save', data)
        }
        return {
            formRef,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            other: '',
            rules,
            onSubmit,
            resetForm,
            handleOk,
            menuList
        }
    }
})
</script>

