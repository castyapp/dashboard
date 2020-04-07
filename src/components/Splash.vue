<template>

    <div class="splash">
        <div class="splash-container">
            <div class="splash-logo"></div>
            <RippleLoader :loading="loading" class="splash-loading" :color="'#316bff'" />
        </div>
    </div>

</template>

<style>

    .splash-logo {
        background: url("../assets/icons/brand.svg");
        width: 100px;
        height: 100px;
        background-size: cover;
        margin: 0 auto;
    }

    .splash-container {
        margin: 100px auto;
        width: 200px;
    }

    .splash-loading {
        position: absolute !important;
        top: 130px;
        margin-left: 64px;
    }

</style>

<script>

    import { RippleLoader } from 'vue-spinners-css';

    export default {
        data() {
            return {
                loading: true,
            }
        },
        components: {
            RippleLoader,
        },
    }

</script>