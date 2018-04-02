import Vue from "vue"
import firebase from "firebase";

if(!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  });  
}

Vue.use({
  install(Vue, options) {
    Vue.prototype.$auth = firebase.auth;
  }
})
