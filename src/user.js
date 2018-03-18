import firebase from "firebase";
import "firebase/firestore";

const show = async id =>
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .get()
    .then(doc => (doc.exists ? { id: doc.id, ...doc.data() } : null));

const put = async ({ uid, displayName, photoURL }) =>
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .set({
      displayName,
      photoURL
    });

export default {
  show,
  put
};
