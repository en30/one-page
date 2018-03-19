import firebase from "firebase";

const create = async function() {
  try {
    firebase.auth().languageCode = "ja";
    const provider = new firebase.auth.TwitterAuthProvider();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const result = await firebase.auth().signInWithPopup(provider);
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
