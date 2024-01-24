<template>
  <div class="container">
    <div class="menu">
      <select v-model="dormitoryNumber">
        <option value="1">{{ $t("global.dormitory") }} №1</option>
        <option value="2">{{ $t("global.dormitory") }} №2</option>
        <option value="3">{{ $t("global.dormitory") }} №3</option>
        <option value="4">{{ $t("global.dormitory") }} №4</option>
        <option value="5">{{ $t("global.dormitory") }} №5</option>
      </select>
    </div>
    <div class="posts-spacer"></div>
    <div class="posts_list" v-if="postsList&&postsList.length>0">
      <advertisement-component
        :post="post"
        v-for="post in postsList"
        :key="post.id"
      />
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
    <div class="posts_list" v-else>{{ $t("global.loading") }}...</div>
  </div>
</template>

<script>
import AdvertisementComponent from "@/components/Advertisement/AdvertisementComponent.vue";
import { loadItemsListByDormitory } from "@/DbOperations";

export default {
  name: "Posts_list",
  components: { AdvertisementComponent },
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
    loadPostsList(dormitoryNumber, pageIndex) {
      loadItemsListByDormitory("advertisements", dormitoryNumber, pageIndex)
        .then((response) => {
          this.postsList = response.data;
          this.lastPage = response.last_page;
        })
        .catch((error) => {
          console.log(error);
          this.postsList = null;
        });
    },
  },
  data() {
    return {
      page_index: 1,
      search: undefined,
      dormitoryNumber: localStorage.getItem("defaultDormitory"),
      postsList: null, //[]
      lastPage: 1,
    };
  },
  watch: {
    page_index(newValue) {
      this.loadPostsList(this.dormitoryNumber, newValue);
    },
    dormitoryNumber(newValue) {
      localStorage.setItem("defaultDormitory", newValue);
      this.page_index = 1;
      this.loadPostsList(newValue, this.page_index);
    },
  },
  mounted() {
    this.loadPostsList(this.dormitoryNumber, this.page_index);
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
  background-color: #D3DFE3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
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
      background-color: white;
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

  .posts-spacer {
    width: calc(100vw - 30px);
    height: 1px;
    background-color: #006d77;
  }

  .posts_list {
    gap: 15px;
    min-height: calc(
      100vh - 75px - 68px
    ); // $2 це селектор $3 це верхнє меню + 1px (1px height spacer)
    padding-top: 20px;
    width: calc(100vw - 30px);
    display: flex;
    padding-bottom: 60px;
    flex-direction: column;
  }

  .page-selector {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    border-top: 1px solid $border-default;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    justify-content: center;
    height: 40px;
    gap: 10px;
    font-weight: 500;
  }
}
</style>