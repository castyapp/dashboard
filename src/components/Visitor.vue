<template>

    <div class="dashboard scrollable">

        <notifications group="dashboard" position="top center" :max="1" />
        <vue-topprogress ref="topProgress" />

        <Sidemenu />

        <div class="main-container">
            <router-view name="theater" />
            <keep-alive>
                <router-view name="dashboard" :key="$route.fullPath" ref="routerView" />
            </keep-alive>
        </div>

    </div>

</template>

<style>

    .invite-ico {
        font-size: 20px;
        color: #007bff;
    }

    .modal-header {
        border-bottom: none !important;
        display: inline-block !important;
    }

</style>

<script>

    import Sidemenu from './models/Sidemenu';
    import "../../assets/css/vue-multiselect.css";

    import VueLoadingButton from 'vue-loading-button'

    export default {
        name: "Visitor",
        components: {
            Sidemenu,
            VueLoadingButton,
        },
    }

</script>