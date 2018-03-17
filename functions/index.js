const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

exports.createUserOnFirestore = functions.auth.user().onCreate(event => {
  const { uid, displayName, photoURL } = event.data;
  return firestore
    .collection("users")
    .doc(uid)
    .set({
      displayName,
      photoURL
    });
});
