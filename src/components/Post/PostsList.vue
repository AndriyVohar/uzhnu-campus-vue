<template>
  <div class="container">
    <div class="posts_list" v-if="postsList && postsList.length > 0">
      <post-component :post="post" @reloadPostsList="loadPostsList" v-for="post in postsList" :key="post.id" />
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
import PostComponent from "@/components/Post/PostComponent.vue";
import { loadItemsListByDormitory } from "@/DbOperations";
export default {
  name: "Posts_list",
  components: { PostComponent },
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
    loadPostsList() {
      loadItemsListByDormitory("advertisements", this.dormitoryNumber, this.page_index)
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
      postsList: null, //[]
      lastPage: 1,
    };
  },
  computed: {
    dormitoryNumber() {
      return this.$store.state.dormitoryNumber;
    },
  },
  watch: {
    page_index() {
      this.loadPostsList();
    },
    dormitoryNumber() {
      // this.$store.commit('changeDormitoryNumber',newValue);
      this.page_index = 1;
      this.loadPostsList();
    },
  },
  mounted() {
    this.loadPostsList();
  },
  created() {},
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
  background-color: #d3dfe3;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-bottom:43px;

  .posts_list {
    gap: 15px;
    min-height: calc(
      100vh - 170px
    );
    margin-top: 15px;
    width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
  }

  .page-selector {
    padding-bottom: 10px;
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
@media (min-width: 800px) {
  .container{
    display: block;
    justify-content:center;
    .posts_list {
      gap: 15px;
      min-height: calc(
        100vh - 170px
      );
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .page-selector{
      margin-left: auto;
    }
  }
}
</style>