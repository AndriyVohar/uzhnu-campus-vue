<template>
  <div
    class="mobile-form-container"
    v-if="
      postData &&
      (postData.status == 1 ||
        (postData.status == 0 &&
          ['admin', 'commandant'].includes(this.user.role)))
    "
  >
    <div class="form-container">
      <div class="photo-container">
        <img :src="postData.imgURL" alt="Photo" class="photo" />
      </div>
      <div class="form-content">
        <p class="header-text">{{ postData.title }}</p>
        <p class="name">{{ postData.creator.name }}</p>
        <p class="address">
          {{ $t("global.dormitory") }}: {{ postData.creator.dormitory }}
          {{ postData.creator.room }}
        </p>
        <div class="icons">
          <a :href="'https://www.instagram.com/' + postData.creator.instagram">
            <font-awesome-icon class="icon" :icon="['fab', 'instagram']" />
          </a>
          <a :href="'https://t.me/' + postData.creator.telegram">
            <font-awesome-icon class="icon" :icon="['fab', 'telegram']" />
          </a>
          <a @click="copyToClipboard(postData.creator.email, 'email')">
            <font-awesome-icon class="icon" :icon="['far', 'envelope']" />
          </a>
          <a @click="copyToClipboard(postData.creator.phone, 'phone')">
            <font-awesome-icon class="icon" :icon="['fas', 'phone']" />
          </a>
        </div>
        <div style="display: flex" class="down">
          <div class="category">{{ postData.tag }}</div>
          <p class="date">{{ postData.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>{{ $t("global.loading") }}...</div>
</template>

<script>
import { itemById } from "@/DbOperations";
import { mapGetters } from "vuex";
export default {
  name: "PostPage",
  data() {
    return {
      postData: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    copyToClipboard(value, type) {
      let text = "Номер скопійовано";
      if (type == "email") {
        text = "Пошту скопійовано";
      }
      navigator.clipboard.writeText(value);
      alert(text);
    },
  },
  mounted() {
    itemById("advertisements", this.$route.params.id)
      .then((response) => {
        this.postData = response;
      })
      .catch(() => {
        console.log("something wrong");
      });
    // this.user_data = this.postData.user_data
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/main_colors";

/* Global Styles */
.icons {
  display: flex;
  gap: 10px;
  padding: 5px 0px;

  .icon {
    cursor: pointer;
    color: black;
    width: 20px;
    height: 20px;
  }
}

/* Component: .mobile-form-container */
.mobile-form-container {
  background-color: $main-gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 100vw;
  min-height: calc(100vh - 50px - 50px);
  overflow: hidden;
}

/* Component: .form-container */
.form-container {
  transition: all ease-out 0.4s;
  background-color: $bg-secondary;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: calc(90% - 30px);
  padding: 15px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Component: .photo-container */
.photo-container {
  position: relative;
  height: 200px;
  max-height: 200px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 5px;

  .photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Component: .form-content */
.form-content {
  text-align: left;
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Adjusted for better alignment */

  .header-text {
    font-size: 16px;
    font-weight: 500;
  }

  .name,
  .address {
    font-size: 12px;
  }

  .down {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .complain-btn {
      cursor: pointer;
      width: 110px;
      height: 30px; /* Adjusted height for better display */
      background-color: #3498db;
      color: white;
      border-radius: 5px;
      padding: 8px 12px;
      text-align: center;
      margin-top: 10px;
      float: right;
    }

    .category {
      border-radius: 50px;
      font-size: 12px;
      padding: 5px 10px;
      background-color: #72ddf7;
    }
    .date {
      font-size: 12px;
    }
  }
}
@media (min-width: 1000px) {
  .form-container {
    width: 50vw;
    max-width: 50vw;
    transition: all ease-out 0.4s;
  }
}
</style>

