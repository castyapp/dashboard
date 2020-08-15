<template>

    <div class="col-md-12">

        <div class="d-inline-block full-width p-3 curved"
             :class="user.two_factor_auth_enabled ? 'bg-success' : 'bg-dark' ">

            <div class="fa-pull-left full-width">

                <div class="clearfix">

                    <div class="fa-pull-left">
                        <i class="fa fa-key text-primary mr-2"></i>
                        <strong class="clearfix">
                            <i class="icofont-ssl-security"></i>
                            Two-factor authentication
                        </strong>
                        <p class="m-2" :class=" user.two_factor_auth_enabled ? 'text-warning' : 'text-default' ">
                            Two-factor authentication adds an additional layer of security to your account <br>
                            by requiring more than just a password to log in.
                        </p>
                    </div>

                    <TwoFactoryAuthButton class="m-2" v-show="!user.two_factor_auth_enabled" />

                    <div class="clearfix"></div>

                    <span class="fa-pull-right m-2" v-show="user.two_factor_auth_enabled">
                        <i class="fa fa-check"></i>
                        You have two-factor authentication enabled!
                    </span>

                </div>

            </div>

        </div>

    </div>

</template>

<style scoped>

    .curved {
        border-radius: 5px;
    }

</style>

<script>

    import TwoFactoryAuthButton from "../../models/2FAEnableButton";

    export default {
        name: "TwoFactorAuthenticationSettings",
        components: {
            TwoFactoryAuthButton,
        },
    }

</script>