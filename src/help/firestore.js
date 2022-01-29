import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const createDoc = async (col, uid, data) => {
  const docRef = firebase.firestore().collection(col).doc(uid);

  docRef
    .set(data)
    .then(() => true)
    .catch((error) => error);
};

export const getDoc = async (col, docId) => {
  const doc = await firebase.firestore().collection(col).doc(docId);

  try {
    const snapshot = await doc.get();
    return snapshot.data();
  } catch (err) {
    console.log(err);
  }
};

export const updateDoc = async (col, docId, updatedObj) => {
  const doc = await firebase.firestore().collection(col).doc(docId);

  try {
    await firebase.firestore().runTransaction(async (transaction) => {
      transaction.update(doc, updatedObj);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllDocs = async (col) => {
  const snapshots = await firebase.firestore().collection(col).get();

  try {
    const result = snapshots.docs.map((i) => i.data());
    return result;
  } catch (err) {
    console.log(err);
  }
};
