<template>
  <div>
    <button class="btn btn-success fa-pull-right" @click="enable">
      Enable
    </button>

    <div class="modal modal-dark fade" id="2fa_modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body pb-0 text-left">

            <div id="step-1">

              <h5>1. Recovery code</h5>
              <span>
                Recovery code is used to access your account in the event you cannot
                receive two-factor authentication codes.
              </span>

              <div class="text-warning mt-3">
                Print, or copy your recovery code before continuing
                two-factor authentication.
              </div>

              <div class="recovery_codes">
                <strong class="font-italic">
                  {{ recovery_code }}
                </strong>
              </div>

            </div>

            <div id="step-2" style="display: none;">
              <h5>2. Scan this barcode with your app.</h5>
              <span class="clearfix">
                Scan the image above with the two-factor authentication app on your phone.
              </span>
              <canvas id="qrCode"></canvas>
              <strong>
                Enter the six-digit code from the application
              </strong>
              <form class="form-dark">
                <div class="form-group accessory_name_container">

                  <label for="two-factor-code">
                    After scanning the barcode image, the app will display a six-digit code that you can enter below.
                  </label>

                  <input type="text"
                         class="form-control"
                         id="two-factor-code"
                         name="two-factor-code"
                         placeholder="123456"
                         v-model="two_factor_code"
                         autocomplete="off"
                         autofocus="autofocus" />
                </div>
              </form>
            </div>

            <div class="clearfix"></div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">
              Cancel
            </button>
            <button type="button" style="display: none;" id="backBtn" class="btn btn-outline-warning" @click="openStep1">
              Back
            </button>
            <button type="button" id="nextBtn" class="btn btn-outline-success" @click="openStep2">
              Next
            </button>
            <button type="button" style="display: none;" id="submit-btn" class="btn btn-primary" @click="submit">
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style>
.recovery_codes {
  text-align: center;
  padding: 20px;
  background: #060606;
  border-radius: 3px;
  margin: 10px 0;
  font-size: 20px;
}
</style>

<script>

import QRCode from "qrcode";

export default {
  data() {
    return {
      recovery_code: null,
      two_factor_code: null,
    }
  },
  mounted() {
    this.generate2FA();
  },
  methods: {
    enable() {
      $("#2fa_modal").modal();
      this.openStep1();
    },
    openStep1() {
      $("#step-2").hide();
      $("#step-1").show();
      $("#backBtn").hide();
      $("#submit-btn").hide();
      $("#nextBtn").show();
      this.generate2FA();
    },
    openStep2() {
      $("#step-1").hide();
      $("#step-2").show();
      $("#backBtn").show();
      $("#nextBtn").hide();
      $("#submit-btn").show();
    },
    generate2FA() {
      if (this.recovery_code === null && !this.$store.state.user.two_factor_auth_enabled){
        // this.$store.dispatch("checkAndGenerate2FARecoveryCode").then(response => {
        //     this.recovery_code = response.data.result.recovery_code;
        //     let authURL = response.data.result["auth_url"];
        //     let canvas = document.getElementById('qrCode');
        //     QRCode.toCanvas(canvas, authURL, { errorCorrectionLevel: 'H' }, error => {
        //         if (error) console.error(error);
        //     });
        // })
      }
    },
    submit() {
      // this.$store.dispatch("enable2FA", {
      //     code: this.two_factor_code,
      // }).then(response => {
      //
      //     this.$notify({
      //         group: 'dashboard',
      //         type: 'success',
      //         text: response.data.message,
      //         title: "Success",
      //         duration: 2000,
      //     });
      //     $("#2fa_modal").modal('hide');
      //
      //     this.recovery_code = null;
      //     this.two_factor_code = null;
      //
      //     this.$store.dispatch("getUser").then(response => {
      //         this.$store.state.user = response.data.result;
      //         localStorage.setItem("user", JSON.stringify(response.data.result))
      //     })
      //
      // }).catch(err => {
      //
      //     this.$notify({
      //         group: 'dashboard',
      //         type: 'error',
      //         text: err.response.data.message,
      //         title: "Failed",
      //         duration: 2000,
      //     });
      //
      //     this.two_factor_code = null;
      // })
    }
  }
}
</script>
