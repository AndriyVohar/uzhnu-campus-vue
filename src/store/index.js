import { createStore } from "vuex";
import Token from "@/token-usage";
import { itemById } from "@/DbOperations";
export default createStore({
  state() {
    return {
      user: {},
      accessToken: Token.getAccessTokenFromCookie(),
      userGoogleId: Token.getGoogleIdFromCookie(),
      dormitoryNumber: localStorage.getItem("defaultDormitoryNumber")||4,
    };
  },
  getters: {
    user: ({ user }) => {
      return user;
    },
    userGoogleId: ({ userGoogleId }) => {
      return userGoogleId;
    },
    accessToken: ({ accessToken }) => {
      return accessToken;
    },
  },
  mutations: {
    changeUser(state, value) {
      state.user = value;
    },
    changeAccessToken(state, value) {
      state.accessToken = value;
    },
    changeGoogleId(state, value){
      state.userGoogleId =value;
    },
    changeDormitoryNumber(state, number) {
      state.dormitoryNumber = number;
      localStorage.setItem("defaultDormitoryNumber", number);
    },
  },
  actions: {
    loadUser({ commit, state }) {
      itemById("users", state.userGoogleId, state.accessToken).then((response) => {
        if(response){
          commit("changeUser", response);
          // console.log(response);
          return response;
        }
      });
    },
  },
});
