import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const createUserDoc = async (uid) => {
  const docRef = firebase.firestore().collection("users").doc(uid);

  console.log(docRef.data());

  docRef
    .set({})
    .then(() => true)
    .catch((error) => error);
};

export const getUserDoc = async (uid) => {
  const doc = await firebase.firestore().collection("users").doc(uid);

  try {
    const snapshot = await doc.get();
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};
