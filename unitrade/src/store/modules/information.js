import { collection, getDocs } from "firebase/firestore/lite";

import { firebaseDB } from "@/firebase-config";
const dbCollection = collection(firebaseDB, "information");
import axios from "axios";
export default {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  getters: {
    list: (state) => state.list,
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
  },
  actions: {
    async fetchList({ commit }) {
      try {
        const querySnapshot = await getDocs(dbCollection);
        const list = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        commit("setList", list);
        return list; // Опціонально, можна повертати дані для подальшого використання
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    loadListByDormitory({ commit }, dormitory) {
      return axios
        .get(`http://localhost:8000/api/${dormitory}/infos`)
        .then((response) => {
          commit("setList", response.data.data);
          return response.data.data;
        })
        .catch((error) => {
          console.error(error);
          throw error; // Повторно викидаємо помилку для обробки вище
        });
    },
    async loadListById({ commit }, postId) {
      try {
        const querySnapshot = await getDocs(dbCollection);

        const list = querySnapshot.docs
          .filter((doc) => doc.id == postId)
          .map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
        commit("setList", list);
        return list; // Optionally, you can return the data for further use
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};
