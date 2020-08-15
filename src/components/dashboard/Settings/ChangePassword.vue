<template>

    <div class="col-md-6 pull-left mb-4">

        <div class="title-border-bottom pb-2">
            <strong class="side-component-title">
                <i class="icofont-lock mr-2"></i>
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
                       v-model="form.current_password"
                       autocomplete="off"
                       required="required" />

                <small v-if="errors.current_password" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.current_password }}
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
                       v-model="form.new_password"
                       autocomplete="off"
                       required="required" />

                <small v-if="errors.new_password" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.new_password }}
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
                       v-model="form.verify_new_password"
                       autocomplete="off"
                       required="required" />

                <small v-if="errors.verify_new_password" class="text-danger text-left">
                            <span class="clearfix">
                                {{ errors.verify_new_password }}
                            </span>
                </small>

            </div>

            <button class="btn btn-primary mt-2" :disabled="!hasChanges">
                Change password
            </button>

        </form>

    </div>

</template>

<script>

    export default {
        name: "ChangePasswordSettings",
        data() {
            return {
                hasChanges: false,
                form: {
                    current_password: '',
                    new_password: '',
                    verify_new_password: '',
                },
                errors: {}
            }
        },
        watch: {
            form: {
                deep: true,
                handler(form) {
                    if (form.password !== null && form.password !== ''){
                        if ((form.new_password !== null && form.new_password !== '') && (form.verify_new_password !== null && form.verify_new_password !== '')) {
                            this.hasChanges = form.new_password === form.verify_new_password
                        }
                    }
                }
            }
        },
        methods: {
            updatePassword(){

                this.$bus.$emit('start-progress-bar');

                this.$store.dispatch("updatePassword", this.form).then(() => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'success',
                        text: "Password updated successfully!",
                        title: "Success",
                        duration: 2000,
                    });

                    this.hasChanges = false;
                    this.$bus.$emit('stop-progress-bar');

                }).catch(err => {

                    this.$notify({
                        group: 'dashboard',
                        type: 'error',
                        text: "Invalid Credentials!",
                        title: "Failed",
                        duration: 2000,
                    });

                    this.$bus.$emit('stop-progress-bar');

                });
            }
        },
    }

</script>