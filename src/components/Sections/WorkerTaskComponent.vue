<template>
  <div class="task" @click="doneTask()">
    <div class="creator-info">
      <h4>{{ task.creator.room }}.</h4>
      <h4>{{ task.creator.name }}</h4>
      <h4 class="hours">{{ task.created_at }}</h4>
    </div>
    <div class="description">
      <p class="text">{{ task.description }}</p>
      <img src="@/assets/svg/done-icon.png" alt="Done" class="done-button" />
    </div>
  </div>
</template>

<script>
import { deleteItem } from "@/DbOperations";
import { mapGetters } from "vuex";
export default {
  props: {
    task: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["user","accessToken"]),
  },
  methods: {
    doneTask() {
      // TODO: Custom confirm
      let conf = confirm("Ви впевнені?");
      if (conf) {
        deleteItem("worker-tasks", this.task.id, this.accessToken).then(
          () => {
            location.reload();
          }
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  width: calc(100% - 20px);
  border-radius: 10px;
  min-height: 40px;
  background-color: #ffffff;
  display: flex;
  gap: 10px;
  flex-direction: column;
  transition: all ease-out 0.3s;
  padding: 10px;

  .creator-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .hours {
    font-size: 12px;
    font-weight: 500;
  }
  .description {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .text {
      width: 80%;
      text-align: left;
      font-size: 11px;
      word-wrap: break-word;
    }
    .done-button {
      height: 20px;
      width: 25px;
      cursor: pointer;
      margin-left: auto;
      margin-right: 10px;
    }
  }
}
</style>