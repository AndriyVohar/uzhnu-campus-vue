<template>
  <div class="page">
    <div class="alert">
      <h3>{{ $t('auth.oops') }}...</h3>
      <p>{{ $t('auth.text.notLogged') }}</p>
      <p>{{ $t('auth.text.functions') }}</p>
      <p>{{ $t("auth.rules") }}</p>
      <Auth_btn/>
    </div>
  </div>
</template>
<!-- Сторінка яка з'являється якщо користувач не авторизований -->
<script>
import Auth_btn from "@/components/Auth_btn.vue";

export default {
  components: {Auth_btn},
};
</script>

<style lang="scss">
@import "../assets/main_colors";

.page {
  background-color: $main-gray;
  display: flex;
  width: 100vw;
  height: calc(100vh - 57px);
  min-height: calc(100vh - 57px);
  justify-content: center;
  align-items: center;
}

.alert {
  width: 80vw;
  padding: 20px 5vw;
  background-color: #F6EAE6;
  text-align: start;
  border-radius: 10px;

  h3 {
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: 14px;
  }

  p {
    font-size: 10px;
  }

  .auth-btn {
    width: 80vw;
    margin-top: 15px;
  }
}
</style>