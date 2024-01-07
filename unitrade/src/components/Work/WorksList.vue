<template>
  <div class="container">
    <div class="works-spacer"></div>
    <div class="works_list" v-if="worksList && worksList.length > 0">
      <work-component :work="work" v-for="work in worksList" :key="work" />
    </div>
    <div v-else>
      {{ $t('global.loading') }}...
    </div>
  </div>
</template>
<script>
import WorkComponent from "@/components/Work/WorkComponent.vue";
import { loadItemsList } from "@/DbOperations";

export default {
  name: "Works_list",
  components: { WorkComponent },
  methods: {
    fetch() {
      alert("Симуляція fetch запиту");
    },
  },
  data() {
    return {
      worksList: []
    }
  },
  mounted() {
    loadItemsList("works")
      .then((response) => {
        this.worksList = response;
      })
      .catch(() => {
        console.log("some error");
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/main_colors";

.works-spacer {
  width: calc(100vw - 30px);
  height: 1px;
  background-color: #006d77;
}

.hidden-page {
  opacity: 0 !important;
  transition: opacity ease-out 0.2s;
  cursor: default !important;
}

.page-toggle {
  transition: opacity ease-out 0.2s;
}

.page-toggle:hover {
  cursor: pointer;
}

.container {
  background-color: $bg-green;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 10px;
  overflow: hidden;
  justify-content: space-between;

  .menu {
    width: calc(100vw - 30px);
    height: 25px;
    margin: 15px 0;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 30px;
    justify-content: space-between;

    select {
      width: calc(100% - 10px);
      outline: none;
      flex: 1;
      font-size: 11px;
      font-weight: 400;
      height: 25px;
      border-radius: 3px;
      border: none;
      padding-left: 10px;
    }
  }

  .works_list {
    gap: 15px;
    padding-top: 20px;
    min-height: calc(
      100vh - 75px - 68px
    ); // $2 це селектор $3 це верхнє меню + 1px (1px height spacer)
    width: calc(100vw - 30px);
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
  }

  .page-selector {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    margin-top: 20px;
    border-top: 1px solid $border-default;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>