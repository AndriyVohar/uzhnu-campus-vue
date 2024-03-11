<template>
  <div class="info-page">
    <div class="about-page">
      <h4>{{ $t("info.about.title") }}</h4>
      <p>{{ $t("info.about.text") }}</p>
    </div>
    <selector-component class="selector"></selector-component>
    <div class="alert-holder">
      <info-component
          :attention="attention"
          v-for="attention in attentionList"
          :key="attention"
          class="info-comp"
      ></info-component>
    </div>
    <div class="posts-spacer"></div>
    <div class="data" v-for="worker in studmistechkoWorkers" :key="worker.id">
      <h4>{{ $t(worker.position) }}</h4>
      <p>{{ $t(worker.fullName) }}</p>
      <p>{{ worker.phone }}</p>
    </div>
    <div class="data" v-for="worker in dormitory_data" :key="worker.id">
      <h4>{{ $t(worker.position) }}</h4>
      <p>{{ $t(worker.fullName) }}</p>
      <p>{{ worker.phone }}</p>
    </div>
  </div>
</template>

<script>
import SelectorComponent from "@/components/Sections/SelectorComponent.vue";
import data from "../../dormitory_data.json";
import InfoComponent from "./InfoComponent.vue";
import {loadItemsListByDormitory} from "@/DbOperations";

export default {
  name: "Info",
  components: {
    InfoComponent,
    SelectorComponent,
  },
  methods: {
    loadItems() {
      loadItemsListByDormitory("infos", this.dormitoryNumber)
          .then((list) => {
            this.attentionList = list;
          })
          .catch(() => {
            console.log("some error");
          });
    },
    dormitoryWorkersFromJSON() {
      let dorm = data.filter(
          (dorm) => parseInt(this.dormitoryNumber) === dorm.dormitory_num
      )[0];
      return dorm.workers;
    },
  },
  mounted() {
    this.loadItems();
    this.dormitory_data = this.dormitoryWorkersFromJSON();
  },
  computed: {
    dormitoryNumber() {
      return this.$store.state.dormitoryNumber;
    },
  },
  data() {
    return {
      dormitory_data: [],
      attentionList: [],
      studmistechkoWorkers: data.filter(
          (stud) => stud.dormitory_num === "studmistechko"
      )[0].workers,
    };
  },
  watch: {
    dormitoryNumber() {
      this.loadItems();
      this.dormitory_data = this.dormitoryWorkersFromJSON();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/main_colors";

.info-comp {
  width: calc(100% - 20px);
  transition: width ease-out .2s;
}

.selector {
  margin-top: 15px;
}

.alert-holder {
  margin-top: 15px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.posts-spacer {
  width: calc(100% - 20px);
  transition: width ease-out .2s;
  height: 1px;
  margin: 15px 0;
  padding: 0 10px;
  background-color: #006d77;
}

.data {
  margin-bottom: 15px;
  text-align: left;
  transition: width ease-out .2s;
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: $mobile-container-border-radius;
  background-color: #f6eae6;

  h4 {
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
  }

  p {
    font-size: 10px;
  }
}

.info-page {
  width: 90vw;
  transition: width ease-out .2s;
  padding: 0 20px;
  margin: auto;
  padding-bottom: 30px !important;
  margin-bottom: 15px !important;
  background-color: #d3dfe3;
  min-height: calc(100vh - 67px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .about-page {
    margin-top: 15px;
    border-radius: 10px;
    background-color: #f6eae6;
    padding: 10px;
    text-align: left;
    transition: width ease-out .2s;
    width: calc(100% - 20px);

    h4 {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    p {
      font-size: 10px;
    }
  }
}

@media (min-width: 1000px) {
  .info-comp {
    width: 100%;
    transition: width ease-out .2s;
  }
  .posts-spacer {
    width: 100%;
    transition: width ease-out .2s;
  }
  .selector {
    width: 100%;
    padding: 0 10px;
  }
  .data {
    width: 100%;
  }
  .info-page {
    width: 60vw;
    transition: width ease-out .2s;
    margin: auto;

    .about-page {
      transition: width ease-out .2s;
      width: 100%;
    }
  }
}
@media (min-width: 800px) and (max-width: 1000px){
  .info-comp {
    width: 100%;
    transition: width ease-out .2s;
  }
  .posts-spacer {
    width: 100%;
    transition: width ease-out .2s;
  }
  .selector {
    width: 100%;
    padding: 0 10px;
  }
  .data {
    width: 100%;
  }
  .info-page {
    width: 80vw;
    transition: width ease-out .2s;
    margin: auto;

    .about-page {
      transition: width ease-out .2s;
      width: 100%;
    }
  }
}

</style>