import { createStore } from "vuex";
import Token from "@/token-usage";
import { itemById } from "@/DbOperations";
export default createStore({
  state() {
    return{
      user: {},
      accessToken: Token.getAccessTokenFromCookie(),
      userGoogleId: Token.getGoogleIdFromCookie()
    }
  },
  getters: {
    user: ({ user }) => {
      return user;
    },
    userGoogleId: ({ googleId }) => {
      return googleId;
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
  },
  actions: {
    loadUser({commit},$google_id){
      itemById('users', $google_id).then((response)=>{
        commit('changeUser',response)
        console.log(response);
        return response;
      })
    }
  },
});