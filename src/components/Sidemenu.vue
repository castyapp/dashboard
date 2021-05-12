<template>

  <div class="sidemenu">

    <div class="scrollable-menu">

      <ul class="menu" v-if="loggedIn">

        <li>
          <a :class="{ 'router-link-exact-active': selected === 'theaters' }" @click="openTab('theaters')" v-title="'Theaters'" title-placement="right">
            <i class="icofont-movie"></i>
          </a>
        </li>

        <li>
          <a :class="{ 'router-link-exact-active': selected === 'search' }" @click="openTab('search')" v-title="'Search'" title-placement="right">
            <i class="icofont-search"></i>
          </a>
        </li>

      </ul>

    </div>

  </div>

</template>

<script>

export default {
  data() {
    return {
      selected: 'theaters',
    }
  },
  methods: {

    openTab(tabName) {
      this.selected = tabName
    },

  }
}

</script>

<style>

.bottom-line-sidemenu {
  border-bottom: 2px solid #252626;
  margin: 10px 0;
}

.theater-sidemenu > img {
  width: 40px;
  border-radius: 50%;
  border: 2px solid #202020;
  height: 40px;
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
  width: 100%;
  background: #151515;
  position: absolute;
  left: 0;
  bottom: 0;
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
  cursor: pointer;
}

ul.menu > li > a {
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  padding: 10px;
  margin: 0 0 10px 0;
  background: #343435;
  border-radius: 50%;
  opacity: 0.6;
  padding: 0;
  height: 30px;
  width: 30px;
  text-align: center;
  display: grid;
  align-content: center;
}

ul.menu > li:hover > a {
  opacity: 1;
}

/* ul.menu li > .router-link-exact-active.router-link-active:after {
content: ' ';
width: 0;
height: 0;
border-top: 5px solid transparent;
border-bottom: 5px solid transparent;
border-right: 7px solid #333333;
position: absolute;
right: 0;
margin-top: 16px;
} */

ul.menu > li > a.router-link-exact-active {
  color: #FFFFFF;
  background: #3f51b5;
  opacity: 1;
}

li.custom-btn-menu > a {
  background: #3f51b5;
}

.sidemenu {
  padding: 5px 10px;
  background-size: contain;
  z-index: 1;
  transition: width .25s ease-in-out 0s;
  left: 0;
  position: fixed;
  background: #0b0e11;
  text-align: center;
  -webkit-app-region: drag;
  top: 0;
  bottom: 0;
  margin-top: 48px;
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
  background: #0e1115;
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

img.theater-sidemenu-avatar {
  width: 20px;
  border-radius: 50%;
}

</style>
