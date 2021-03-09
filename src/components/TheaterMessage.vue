<template>

  <div class="theater-invite-message" v-if="ready">
    <img :src="cdnUrl + '/posters/' + theater.movie.poster + '.png'"
                                      alt="Theater" />
    <div class="theater">
      <div class="th-details pull-left">
        <strong class="clearfix">{{ theater.title }}</strong>
        <small>Duration: 48:33</small>
      </div>
      <button class="btn btn-primary pull-right ml-3" @click="goToTheater">
        Join Theater
      </button>
    </div>
  </div>

</template>

<style scoped>

.theater-invite-message {
  background: #333334;
  padding: 0 !important;
  margin: 10px 0;
  border-radius: 3px;
  display: inline-flex;
}

.theater-invite-message > .theater {
  padding: 5px 10px;
  width: 100%;
}

.theater > button {
  margin-top: 5px;
}

.theater-invite-message > img {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  width: 150px;
  height: 58px;
  object-fit: cover;
  float: left;
}

</style>

<script>

export default {
  props: ['theater_id'],
  data() {
    return {
      theater: {},
      ready: false,
    }
  },
  mounted() {
    this.getTheater(this.theater_id);
  },
  methods: {
    async getTheater(theater_id) {
      await this.$store.dispatch("getTheater", theater_id).then(theater => {
        this.theater = theater;
        this.ready = true;
      });
    },
    goToTheater() {
      this.$router.push({
        name: "theater",
        params: {
          theater_id: this.theater.hash
        }
      });
    }
  },
};

</script>
