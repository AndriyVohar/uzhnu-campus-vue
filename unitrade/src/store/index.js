import Token from "@/token-usage";
import { itemById } from "@/DbOperations";
export default {
  namespaced: true,
  state: {
    user: {},
    accessToken: Token.getAccessTokenFromCookie(),
  },
  getters: {
    user: ({ user }) => {
      return user;
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
      })
    }
  },
};
