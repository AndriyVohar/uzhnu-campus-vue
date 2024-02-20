<template>
  <div class="user-profile" v-if="!edit_state">
    <div class="user-data">
      <div class="main-data">
        <div class="profile-photo">
          <img :src="user.imgURL" alt="Фото профілю" />
          <div class="edit-pen" @click="edit_state = true">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </div>
        </div>
        <div class="data">
          <p id="fullname">{{ user.name }}</p>
          <p id="dormitory">
            {{ $t("global.dormitory") }} №{{ user.dormitory }},
            {{ $t("global.room") }} {{ user.room }}
          </p>
          <p id="creationdate">
            {{ $t("profile.dateOfJoining") }}: {{ user.created_at }}
          </p>
        </div>
      </div>
      <div class="contacts">
        <div class="left-part">
          <p>
            <font-awesome-icon :icon="['fas', 'phone']" />
            {{ user.phone }}
          </p>
          <p>
            <font-awesome-icon :icon="['far', 'envelope']" />
            {{ user.email }}
          </p>
        </div>
        <div class="right-part">
          <div class="links">
            <a :href="'https://instagram.com/' + user.instagram">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a :href="'https://t.me/' + user.telegram">
              <font-awesome-icon :icon="['fab', 'telegram']" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="user-selector" v-if="user.role == 'admin'">
      <span>{{ $t("profile.show") }}</span>
      <div class="select-group">
        <select v-model="toggle">
          <option value="posts">
            {{ $t("global.post") }}
          </option>
          <option value="works">{{ $t("global.work") }}</option>
          <option value="infos">{{ $t("global.info") }}</option>
        </select>
        <img
          src="@/assets/svg/browse.svg"
          alt=""
          v-if="toggle == 'adverisements'"
        />
        <img src="@/assets/svg/work.svg" alt="" v-else-if="toggle == 'works'" />
        <img src="@/assets/svg/info.svg" alt="" v-else />
      </div>
    </div>
    <div class="user-actions">
      <button id="exit" @click="signOutMethod()">
        {{ $t("profile.logout") }}
      </button>
      <button
        id="create-post"
        v-if="toggle == 'posts'"
        @click="createBtn(toggle)"
      >
        {{ $t("profile.createPost") }}
      </button>
      <button
        id="create-work"
        v-else-if="toggle == 'works'"
        @click="createBtn(toggle)"
      >
        {{ $t("profile.createWork") }}
      </button>
      <button id="create-info" v-else @click="createBtn(toggle)">
        {{ $t("profile.createInfo") }}
      </button>
    </div>
    <div class="spacer"></div>
    <div class="list" v-if="toggle == 'posts'">
      <post-component
        :post="post"
        v-for="post in posts_list"
        :key="post.id"
      />
    </div>
    <div class="list" v-else-if="toggle == 'works'">
      <work-component
        :work="work"
        :userProp="user"
        v-for="work in works_list"
        :key="work.id"
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

      <!-- TODO: Index page -->
    </div>
    <div class="list" v-else>
      <info-component
        :attention="attention"
        :user="user"
        v-for="attention in attentionList"
        :key="attention.title"
      />
    </div>
  </div>
  <div class="user-edit" v-else>
    <div class="main-data">
      <div class="profile-photo">
        <img :src="user.imgURL" alt="Фото профілю" />
      </div>
      <div class="data">
        <p id="fullname">{{ user.name }}</p>
        <p id="creationdate">
          {{ $t("profile.dateOfJoining") }}: {{ user.created_at }}
        </p>
      </div>
    </div>
    <div class="inputs">
      <div class="input-row">
        <font-awesome-icon :icon="['fas', 'building']" />
        <input
          type="number"
          v-model="user.dormitory"
          max="5"
          min="1"
          placeholder="Номер гуртожитку. Приклад: 4"
        />
      </div>
      <div class="input-row">
        <font-awesome-icon :icon="['fas', 'person-shelter']" />
        <input
          type="text"
          v-model="user.room"
          placeholder="Номер кімнати. Приклад: 82/4"
        />
      </div>
      <div class="input-row">
        <font-awesome-icon :icon="['fas', 'phone']" />
        <input
          type="text"
          v-model="user.phone"
          placeholder="Приклад: +380950990019"
        />
      </div>
      <div class="input-row">
        <font-awesome-icon :icon="['fab', 'instagram']" />
        <input
          type="text"
          v-model="user.instagram"
          placeholder="Приклад: uzhnu"
        />
      </div>
      <div class="input-row">
        <font-awesome-icon :icon="['fab', 'telegram']" />
        <input
          type="text"
          v-model="user.telegram"
          placeholder="Приклад: uzhnu"
        />
      </div>
    </div>
    <div class="actions">
      <button id="save" @click="setUser()">{{ $t("global.save") }}</button>
      <button id="cancel" @click="this.edit_state = false">
        {{ $t("global.cancel") }}
      </button>
    </div>
  </div>
