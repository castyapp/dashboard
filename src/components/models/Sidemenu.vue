<template>

    <div>

        <div class="sidemenu">

            <div class="logo" @click="redirect('dashboard')">
                <img src="../../assets/icons/brand.svg" alt="Brand" />
            </div>

            <ul class="menu">
                <li>
                    <router-link :to="{ name: 'library' }" v-title="'Library'" title-placement="right">
                        <i class="icofont-library"></i>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'settings' }" v-title="'Settings'" title-placement="right">
                        <i class="icofont-gears"></i>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'create_theater' }" v-title="'Create a new theater'" title-placement="right">
                        <i class="icofont-plus"></i>
                    </router-link>
                </li>
            </ul>

            <div class="footer">
                <a class="user-avatar-button" @click.prevent.stop="actionsBtn($event)">
                    <div class="online">
                        <img :src="apiBaseUrl + '/uploads/avatars/' + user.avatar + '.png'"
                             class="avatar"
                             :alt="user.fullname" />
                        <i class="sidemenu-state state-dot"></i>
                    </div>
                </a>
            </div>

        </div>

    </div>

</template>

<script>

    export default {
        methods: {
            actionsBtn($event) {
                this.$parent.$refs.menu.open($event, 'usermenu-actions', {})
            },
            redirect(name) {
                this.$router.push({ name });
            }
        },
    }

</script>

<style>

    .logo {
        cursor: pointer;
    }

    .logo > img {
        width: 40px;
        height: 40px;
        background: #316bff;
        border-radius: 50%;
        padding: 5px;
    }

    li.custom-btn-menu > a {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #FFFFFF !important;
        background: #316bff !important;
        border: 0;
        cursor: pointer;
    }

    li.custom-btn-menu > a > i {
        font-size: 20px;
        margin: 0 auto;
    }

    .footer {
        bottom: 0;
        position: absolute;
        width: 100%;
        left: 0;
    }

    img.avatar {
        width: 40px;
        border: 0;
        margin: 10px auto;
    }

    ul.menu {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul.menu > li:first-child {
        margin: 5px 0;
    }

    ul.menu > li {
        height: 40px;
        width: 40px;
        cursor: pointer;
        margin: 15px 0;
    }

    ul.menu > li > a {
        font-size: 20px;
        color: #ffffff;
        text-decoration: none;
        cursor: pointer;
        display: -webkit-inline-box;
        display: inline-flex;
        padding: 10px;
        margin: 10px 3px;
        background: #343435;
        border-radius: 50%;
        opacity: 0.6;
    }

    ul.menu > li:hover > a {
        opacity: 1;
    }

    ul.menu > li > a.router-link-exact-active {
        color: #FFFFFF;
        background: #316cff;
        opacity: 1;
    }

    li.custom-btn-menu > a {
        background: #316cff;
    }

    .sidemenu {
        padding: 10px;
        background-size: contain;
        z-index: 1;
        width: 65px;
        transition: width .25s ease-in-out 0s;
        left: 0;
        position: fixed;
        background: #181818;
        text-align: center;
        -webkit-app-region: drag;
        top: 0;
        bottom: 0;
    }

    .user-avatar-button {
        cursor: pointer;
    }

    .user-avatar-button:hover > .user-menu-hover {
        display: block;
    }

    .user-menu-hover {
        display: none;
        position: absolute;
        left: 65px;
        bottom: 10px;
        list-style: none;
        padding: 0;
        margin: 0;
        width: 150px;
    }

    .user-menu-hover > li {
        padding: 0;
        text-align: left;
        margin: 5px 0;
    }

    .user-menu-hover > li > a, .user-menu-hover > li > button {
        text-decoration: none;
        background: #181818;
        padding: 5px 10px;
        text-align: left;
        color: #eeeeee;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
        border: none;
    }

    .user-menu-hover > li > a:hover, .user-menu-hover > li > button:hover {
        background: #333333;
    }

</style>