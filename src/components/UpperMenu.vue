<template>
  <header>
    <div class="header-content">
      <img src="@/assets/svg/logo_dormitory_text.svg" alt="" />
      <select
        class="language-select"
        v-model="selectedLanguage"
        @change="changeLanguage"
      >
        <option value="ua">🇺🇦</option>
        <option value="en">🇬🇧</option>
      </select>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      value1: "",
      toggle: "advertisement",
      selectedLanguage: localStorage.getItem("selectedLanguage"),
    };
  },
  mounted() {
    (this.$i18n.locale = localStorage.getItem("selectedLanguage")),
      (this.selectedLanguage = localStorage.getItem("selectedLanguage"));
  },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage;
      localStorage.setItem("selectedLanguage", this.selectedLanguage);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main_colors.scss";

body {
  background-color: $bg-secondary;
}
header {
  background-color: $background;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  overflow-x: hidden;
  border-bottom: 1px solid black;

  .header-content {
    height: 50px;
    width: 90vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .language-select {
      background-color: #d3dfe3;
      color: #000000; /* Adjust text color as needed */
      padding: 5px;
      border: 0;
      border-radius: 5px;
      // outline: none;
      cursor: pointer;
      font-size: 24px;
    }
    img {
      height: 35px;
      width: auto;
    }
  }
}
</style>
