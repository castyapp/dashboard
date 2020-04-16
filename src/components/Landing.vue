<template>

    <div class="landing">

        <div class="topnav">
            
            <div class="authentication-section pull-right">
                <router-link v-if="loggedIN" :to="{ name: 'library' }" class="btn btn-primary user-landing-btn">
                    {{ user.fullname }}
                    <img :src="apiBaseUrl + '/uploads/avatars/' + user.avatar + '.png'"
                        :alt="user.username" />
                </router-link>
                <router-link v-if="loggedIN" :to="{ name: 'logout' }" class="m-3 text-white">
                    Logout
                </router-link>
                <router-link v-else :to="{ name: 'login' }" class="btn btn-primary">
                    Login
                    <i class="icofont-arrow-right"></i>
                </router-link>
            </div>

            <div class="brand pull-left">
                <div class="logo">
                    <img src="../assets/icons/brand.svg" alt="Brand" />
                    <strong class="brand-name">Casty</strong>
                </div>
            </div>

        </div>

        <div class="about">
            <h1>Watch your movies along with your friends!</h1>
        </div>

    </div>

</template>

<style>

    .user-landing-btn > img {
        width: 20px;
        background: #FFFFFF;
        border-radius: 50%;
        float: right;
        margin: 2px 0 0 10px;
    }

    .landing {
        padding: 50px 100px !important;
    }

    .topnav {
        display: inline-block;
        width: 100%;
    }

    .brand-name {
        margin: 6px 10px;
        float: right;
    }

    .about {
        font-size: 30px;
        margin: 50px;;
    }
    
</style>

<script>

    export default {
        name: 'landing',
        mounted() {
            console.log(this.loggedIN);
            console.log(this.user);
        }
    }

</script>