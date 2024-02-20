<template>
  <div>
    <div class="form-container" @submit.prevent="createInfo()">
      <form class="form-content">
        <h2 class="form-title">{{ $t("info.create") }}</h2>
        <div class="input-group">
          <input
            type="text"
            id="title"
            v-model="formData.title"
            :placeholder="$t('form.title')"
            class="input-field"
            required
          />
          <textarea
            style="resize: none;"
            v-model="formData.description"
            :placeholder="$t('form.description')"
            class="input-field"
            required
          ></textarea>
        </div>
        <div class="button-group">
          <button class="save-button" type="submit">
            {{ $t("form.submit") }}
          </button>
          <button
            type="button"
            class="cancel-button"
            @click="$router.push('/me')"
          >
            {{ $t("form.cancel") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { addItem } from "@/DbOperations";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    createInfo() {
      this.formData.dormitory = this.user.dormitory;
      addItem("infos", this.formData, this.user.google_id)
        .then(() => {
          this.$router.push("/me");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    if (this.user.role != "admin") {
      alert("Ви не маєте доступу до цих функцій");
      this.$router.push("/me");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/main_colors";
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: calc(95vw - 30px);
  max-width: 600px;
  border-radius: 15px;
  padding: 20px;
  margin: auto;
  margin-top: 20px;
  background-color: #ffffff;

  .form-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .form-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .input-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      .input-field {
        padding: 10px;
        border-radius: 15px;
        border: none;
        outline: none;
        background-color: #d3dfe3;
        font-size: 12px;
        font-weight: 500;
        flex: 1;

        &::placeholder {
          transition: padding-left ease-out 0.2s, opacity ease-out 0.2s;
        }

        &:focus-visible::placeholder {
          padding-left: 20px;
          opacity: 0;
          transition: padding-left ease-out 0.2s, opacity ease-out 0.2s;
        }
      }
    }

    .button-group {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;

      button {
        border-radius: 15px;
        padding: 10px 20px;
        font-size: 12px;
        font-weight: 600;
        outline: none;
      }

      .save-button {
        background-color: #006d77;
        color: #ffffff;
        border: 1px solid #006d77;
      }

      .cancel-button {
        background: none;
        border: 1px solid #5c6669;
        color: #5c6669;
      }
    }
  }
}

input[type="file"]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: $dark_blue_main;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

input[type="file"]::file-selector-button:hover {
  background: $dark_blue_main;
}
</style>
  