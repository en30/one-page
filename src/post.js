import firebase from "firebase";
import "firebase/firestore";
import user from "./user";

const collection = "posts";

// Firestore does not have either IN or OR
const fetchUsers = async querySnapshot => {
  let uniqueUsers = {};
  querySnapshot.forEach(doc => (uniqueUsers[doc.data().user] = true));
  const users = await Promise.all(
    Object.keys(uniqueUsers).map(id => user.show(id))
  );
  return users.reduce((a, e) => {
    a[e.id] = e;
    return a;
  }, {});
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
  const users = await fetchUsers(querySnapshot);
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
  index,
  create,
  update
};
