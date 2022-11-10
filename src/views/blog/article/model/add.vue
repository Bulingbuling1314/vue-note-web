<template>
    <a-modal
        v-bind="$attrs"
        width="1000px"
        title="ADD MENU"
        @ok="handleOk"
    >
        <a-form
            ref="formRef"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-item
                :label="$t('System.menuManage.id')"
                name="id"
            >
                <a-input v-model:value="form.id" />
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.name')"
                name="name"
            >
                <a-input v-model:value="form.meta.name" />
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.component')"
                name="component"
            >
                <a-input v-model:value="form.component" />
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.type')"
                name="type"
            >
                <a-input v-model:value="form.type" />
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.parentName')"
                name="parentId"
            >
                <a-select
                    v-model:value="form.parentId"
                    placeholder="please select parentName"
                >
                    <a-select-option :value="0">无</a-select-option>
                    <a-select-option
                        v-for="item in menuList"
                        :key="item.id"
                        :value="item.id"
                    >{{ item.meta.name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.icon')"
                name="icon"
            >
                <a-input v-model:value="form.meta.icon" />
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.path')"
                name="path"
            >
                <a-input v-model:value="form.path" />
            </a-form-item>
            <a-form-item
                :label="$t('System.menuManage.role')"
                name="role"
            >
                <a-input v-model:value="form.role" />
            </a-form-item>
            <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
      </a-form-item> -->
        </a-form>
    </a-modal>
</template>
<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue'
import { getMenu } from '@/api/menu'
interface FormState {
    id: number
    name: string
    meta: {
        name: string
        icon: string
    }
    component: string
    parentId: number
    path: string
    role: string
    type: string
}
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
                .catch((error: ValidateErrorEntity<FormState>) => {
                    console.log('error', error)
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

