<template>

    <div class="row p-2">

        <div class="col-md-6 fa-pull-left mb-4">

            <div class="title-border-bottom pb-2">
                <strong class="side-component-title">
                    <i class="icofont-user text-primary mr-2"></i>
                    Profile
                </strong>
                <small class="border-left-title">
                    You can edit your user information here.
                </small>
            </div>

            <div class="clearfix"></div>

            <form action="#" class="form-dark mt-4" @submit.prevent="updateProfile">

                <div class="full-width form-group clearfix">

                    <div class="pull-left" style="width: 75%;">

                        <label for="fullname">Fullname</label>

                        <input type="text"
                               class="form-control"
                               id="fullname"
                               name="fullname"
                               placeholder="Enter your fullname here"
                               v-model="user.fullname"
                               autocomplete="off" />

                        <small v-if="errors.user.fullname" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.user.fullname }}
                            </span>
                        </small>

                    </div>

                    <div class="profile-avatar pull-right" style="width: 20%;">
                        <img class="pull-right" :src="apiBaseUrl + '/uploads/avatars/' + user.avatar + '.png'"
                             :alt="user.fullname">
                    </div>

                </div>

                <div class="form-group">

                    <label for="email">Email</label>

                    <div class="pull-right">
                        <small class="ml-1 text-success" v-show="user.verified_by_email">
                            Verified
                            <i class="fa fa-check"></i>
                        </small>

                        <small class="ml-1 text-danger" v-show="!user.verified_by_email">
                            Not verified
                            <i class="fa fa-times"></i>
                            <a href="" class="ml-2">
                                Resend verification link
                            </a>
                        </small>
                    </div>

                    <input type="text"
                           class="form-control"
                           id="email"
                           name="email"
                           placeholder="Enter your email here"
                           v-model="user.email"
                           autocomplete="off" />

                    <small v-if="errors.user.email" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.user.email }}
                            </span>
                    </small>

                    <div class="clearfix"></div>

                </div>

                <div class="form-group">

                    <label for="username">Username</label>

                    <input type="text"
                           class="form-control form-control-disabled"
                           id="username"
                           placeholder="Enter your username here"
                           v-model="user.username"
                           autocomplete="off"
                           disabled="disabled" />

                </div>

                <button class="btn btn-primary">
                    Edit Profile
                </button>

            </form>

        </div>

        <div class="col-md-6 fa-pull-left mb-4">

            <div class="title-border-bottom pb-2">
                <strong class="side-component-title">
                    <i class="icofont-lock text-primary mr-2"></i>
                    Security
                </strong>
                <small class="border-left-title">
                    You can edit your security information here.
                </small>
            </div>

            <form action="#" class="form-dark mt-4"
                  @submit.prevent="updatePassword">

                <div class="form-group">

                    <label for="current_password">Current Password</label>

                    <input type="password"
                           class="form-control"
                           id="current_password"
                           name="current_password"
                           placeholder="Enter your current password here"
                           v-model="current_password"
                           autocomplete="off"
                           required="required" />

                    <small v-if="errors.password.current_password" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.password.current_password }}
                            </span>
                    </small>

                </div>

                <div class="form-group accessory_name_container">

                    <label for="new_password">New Password</label>

                    <input type="password"
                           class="form-control"
                           id="new_password"
                           name="new_password"
                           placeholder="Enter your new password here"
                           v-model="new_password"
                           autocomplete="off"
                           required="required" />

                    <small v-if="errors.password.new_password" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.password.new_password }}
                            </span>
                    </small>

                </div>

                <div class="form-group accessory_name_container">

                    <label for="verify_new_password">Verify New Password</label>

                    <input type="password"
                           class="form-control"
                           id="verify_new_password"
                           name="verify_new_password"
                           placeholder="Enter your new password here again"
                           v-model="verify_new_password"
                           autocomplete="off"
                           required="required" />

                    <small v-if="errors.password.verify_new_password" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.password.verify_new_password }}
                            </span>
                    </small>

                </div>

                <button class="btn btn-primary">
                    Change password
                </button>

            </form>

        </div>

        <!--<div class="clearfix"></div>-->

        <!--<div class="col-md-12">-->

            <!--<div class="d-inline-block full-width p-3" :class=" user.two_factor_auth_enabled ? 'bg-success' : 'bg-dark' ">-->

                <!--<div class="fa-pull-left full-width">-->

                    <!--<div class="clearfix">-->

                        <!--<div class="fa-pull-left">-->
                            <!--<i class="fa fa-key text-primary mr-2"></i>-->
                            <!--<strong class="clearfix">Two-factor authentication</strong>-->
                            <!--<strong class="text-warning">-->
                                <!--Two-factor authentication adds an additional layer of security to your account <br>-->
                                <!--by requiring more than just a password to log in.-->
                            <!--</strong>-->

                        <!--</div>-->

                        <!--<TwoFactoryAuthButton v-show="!user.two_factor_auth_enabled" />-->

                        <!--<div class="clearfix"></div>-->

                        <!--<span class="fa-pull-right" v-show="user.two_factor_auth_enabled">-->
                            <!--<i class="fa fa-check"></i>-->
                            <!--You have two-factor authentication enabled!-->
                        <!--</span>-->

                    <!--</div>-->

                <!--</div>-->

            <!--</div>-->

        <!--</div>-->

    </div>

</template>

<style>

    .profile-avatar > img {
        width: 75px;
        border-radius: 50%;
    }

    form.form-dark > .form-group > input.form-control-disabled {
        background: #1b1b1b !important;
    }

</style>

<script>

    import TwoFactoryAuthButton from "../models/2FAEnableButton";

    export default {
        components: {
            TwoFactoryAuthButton,
        },
        data() {
            return {
                current_password: '',
                new_password: '',
                verify_new_password: '',
                errors: {
                    user: {},
                    password: {},
                },
            }
        },
        methods: {
            updatePassword() {

            },
            updateProfile() {

            }
        },
    }

</script>