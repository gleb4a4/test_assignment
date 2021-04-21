/* eslint-disable */
import axios from "axios";
import router from '../../router';

const posts = {
  namespaced: true,
  state: {
    posts: [],
    changingPost: {},
    total: 0,
    currentPage: 1
  },
  getters: {
    getAllPosts (state) {
      return state.posts;
    },
    getClaps (state) {
      return state.claps;
    },
    getChangingPost (state) {
      return state.changingPost;
    },
    getTotal (state) {
      return state.total;
    },
    getCurrentPage (state) {
        return state.currentPage;
    }

  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload;
    },
    changingPost (state, payload) {
      state.changingPost = payload;
    },
    setTotal (state, payload) {
      state.total = payload;
    },
    setCurrentPage (state, payload) {
      state.currentPage = payload;
    }
  },
  actions: {
    async getPosts ({commit}, payload) {
      const response = await axios.get(`http://localhost:3000/posts?_page=${payload}`);
          const { data } = response;
          commit('setPosts', data);
    },
    addOnePost({ commit }, payload) {
      axios.post("http://localhost:3000/posts", payload)
    },
    async deletePost ({ commit }, payload) {
     await axios.delete(`http://localhost:3000/posts/${ payload }`);
    },
    changePost ({ commit }, payload) {
      axios.patch(`http://localhost:3000/posts/${ payload.id }`, {
        "title": payload.title,
        "description": payload.description,
        "updatedAt": payload.updatedDate
      })
      .then ( () => {
        router.go(-1);
      });
    },
    getTotalPages ({ commit }) {
      axios.get('http://localhost:3000/posts')
        .then( response => {
          const { data } = response;
          const total = data.length;
          commit('setTotal', total);
        })
    },
    addClaps ({ commit }, payload) {
      axios.patch(`http://localhost:3000/posts/${ payload.id }`, {
        "claps": +payload.claps + 1
      })
        .then ( ({ data }) => {
        payload.claps = +data.claps;
        })
    }
  }
}

export default posts;
