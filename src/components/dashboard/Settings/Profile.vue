<template>

  <div class="col-md-6 pull-left mb-4">

    <div class="title-border-bottom pb-2">
      <strong class="side-component-title">
        <i class="icofont-user mr-2"></i>
        Profile
      </strong>
      <small class="border-left-title">
        You can edit your user information here.
      </small>
    </div>

    <div class="clearfix"></div>

    <form action="#" class="form-dark mt-4" @submit.prevent="updateProfile">

      <div class="full-width form-group clearfix">

        <div class="profile-avatar pull-left">

          <img class="pull-right clickable"
            ref="user_avatar_img"
            @mouseover="onMouseoverAvatarImg"
            :src="getUserAvatar(user)"
            :alt="user.fullname" />

          <div 
            v-show="overlayShowing"
            @mouseleave="onMouseoverAvatarOverlay"
            class="change_avatar_overlay clickable" 
            style="display: none;" 
            @click="selectNewAvatar">
            <i class="icofont-camera"></i>
          </div>

          <input class="box__file hidden"
                 type="file"
                 ref="user_avatar_input"
                 @change="onChangeAvatar"
                 accept="image/*" />

        </div>

        <div class="profile-details-section pull-left">

          <label for="fullname">Fullname</label>

          <input type="text"
                 class="form-control"
                 id="fullname"
                 name="fullname"
                 placeholder="Enter your fullname here"
                 v-model="form.fullname"
                 autocomplete="off" />

          <small v-if="errors.fullname" class="text-danger text-left">
            <span class="clearfix">
              {{ errors.fullname }}
            </span>
          </small>

        </div>

      </div>

      <div class="form-group">

        <label for="email">Email</label>

        <div class="pull-right">
          <small class="ml-1 text-success" v-show="user.email_verified">
            Verified
            <i class="icofont-check"></i>
          </small>
          <small class="ml-1 text-danger" v-show="!user.email_verified">
            Not verified
            <i class="icofont-warning-alt"></i>
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

        <small v-if="errors.email" class="text-danger text-left">
          <span class="clearfix">
            {{ errors.email }}
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

      <button class="btn btn-primary mt-2" :disabled="!hasChanges">
        Update Profile
      </button>

    </form>

  </div>

</template>

<style scoped>

.change_avatar_overlay > i {
  font-size: 20px;
  color: #eeeeee;
}

.change_avatar_overlay {
  position: absolute;
  background: #0e1115e0;
  width: 75px;
  height: 75px;
  text-align: center;
  padding-top: 30px;
}

.profile-details-section {
  float: left;
}

.profile-avatar > img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}

.profile-avatar {
  display: inline-grid;
  margin-right: 20px;
}

.connection {
  background: #333;
  clear: both;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.connection:last-child {
  margin-bottom: 0px;
}

</style>

<script>

export default {
  name: "SettingsProfile",
  data() {
    return {
      overlayShowing: false,
      hasChanges: false,
      selected_avatar: '',
      errors: {},
      form: {
        fullname: null,
        avatar: null,
      },
    }
  },
  watch: {
    form: {
      deep: true,
      handler(form) {
        if (form.fullname === "" || form.fullname === null){
          this.hasChanges = false;
        } else {
          this.hasChanges = form.fullname !== this.user.fullname
        }
      }
    },
    selected_avatar: {
      handler() {
        this.hasChanges = true
      }
    }
  },
  methods: {
    getUserAvatar() {
      if (this.selected_avatar === ''){
        return this.cdnUrl + '/avatars/' + this.user.avatar + '.png'
      }
      return this.selected_avatar;
    },
    readAvatarFile(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.selected_avatar = e.target.result;
        this.form.avatar     = file;
      };
      reader.readAsDataURL(file);
    },
    onChangeAvatar(e) {
      let files = e.target.files;
      this.readAvatarFile(files[0]);
    },
    selectNewAvatar() {
      this.showingOverlay = false;
      this.$refs.user_avatar_input.click();
    },
    updateProfile() {

      this.$bus.$emit('start-progress-bar');

      this.$store.dispatch("updateProfile", this.form).then(user => {

        this.user = user;
        this.$bus.$emit('updated-user', this.user);

        this.$notify({
          group: 'dashboard',
          type: 'success',
          text: "User updated successfully!",
          title: "Success",
          duration: 2000,
        });

        this.hasChanges = false;
        this.$bus.$emit('stop-progress-bar');

      }).catch(err => {

        this.$notify({
          group: 'dashboard',
          type: 'error',
          text: "Something went wrong, please try again later!",
          title: "Failed",
          duration: 2000,
        });

        this.$bus.$emit('stop-progress-bar');

      });
    },
    onMouseoverAvatarOverlay() {
      this.overlayShowing = false;
    },
    onMouseoverAvatarImg() {
      this.overlayShowing = true;
    }
  },
  mounted() {
    this.form.fullname = this.user.fullname;
  }
}

</script>
