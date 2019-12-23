<template>
    <div class="modal" v-if="open" @click="$emit('close')">
        <div class="content" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(245,245,245, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        .content {
            border-radius: 10px;
            min-width: 200px;
            max-width: 600px;
            width: 100%;
            background-color: white;
            border: #c0c0c0 1px solid;
            box-shadow: 0 0 10px 0 rgba(0,0,0, 0.2);
            padding: 20px;
        }
    }
</style>