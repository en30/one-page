import firebase from "firebase";
import "firebase/firestore";

// Firestore does not have either IN or OR
const list = async userIds => {
  const users = await Promise.all(userIds.map(id => show(id)));
  return users.reduce((a, e) => {
    a[e.id] = e;
    return a;
  }, {});
};

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
  list,
  show,
  put
};
