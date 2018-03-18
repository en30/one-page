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

const create = post =>
  firebase
    .firestore()
    .collection(collection)
    .doc()
    .set({
      ...post,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

const update = post => {
  const { id, ...attrs } = post;
  return firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .set({
      ...attrs,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
};

export default {
  index,
  create,
  update
};
