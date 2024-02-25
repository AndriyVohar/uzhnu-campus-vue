<template>
  <div class="services-page">
    <div class="about-page">
      <h4>{{ $t("services.about.title") }}</h4>
      <p>{{ $t("services.about.text") }}</p>
    </div>
    <div class="form-send-problem">
      <h4>{{ $t("services.send-problem") }}</h4>
      <select name="worker" id="" v-model="worker">
        <option value="plumber">{{ $t("global.worker.plumber") }}</option>
        <option value="joiner">{{ $t("global.worker.joiner") }}</option>
        <option value="electrician">
          {{ $t("global.worker.electrician") }}
        </option>
      </select>
      <textarea
          name=""
          id=""
          :placeholder="$t('form.textarea.problem-description')"
      ></textarea>
      <button>{{ $t("global.send") }}</button>
    </div>
    <div class="washing-appointment">
      <span class="top">
        <h4>{{ $t("services.washing-appointment") }}</h4>
        <span class="arrows">
          <p @click="changeDay(0)">&lt;</p>
          <p @click="changeDay(1)">&gt;</p>
        </span>
      </span>
      <p style="font-size: 12px; text-align: center">
        {{ washDay }}
      </p>
      <div v-for="index in 16" :key="index" class="wash-hour">
        {{ index + 7 }}:00-{{ index + 8 }}:00
      </div>
    </div>
  </div>
</template>

<script>
// TODO: BACKEND
export default {
  data() {
    return {
      worker: "plumber",
      washDay: "",
      dayIndex: 0,
    };
  },
  methods: {
    formatDateForDay(offset = 0) {
      const daysOfWeek = [
        "Неділя",
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятниця",
        "Субота",
      ];
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + offset);

      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      return `${dayOfWeek} ${dayOfMonth}.${month}.${year}`;
    },
    changeDay(num) {
      if (num == 0) {
        if (this.dayIndex > 0) {
          this.dayIndex--;
        }
      } else {
        this.dayIndex++;
      }
      this.washDay = this.formatDateForDay(this.dayIndex);
    }
  },
  mounted() {
    this.washDay = this.formatDateForDay();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main_colors";

.services-page {
  width: 90vw;
  padding: 0 5vw;
  padding-bottom: 50px;
  margin-bottom: 15px !important;
  background-color: #d3dfe3;
  min-height: calc(100vh - 67px);
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    margin-top: 15px;
    border-radius: $mobile-container-border-radius;
    padding: 10px;
    text-align: left;
    width: calc(100vw - 50px);
  }

  h4 {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .about-page {
    background-color: #f6eae6;

    p {
      font-size: 10px;
    }
  }

  .form-send-problem {
    background-color: $main;

    select {
      height: 25px;
      background-color: $bg-secondary;
      outline: none;
      font-size: 12px;
      font-weight: 400;
      justify-content: center;
      border-radius: 3px;
      border: none;
      width: 100%;
      cursor: pointer;
    }

    textarea {
      margin-top: 10px;
      width: calc(100% - 20px);
      font-size: 12px;
      resize: none;
      padding: 10px;
      min-height: 50px;
      border: none;
      border-radius: $mobile-container-border-radius-small;
      background-color: $bg-secondary;
    }

    button {
      margin-top: 10px;
      background-color: #006d77;
      border: none;
      border-radius: $mobile-container-border-radius-small;
      width: 100%;
      font-size: 14px;
      padding: 3px;
      cursor: pointer;
      color: white;
    }
  }

  .washing-appointment {
    background-color: $background;

    .top {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;

      .arrows {
        p {
          cursor: pointer;
        }

        font-size: 20px;
        margin-top: 0;
        display: flex;
        gap: 20px;
      }
    }

    .wash-hour {
      margin-top: 10px;
      font-size: 10px;
      border-radius: $mobile-container-border-radius-small;
      width: calc(100% - 20px);
      background-color: white;
    }
  }
}

@media (min-width: 1000px) {
  .services-page {
    width: 60vw;
    transition: width ease-out .2s;
    margin: auto;

    div {
      width: 100%;
    }
  }
}
</style>