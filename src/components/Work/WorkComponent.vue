<template>
  <router-link
    class="router-link"
    :to="{
      name: 'work',
      params: { id: this.work.id },
    }"
  >
    <div class="work">
      <img :src="work.imgURL" alt="Фото поста" />
      <div class="post-data">
        <div class="text">
          <p class="post-name">{{ work.title }}</p>
        </div>
        <p style="font-size: 10px">
          {{ work.created_at }}
        </p>
        <div style="font-size: 14px">{{ work.salary }}₴</div>
        <div class="post-bottom">
          <div class="tag">
            <span>{{ work.tag }}</span>
          </div>
          <div class="buttons" v-if="user.role == 'admin'&&!workApprove">
            <font-awesome-icon
              class="done-button"
              :icon="['fas', 'pen']"
              @click.prevent="updateWork()"
            />
            <font-awesome-icon
              class="done-button"
              :icon="['fas', 'trash']"
              @click.prevent="deleteWork()"
            />
          </div>
          <div class="buttons" v-else-if="workApprove" @click.prevent="approve()">
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
  name: "WorkComponent",
  props: {
    work: Object,
    workApprove: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["user","accessToken"]),
  },
  methods: {
    updateWork() {
      this.$router.push({ name: "workEdit", params: { id: this.work.id } });
    },
    deleteWork() {
      if (confirm("Видалити оголошення ?")) {
        deleteItem("works", this.work.id, this.accessToken)
          .then(() => {
            this.$emit('reloadWorksList')
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    approve(){
      let workUpdate ={
        user_id: this.user.id,
        status: 1  
      };
      updateItem('works',this.work.id, workUpdate,this.accessToken)
        .then((response)=>{
          console.log(response);
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

.work {
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

      .address {
        font-size: 10px;
        text-align: left;
      }
    }
  }
  .post-bottom {
    display: flex;
    gap: 25px;
    width: 100%;
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
</style>