<template>
  <div class="dormitory-selector" :class="selector_bg">
    <span>{{ $t("global.select") }}</span>
    <select v-model="selected_dormitory">
      <option value="1">{{ $t("global.dormitory") }} №1</option>
      <option value="2">{{ $t("global.dormitory") }} №2</option>
      <option value="3">{{ $t("global.dormitory") }} №3</option>
      <option value="4">{{ $t("global.dormitory") }} №4</option>
      <option value="5">{{ $t("global.dormitory") }} №5</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected_dormitory: this.$store.state.dormitoryNumber,
    };
  },
  computed: {
    selector_bg() {
      if (this.selected_dormitory == 1) {
        return "dorm-1";
      } else if (this.selected_dormitory == 2) {
        return "dorm-2";
      } else if (this.selected_dormitory == 3) {
        return "dorm-3";
      } else if (this.selected_dormitory == 4) {
        return "dorm-4";
      } else {
        return "dorm-5";
      }
    },
  },
  watch: {
    selected_dormitory(newValue) {
      this.$store.commit("changeDormitoryNumber", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.dorm-1 {
  background: url("../../assets/dormitory_img/dormitory-1.jpg");
}

.dorm-2 {
  background: url("../../assets/dormitory_img/dormitory-2.jpg");
}

.dorm-3 {
  background: url("../../assets/dormitory_img/dormitory-3.jpg");
}

.dorm-4 {
  background: url("../../assets/dormitory_img/dormitory-4.jpg");
}

.dorm-5 {
  background: url("../../assets/dormitory_img/dormitory-5.jpg");
}
.dormitory-selector {
  width: 100%;
  background-size: cover;
  aspect-ratio: 1.3/1;
  border-radius: 15px;
  transition: background ease-out 0.3s;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  span {
    font-weight: 700;
    font-size: 14px;
    margin-top: 15px;
    margin-left: 15px;
    color: #ffffff;
  }

  select {
    height: 20px;
    background: transparent;
    font-weight: 500;
    font-size: 10px;
    outline: none;
    border: none;
    color: #ffffff;
    margin-left: 15px;
    &:hover {
      cursor: pointer;
    }
  }

  option {
    color: #2c3e50;
    font-weight: bold;
  }
}
</style>