</template>

<script>
import Token from "@/token-usage.js";
import PostComponent from "@/components/Post/PostComponent.vue";
import WorkComponent from "@/components/Work/WorkComponent.vue";
import InfoComponent from "@/components/Info/InfoComponent.vue";
import {
  loadItemsList,
  itemById,
  updateItem,
  postsByUser,
} from "@/DbOperations";

export default {
  components: { WorkComponent, PostComponent, InfoComponent },
  data() {
    return {
      toggle: "posts",
      user: {},
      posts_list: [],
      works_list: [],
      attentionList: [],
      edit_state: false,
      page_index: 1,
      lastPage: 1,
    };
  },
  computed: {},
  mounted() {
    itemById("users", Token.getGoogleIdFromCookie()).then((user) => {
      this.user = user;
      this.$store.commit("changeUser", user);

      postsByUser(this.user.id, this.user.google_id).then(
        (posts) => {
          this.posts_list = posts;
        }
      );
    });
  },
  watch: {
    page_index(newValue) {
      loadItemsList("works", newValue)
          .then((response) => {
            this.works_list = response.data;
            this.lastPage = response.last_page;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    toggle(newValue) {
      if (newValue == "posts" && this.posts_list.length < 1) {
        postsByUser(this.user.id, this.user.google_id).then(
          (posts) => {
            console.log(posts);
            this.posts_list = posts;
          }
        );
      } else if (newValue == "works" && this.works_list.length < 1) {
        loadItemsList("works", this.page_index)
          .then((response) => {
            this.works_list = response.data;
            this.lastPage = response.last_page;
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (newValue == "infos" && this.attentionList.length < 1) {
        loadItemsList("infos")
          .then((response) => {
            this.attentionList = response;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
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
    openPost(id) {
      this.$router.push({ name: "post", params: { id: id } });
    },
    signOutMethod() {
      Token.removeGoogleIdCookie();
      Token.removeAccessTokenCookie();
      this.$router.push("/");
    },
    setUser() {
      if (this.user.dormitory > 0 && this.user.dormitory < 6) {
        const userEdited = { ...this.user };
        delete userEdited.id;
        delete userEdited.created_at;
        updateItem(
          "users",
          this.user.google_id,
          userEdited,
          this.user.google_id
        ).then(() => {
          location.reload();
        });
      } else {
        alert("Введіть коректний номер гуртожиту");
      }
    },
    createBtn(type) {
      if (
        this.user.dormitory &&
        this.user.instagram &&
        this.user.phone &&
        this.user.room &&
        this.user.telegram
      ) {
        this.$router.push(`${type}/create`);
      } else {
        alert("Редагуйте дані свого профілю, додавши інформацію");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/main_colors";

.hidden-page {
  opacity: 0 !important;
  transition: opacity ease-out 0.2s;
  cursor: default !important;
}

#exit {
  background-color: $danger-color;
}

.spacer {
  width: 100%;
  height: 2px;
  background-color: $main;
}

.user-actions {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  button {
    border: none;
    outline: none;
    background-color: $main;
    font-size: 12px;
    border-radius: 10px;
    padding: 5px 15px;

    &:hover {
      cursor: pointer;
    }
  }

  #exit {
    flex: 1;
  }
}

.user-edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: calc(90vw - 30px);
  border-radius: 15px;
  padding: 15px;
  margin: auto;
  margin-top: 15px;
  background-color: #ffffff;

  .main-data {
    width: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-direction: row;

    .profile-photo:hover {
      .edit-pen {
        cursor: pointer;
        transition: box-shadow ease-out 0.2s;
        box-shadow: 0px 0px 5px #000000;
      }
    }

    .profile-photo {
      height: 60px;
      width: 60px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 15px;
      }

      .edit-pen {
        height: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: -65px;
        background-color: #edf6f9;
        color: #000000;
        transition: box-shadow ease-out 0.2s;
        position: relative;
        width: 20px;
        border-radius: 50px;

        svg {
          height: 10px;
          width: 10px;
        }
      }
    }

    .data {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
      gap: 3px;
      justify-content: left;

      p {
        text-align: left;
        width: 100%;
        font-weight: 400;
      }

      #fullname {
        font-size: 14px;
      }

      #creationdate {
        font-size: 8px;
        color: #8e8e8e;
      }
    }
  }

  .inputs {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .input-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      justify-content: space-between;

      svg {
        width: 20px;
        height: 20px;
      }

      input {
        padding-left: 15px;
        border-radius: 15px;
        border: none;
        outline: none;
        background-color: #d3dfe3;
        font-size: 10px;
        font-weight: 400;
        height: 25px;
        flex: 1;

        &::placeholder {
          transition: padding-left ease-out 0.2s, opacity ease-out 0.2s;
        }

        &:focus-visible::placeholder {
          padding-left: 30px;
          opacity: 0;
          transition: padding-left ease-out 0.2s, opacity ease-out 0.2s;
        }
      }
    }
  }

  .actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    button {
      border-radius: 15px;
      padding: 8px 15px;
    }

    #save {
      background-color: #006d77;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      outline: none;
      border: 1px solid #006d77;
    }

    #cancel {
      background: none;
      border: 1px solid #5c6669;
      color: #5c6669;
      font-size: 10px;
      outline: none;
      font-weight: 500;
    }
  }
}

.user-profile {
  width: 90vw;
  margin: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  .user-data {
    padding: 15px;
    gap: 20px;
    width: calc(100% - 30px);
    border-radius: 15px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;

    .main-data {
      width: 100%;
      display: flex;
      gap: 20px;
      align-items: center;
      flex-direction: row;

      .profile-photo:hover {
        .edit-pen {
          transition: box-shadow ease-out 0.2s;
          box-shadow: 0px 0px 5px #000000;
        }
      }

      .profile-photo {
        height: 60px;
        width: 60px;

        img {
          width: 60px;
          height: 60px;
          border-radius: 15px;
        }

        .edit-pen {
          height: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          top: -65px;
          background-color: #edf6f9;
          color: #000000;
          transition: box-shadow ease-out 0.2s;
          position: relative;
          width: 20px;
          border-radius: 50px;

          svg {
            height: 10px;
            width: 10px;
          }
        }
      }

      .data {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        gap: 3px;
        justify-content: left;

        p {
          text-align: left;
          width: 100%;
          font-weight: 400;
        }

        #fullname {
          font-size: 14px;
        }

        #dormitory {
          font-size: 11px;
        }

        #creationdate {
          font-size: 8px;
          color: #8e8e8e;
        }
      }
    }

    .contacts {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: end;
      justify-content: space-between;

      .left-part {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: left;
        gap: 5px;
        font-size: 11px;

        p {
          display: flex;
          flex-direction: row;
          flex: 1;
          gap: 10px;
          align-items: center;
          line-height: 20px;
        }

        svg {
          height: 15px;
          width: 15px;
          padding: 2.5px;
        }
      }

      .right-part {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: end;

        .links {
          gap: 10px;
          display: flex;
          flex-direction: row;

          svg {
            height: 20px;
            width: 20px;
          }

          a {
            text-decoration: none;
            color: black;
          }
        }
      }
    }
  }

  .list {
    width: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 15px;
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

  .user-selector {
    background-color: $main;
    border-radius: 15px;
    padding: 0 15px;
    height: 40px;
    width: calc(100% - 30px);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    span {
      font-size: 16px;
    }

    .select-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;

      select {
        border: none;
        outline: none;
        font-size: 14px;
        background-color: $main;
        text-align: right;
      }

      img {
        height: 15px;
        width: 15px;
        padding: 2.5px;
      }
    }
  }
}
</style>