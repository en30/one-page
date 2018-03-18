import firebase from "firebase";
import "firebase/firestore";
import user from "./user";

const collection = "posts";

const show = async id => {
  const doc = await firebase
    .firestore()
    .collection(collection)
    .doc(id)
    .get();
  if (!doc.exists) return null;
  const attrs = doc.data();
  return { id: doc.id, ...attrs, user: await user.show(attrs.user) };
};

const extractUniqueUserIds = querySnapshot => {
  let users = {};
  querySnapshot.forEach(doc => (users[doc.data().user] = true));
  return Object.keys(users);
};

const embedUsers = (querySnapshot, users) => {
  let res = {};
  querySnapshot.forEach(doc => {
    const attrs = doc.data();
    res[doc.id] = { id: doc.id, ...attrs, user: users[attrs.user] };
  });
  return res;
};

const index = async () => {
  const querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .orderBy("createdAt", "desc")
    .get();
  const users = await user.list(extractUniqueUserIds(querySnapshot));
  return embedUsers(querySnapshot, users);
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
  show,
  index,
  create,
  update
};
