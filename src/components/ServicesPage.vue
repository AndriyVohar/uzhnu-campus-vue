<template>
  <div class="services-page">
    <div class="about-page">
      <h4>{{ $t("services.about.title") }}</h4>
      <p>{{ $t("services.about.text") }}</p>
    </div>
    <div class="form-send-problem space-mono">
      <h4>{{ $t("services.send-problem") }}</h4>
      <div class="selectors">
        <select name="worker" id="" v-model="worker">
          <option value="plumber">{{ $t("global.worker.plumber") }}</option>
          <option value="joiner">{{ $t("global.worker.joiner") }}</option>
          <option value="electrician">
            {{ $t("global.worker.electrician") }}
          </option>
        </select>
        <div class="additional-requst-data">
          <textarea
            name=""
            id=""
            :placeholder="$t('form.textarea.problem-description')"
          ></textarea>
          <button>{{ $t("global.send") }}</button>
        </div>
      </div>
    </div>
    <div class="washing-appointment">
      <span class="top">
        <p @click="changeDay(0)" class="arrows">
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </p>
        <h4 class="space-mono">{{ $t("services.washing-appointment") }}</h4>
        <p @click="changeDay(1)" class="arrows">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </p>
      </span>
      <p style="font-size: 12px; text-align: center" class="space-mono">
        {{ washDay }}
      </p>
      <div
        v-for="index in defaultHours"
        :key="index"
        class="wash-hour space-mono"
        :class="{ 'wash-done': washes[index + 7] }"
        @click="clickHour(index + 7)"
      >
        <div>{{ index + 7 }}:00-{{ index + 8 }}:00</div>
        <div v-if="washes[index + 7]">
          {{ washes[index + 7].creator.room }}.{{
            washes[index + 7].creator.name
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWashings } from "@/DbOperations";
// TODO: BACKEND
//TODO: CRUD for washes
export default {
  data() {
    return {
      worker: "plumber",
      washDay: "",
      dayIndex: 0,
      washes: [],
      defaultHours: 16,
    };
  },
  methods: {
    formatDateForDay(offset = 0, specialDate = false) {
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
      if (specialDate) {
        return `${year}-${month}-${dayOfMonth}`;
      }
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
      getWashings(4, 1, this.formatDateForDay(this.dayIndex, true)).then(
        (washings) => {
          this.washes = [];
          for (let wash of washings) {
            let { hour, ...rest } = wash;
            this.washes[hour] = { ...rest };
          }
        }
      );
      this.washDay = this.formatDateForDay(this.dayIndex);
    },
    clickHour(index) {
      if (this.washes[index]) {
        alert("Вже записалися");
      } else {
        alert("Бажаєте записатися?");
      }
    },
  },

  mounted() {
    this.washDay = this.formatDateForDay();
    getWashings(4, 1, this.formatDateForDay(0, true)).then((washings) => {
      this.washes = [];
      for (let wash of washings) {
        let { hour, ...rest } = wash;
        this.washes[hour] = { ...rest };
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main_colors";

.services-page {
  width: 90vw;
  transition: width ease-out 0.2s, margin ease-out 0.2s;
  margin: auto;
  padding-bottom: 50px !important;
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
    width: calc(100% - 20px);
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
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: width ease-out 0.2s;
    background-color: $main;
    width: calc(100% - 20px);

    h4 {
      width: 100%;
      text-align: start;
    }

    .selectors {
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: space-between;

      select {
        width: 30%;
        height: 25px;
        background-color: $bg-secondary;
        outline: none;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        border-radius: 3px;
        border: none;
        cursor: pointer;
      }

      .additional-requst-data {
        display: flex;
        margin: unset;
        padding: unset;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        width: 70%;

        textarea {
          font-size: 12px;
          resize: none;
          width: 90%;
          min-height: 50px;
          padding: 10px;
          margin: unset;
          border: none;
          border-radius: $mobile-container-border-radius-small;
          background-color: $bg-secondary;
        }

        button {
          background-color: #006d77;
          border: none;
          border-radius: $mobile-container-border-radius-small;
          width: 30%;
          font-size: 14px;
          padding: 3px;
          cursor: pointer;
          transition: all ease-out 0.2s;
          color: white;

          &:hover {
            width: 40%;
            cursor: pointer;
            font-weight: bold;
            transition: all ease-out 0.2s;
          }
        }
      }
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
        cursor: pointer;
        font-size: 20px;
        margin-top: 0;
      }
    }

    .wash-hour {
      margin-top: 10px;
      font-size: 10px;
      border-radius: $mobile-container-border-radius-small;
      width: calc(100% - 20px);
      background-color: white;
      cursor: pointer;
      div {
        margin-top: 0;
        border-radius: $mobile-container-border-radius;
        padding: 0;
        text-align: left;
        width: calc(100% - 20px);
      }
    }
    .wash-done {
      background-color: #006d77;
      color: white;
    }
  }
}

@media (min-width: 1000px) {
  .services-page {
    width: 60vw;
    padding: 0px 20px;
    transition: width ease-out 0.2s, margin ease-out 0.2s;
    margin: auto;

    div {
      width: 100%;
    }

    .form-send-problem {
      width: 100%;
      transition: width ease-out 0.2s;
    }
  }
}
</style>