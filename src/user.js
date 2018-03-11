import firebase from "firebase";
import "firebase/firestore";

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
  put
};
