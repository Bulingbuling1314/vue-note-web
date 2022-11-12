<template>
    <a-modal
        v-bind="$attrs"
        width="1200px"
        title="ADD ARTICLE"
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
                :label="$t('Article.list.title')"
                name="title"
            >
                <a-input v-model:value="form.title" />
            </a-form-item>
            <a-form-item
                :label="$t('Article.list.intro')"
                name="intro"
            >
                <a-input v-model:value="form.intro" />
            </a-form-item>
            <a-form-item
                :label="$t('Article.list.blogContent')"
                name="blogContent"
            >
                <v-md-editor
                    v-model="form.blogContent"
                    height="500px"
                ></v-md-editor>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { defineComponent, reactive, ref, toRaw } from 'vue'
interface FormState {
    title: string
    intro: string
    blogContent: string
}

export default defineComponent({
    props: ['form'],
    setup(props, { emit }) {
        const formRef = ref()
        const menuList: Array<any> = reactive([])

        const rules = {
            title: [
                {
                    required: true,
                    message: 'Please input Activity name',
                    trigger: 'blur'
                }
            ],
            intro: [
                {
                    required: true,
                    message: 'Please input Activity zone',
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

        const handleOk = () => {
            const data = {
                ...props.form
            }
            console.log(data)
            emit('save', data)
        }
        return {
            formRef,
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
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

