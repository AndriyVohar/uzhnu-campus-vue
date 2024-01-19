<template>
  <div class="container">
    <div class="works_list" v-if="worksList.length > 0">
      <work-component :work="work" v-for="work in worksList" :key="work" />
      <div class="page-selector">
        <font-awesome-icon
          icon="arrow-left"
          :class="{ 'hidden-page': page_index == 1 }"
          @click="subPage()"
          class="page-toggle"
        />
        <span>{{ page_index }}</span>
        <font-awesome-icon
          icon="arrow-right"
          :class="{ 'hidden-page': page_index == lastPage }"
          @click="addPage()"
          class="page-toggle"
        />
      </div>
    </div>
    <div class="works_list" v-else>{{ $t("global.loading") }}...</div>
  </div>
</template>
<script>
// TODO: Page index
import WorkComponent from "@/components/Work/WorkComponent.vue";
import { loadItemsList } from "@/DbOperations";
export default {
  name: "Works_list",
  components: { WorkComponent },
  data() {
    return {
      worksList: [],
      page_index: 1,
      lastPage: 1,
    };
  },
  watch: {
    page_index(newValue) {
      this.loadList(newValue);
    },
  },
  mounted() {
    this.loadList(this.page_index);
  },
  methods: {
    subPage() {
      if (this.page_index > 1) {
        this.page_index -= 1;
      }
    },
    addPage() {
      if (this.page_index != this.lastPage) {
        this.page_index += 1;
      }
    },
    loadList(pageIndex) {
      loadItemsList("works", pageIndex)
        .then((response) => {
          this.worksList = response.data;
          this.lastPage = response.last_page;
        })
        .catch((error) => {
          console.log(error);
          this.postsList = null;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/main_colors";

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
  overflow: hidden;
  justify-content: space-between;
  .works-spacer {
    width: calc(100vw - 30px);
    height: 1px;
    background-color: #006d77;
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