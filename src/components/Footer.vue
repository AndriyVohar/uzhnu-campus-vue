<script>
export default {
  methods: {
    pushLink(link) {
      this.$router.push(link);
    },
  },
};
</script>

<template>
  <div class="footer">
    <router-link to="/" class="router-link">
      <div
        class="footer-element"
        :class="{ selected: $route.path === '/' }"
      >
        <img src="@/assets/svg/home.svg" alt="" />
        <span>{{ $t("footer.main") }}</span>
      </div>
    </router-link>
    <router-link to="/posts" class="router-link">
      <div
        class="footer-element"
        :class="{ selected: $route.path === '/posts' }"
      >
        <img src="@/assets/svg/browse.svg" alt="" />
        <span>{{ $t("global.advertisement") }}</span>
      </div>
    </router-link>
    <router-link to="/info" class="router-link">
      <div
        class="footer-element"
        :class="{ selected: $route.path === '/info' }"
      >
        <img src="@/assets/svg/info.svg" alt="" />
        <span>{{ $t("footer.information") }}</span>
      </div>
    </router-link>
    <router-link to="/services" class="router-link">
      <div
        class="footer-element"
        :class="{ selected: $route.path === '/services' }"
      >
        <img src="@/assets/svg/service.svg" alt="" />
        <span>{{ $t("global.service") }}</span>
      </div>
    </router-link>
    <router-link to="/me" class="router-link">
      <div
        class="footer-element"
        :class="{ selected: $route.path === '/me' }"
      >
        <img src="@/assets/svg/person.svg" alt="" />
        <span>{{ $t("footer.account") }}</span>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/main_colors";

.selected {
  transition: all ease-out 0.3s;
  background-color: $main-gray !important;

  span {
    font-weight: 700;
  }
}

.footer {
  position: fixed;
  height: 50px;
  overflow: hidden;
  width: 100vw;
  display: flex;
  z-index: 11;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  left: 0;
  bottom: 0;

  .footer-element {
    transition: background-color ease-out 0.3s, font-weight ease-out 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 2px 0px;
    width: 57px;
    border-radius: 5px;

    img {
      height: 24px;
      width: 24px;
    }

    span {
      font-size: 7px;
      font-weight: 500;
    }
  }

  .footer-element:hover {
    cursor: pointer;
  }
}
</style>