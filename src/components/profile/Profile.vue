<template>
    <div class="profile" v-if="user">
        <div class="image">
            <img :src="`${apiUrl}/users/${user.id}/avatar`" alt="">
            <router-link :to="{name: 'profileImage'}" class="edit-avatar"><i class="fas fa-pen"></i></router-link>
        </div>
        <div class="name">
            <h4>Name</h4>
            <span>{{user.firstName}} {{user.lastName}} </span>
            <a href=""> Edit</a>
        </div>
        <div class="email">
            <h4>Email address</h4>
            <span>{{user.email}} </span>
            <a href=""> Edit</a>
        </div>
        <div class="mobile">
            <h4>Mobile</h4>
            <span>{{user.mobile}} </span>
            <a href=""> Edit</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    computed: {
        user() {
            return this.$store.state.profile
        },
        apiUrl() {
            return process.env.VUE_APP_API_URL
        }
    }
}
</script>

<style lang="scss" scoped>
.image {
    width: 160px;
    height: 160px;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .edit-avatar {
        position: absolute;
        bottom: 6px;
        right: 6px;
        z-index: 2;
        color: #eee;
        background: $primaryColor;
        border-radius: 100%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.1s linear;
        &:hover {
            text-decoration: none;
            background: $darkerPrimary;
        }
    }
}
</style>