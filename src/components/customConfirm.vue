<script>
export default {
  name: "customConfirm",
  props: {
    title: String,
    description: String,
    type: {
      type: String,
      validator(value) {
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  },
}
</script>

<template>
  <div class="confirm-bg">
    <div class="confirm-base">
      <div class="confirm-data">
        <div class="icon">
          <font-awesome-icon :icon="['fas', 'circle-check']" v-if="type === 'success'"/>
          <font-awesome-icon :icon="['fas', 'triangle-exclamation']" v-else-if="type === 'warning'"/>
          <font-awesome-icon :icon="['fas', 'bomb']" v-else/>
        </div>
        <div class="confirm-text">
          <p>{{ title }}</p>
          <p>{{ description }}</p>
          <p>{{ type }}</p>
        </div>
      </div>
      <div class="buttons">
        <button>Скасувати</button>
        <button>Підтвердити</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirm-bg {
  width: 100vw;
  height: calc(100vh - 50px);
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
}

.confirm-base {
  transition: width ease-out .2s;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #EDF6F9;
  border-radius: 3px;
  aspect-ratio: 1/0.5;
  min-height: 300px;
  min-width: 300px;
  position: fixed;

  .confirm-data {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    .icon{
      width: 30%;
      svg{
        height: 32px;
      }
    }
    .confirm-text{
      width: 70%;
      p{
        text-align: left;
        padding-left: 20px;
        width: calc(100% - 20px);
      }
    }
  }

  .buttons {
    width: 100%;
    border-top: 1px solid #006D77;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;

    button {
      height: 30px;
      padding: 0px 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>