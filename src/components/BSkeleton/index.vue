<template>
    <Skeleton v-bind="$attrs" animated class="b-skeleton">
        <template #template>
            <Row>
                <Col flex="1">
                <Row>
                    <Col flex="0">
                    <SkeletonItem type="circle" class="ivu-mr" />
                    </Col>
                    <Col flex="1">
                    <SkeletonItem block width="20%" height="16px" />
                    <SkeletonItem block width="50%" height="16px" />
                    </Col>
                </Row>
                <SkeletonItem block width="80%" height="16px" />
                <SkeletonItem width="8%" height="16px" class="ivu-mr" />
                <SkeletonItem width="8%" height="16px" class="ivu-mr" />
                <SkeletonItem width="8%" height="16px" />
                </Col>
                <Col flex="0">
                <SkeletonItem width="280px" height="140px" />
                </Col>
            </Row>
        </template>
        <template #default>
            <slot></slot>
        </template>
    </Skeleton>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.b-skeleton {
    width: 100%;
    height: 100%;
}
</style>