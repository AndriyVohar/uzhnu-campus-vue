<template>
  <router-link
    class="router-link"
    :to="{
      name: 'post',
      params: { id: this.post.id },
    }"
  >
    <div class="post">
      <img :src="post.imgURL" alt="Фото поста" />
      <div class="post-data">
        <div class="text">
          <div class="post-name-icon">
            <span class="post-name">{{ post.title }}</span>
            <img :src="post.creator.imgURL" alt="" class="user-profile" />
          </div>
          <p class="address">
            {{ $t("global.dormitory") }} №{{ post.creator.dormitory }}
            {{ post.creator.room }}
          </p>
          <p class="address">
            {{ post.created_at }}
          </p>
        </div>
        <div class="post-bottom">
          <div class="tag">
            <span>{{ post.tag }}</span>
          </div>
          <div
            class="buttons"
            v-if="(user.id == post.creator.id || user.role == 'admin')&&postApprove==false"
          >
            <font-awesome-icon
              class="done-button"
              :icon="['fas', 'pen']"
              @click.prevent="updatePost()"
            />
            <font-awesome-icon
              class="done-button"
              :icon="['fas', 'trash']"
              @click.prevent="deletePost()"
            />
          </div>
          <div class="buttons" v-else-if="postApprove==true" @click.prevent="approve()">
            <img src="@/assets/svg/done-icon.png" alt="Done" class="done-button" />
            <font-awesome-icon
              class="done-button"
              :icon="['fas', 'trash']"
              @click.prevent="deletePost()"
            />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteItem, updateItem } from "@/DbOperations";
export default {
  name: "Post_comp",
  props: {
    post: Object,
    postApprove: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["user","accessToken"]),
  },
  methods: {
    updatePost() {
      this.$router.push({
        name: "postEdit",
        params: { id: this.post.id },
      });
    },
    deletePost() {
      if (confirm("Видалити оголошення ?")) {
        deleteItem("advertisements", this.post.id,this.accessToken)
          .then(() => {
            this.$emit('reloadPostsList');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    approve(){
      let postUpdate ={
        user_id: this.user.id,
        status: 1  
      };
      updateItem('advertisements',this.post.id, postUpdate,this.accessToken)
        .then(()=>{
          this.$emit('reloadApproveList')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/main_colors";

.post {
  width: calc(100% - 20px);
  border-radius: 10px;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  transition: all ease-out 0.3s;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }

  img {
    max-height: 80px;
    min-height: 75%;
    object-fit: contain;
    height: 80px;
    width: 135px;
    max-width: 135px;
    overflow: hidden;
  }

  .post-data {
    display: flex;
    min-width: 160px;
    flex-direction: column;
    align-items: start;
    flex: 1;
    height: 100px;
    justify-content: space-evenly;

    .text {
      width: 100%;

      .post-name-icon {
        text-align: start;
        display: flex;
        flex-direction: row;
        gap: 15px;
        width: 100%;
        flex: 1;
        align-items: center;
        justify-content: space-between;

        .post-name {
          white-space: nowrap;
          text-align: left;
          overflow-x: hidden;
          width: calc(100% - 20px);
          max-width: calc(100% - 20px - 15px);
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        img {
          height: 20px;
          width: 20px;
          border-radius: 100%;
        }
      }

      .address {
        font-size: 10px;
        text-align: left;
      }
    }

    .post-bottom {
      display: flex;
      width:100%;
      gap: 25px;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;

      .buttons {
        display: flex;
        gap: 5px;
        .done-button {
          height: 20px;
          width: 25px;
          cursor: pointer;
          margin-left: auto;
        }
      }
    }
  }

  .tag {
    width: 80px;
    display: flex;
    height: 15px;
    background-color: #72ddf7;
    border-radius: 50px;
    line-height: 15px;
    text-align: center;

    span {
      width: 100%;
      font-weight: 400;
      font-size: 10px;
    }
  }
}
@media (min-width: 1000px) {

}
</style>