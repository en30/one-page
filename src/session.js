import firebase from "firebase";
import user from "./user";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().languageCode = "ja";

const create = async function() {
  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const result = await firebase.auth().signInWithPopup(provider);
    await user.update(result.user);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

const destroy = () => firebase.auth().signOut();

const onChange = f => firebase.auth().onAuthStateChanged(f);

export default {
  create,
  destroy,
  onChange
};
