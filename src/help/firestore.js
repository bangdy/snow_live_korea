import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const createDoc = async (col, uid, data) => {
  const docRef = firebase.firestore().collection(col).doc(uid);

  docRef
    .set(data)
    .then(() => true)
    .catch((error) => error);
};

export const getDoc = async (col, uid) => {
  const doc = await firebase.firestore().collection(col).doc(uid);

  try {
    const snapshot = await doc.get();
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};
