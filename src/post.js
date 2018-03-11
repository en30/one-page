import firebase from "firebase";
import "firebase/firestore";

const collection = "posts";

const index = async () => {
  const querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  let res = {};
  querySnapshot.forEach(doc => (res[doc.id] = { id: doc.id, ...doc.data() }));
  return res;
};

const put = async post =>
  firebase
    .firestore()
    .collection(collection)
    .doc()
    .set(post);

export default {
  index,
  put
};
