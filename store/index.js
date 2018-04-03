import Vuex from 'vuex'
import firebase from "firebase";
import pick from 'lodash.pick';

export const state = () => ({
  currentUser: null,
});

export const mutations = {
  setCurrentUser(state, currentUser) {
    // without pick currentUser will be mutated inside firebase libaray
    state.currentUser = currentUser ? pick(currentUser, ['uid', 'photoURL', 'displayName']) : null;
  }
};

export const actions = {
  subscribeAuth({ commit }) {
    firebase.auth().onAuthStateChanged(currentUser =>
      commit('setCurrentUser', currentUser)
    );
  },
  async signOut({ commit }) {
    await firebase.auth().signOut();
  },
  async signIn({ commit }) {
    firebase.auth().languageCode = "ja";
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const result = await firebase.auth().signInWithPopup(provider);
  }
};

