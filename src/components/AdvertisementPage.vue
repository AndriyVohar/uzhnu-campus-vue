<template>
  <div class="page">
    <div class="menu">
      <div class="select-dormitory" v-if="$route.path === '/posts'">
        <select v-model="dormitoryNumber">
          <option value="1">{{ $t("global.dormitory") }} №1</option>
          <option value="2">{{ $t("global.dormitory") }} №2</option>
          <option value="3">{{ $t("global.dormitory") }} №3</option>
          <option value="4">{{ $t("global.dormitory") }} №4</option>
          <option value="5">{{ $t("global.dormitory") }} №5</option>
        </select>
      </div>
      <div v-else></div>
      <div class="toggle">
        <router-link
          to="/posts"
          class="router-link"
          :class="{ toggle_active: $route.path == '/posts' }"
          >{{ $t("global.post") }}
        </router-link>
        <span style="font-weight: 550"> | </span>
        <router-link
          to="/works"
          class="router-link"
          :class="{ toggle_active: $route.path == '/works' }"
          >{{ $t("global.work") }}
        </router-link>
      </div>
    </div>
    <router-view class="router-view-advertisement"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dormitoryNumber: this.$store.state.dormitoryNumber,
    };
  },
  watch: {
    dormitoryNumber(newValue) {
      this.$store.commit("changeDormitoryNumber", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/main_colors.scss";

.page {
  background-color: $main-gray;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 100vw;
  width: 100vw;

  overflow: auto;
  scrollbar-width: none; //Firefox
  -ms-overflow-style: none; //Internet explorer

  .menu {
    width: calc(100vw - 30px);
    height: 25px;
    margin: 15px 15px 0 15px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid black;

    .select-dormitory {
      height: 25px;
      flex-direction: row;
      gap: 30px;
      justify-content: space-between;

      select {
        background-color: white;
        outline: none;
        flex: 1;
        font-size: 11px;
        font-weight: 400;
        height: 25px;
        border-radius: $mobile-container-border-radius-small;
        border: none;
        padding-left: 10px;
      }
    }

    .toggle {
      .router-link {
        text-decoration: none;
        color: black;
      }

      display: flex;
      align-items: center;
      font-size: 14px;
      height: 25px;
      gap: 5px;
    }

    .toggle_active {
      font-size: 16px;
      font-weight: 550;
    }
  }
}
.page::-webkit-scrollbar {
  display: none;
}
</style>