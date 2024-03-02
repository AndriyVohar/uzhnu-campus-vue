<template>
  <div>
    <custom-confirm :title="confirm_obj.title" :description="confirm_obj.description" :type="confirm_obj.type" v-if="show_confirm"/>
    <Header/>
    <RouterView class="router-view-main"></RouterView>
    <Footer/>
  </div>
</template>

<script>
// import Token from "@/token-usage.js";
import Header from "./components/UpperMenu.vue";
import Footer from "@/components/Footer.vue";
import Token from "@/token-usage.js";

import {mapGetters, mapActions} from "vuex";
import CustomConfirm from "@/components/customConfirm.vue";

export default {
  name: "App",
  data() {
    return {
      show_confirm: false,
      confirm_obj: {
        title: '',
        description: '',
        type: 'success'
      }
    };
  },
  components: {
    CustomConfirm,
    Footer,
    Header,
  },
  computed: {
    ...mapGetters("user", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(['loadUser'])
  },
  mounted() {
    window.showCustomConfirm = (title, description, type) => {
      this.confirm_obj.title = title;
      this.confirm_obj.description = description;
      this.confirm_obj.type = type;
      this.show_confirm = true
    }
    window.hideCustomConfirm = () => {
      this.confirm_obj.title = '';
      this.confirm_obj.description = '';
      this.confirm_obj.type = 'success';
      this.show_confirm = false
    }
    window.stopScroll = (value) => {
      let val = "";
      if (!value) {
        val = "auto";
      } else {
        val = "hidden";
      }
      document.body.style.overflowY = val;
    };
    if (!localStorage.getItem("defaultDormitory")) {
      localStorage.setItem("defaultDormitory", 4);
    }
    if (!localStorage.getItem("selectedLanguage")) {
      localStorage.setItem("selectedLanguage", "ua");
    }
    this.loadUser(Token.getGoogleIdFromCookie())
  },
};
</script>

<style lang="scss">
@import "assets/main_colors";

.space-mono {
  font-family: "Space Mono", monospace;
  font-style: normal;
}

.router-view-main {
  min-height: calc(100vh - 100px);
  max-width: 100vw;
  overflow-x: hidden;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.stop-scroll {
  overflow-y: hidden !important;
}

body {
  overflow-x: hidden;
}

.temporary {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $border-default;
  background-color: $main-gray;
}

button,
textarea,
select {
  font-family: "Montserrat", sans-serif;
}

input::placeholder,
input {
  font-family: "Montserrat", sans-serif;
}

* {
  margin: 0;
  padding: 0;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    transition: background-color ease-out 0.3s;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    transition: background-color ease-out 0.3s;
  }
}

.spacer {
  margin-top: 5px;
  height: 1px;
  width: 100%;
  border-radius: 5px;
  background-color: $main;
}

body {
  max-width: 100vw;
  width: 100vw;
  overflow-x: hidden !important;
  background-color: $background;
}

html {
  position: relative;
  min-height: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.router-link {
  text-decoration: none;
  color: black;
}
</style>
