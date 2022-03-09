import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const createDoc = async (col, uid, data) => {
  const docRef = firebase.firestore().collection(col).doc(uid);

  const snapshot = await docRef.get();
  const isExist = snapshot.data();

  if (isExist) {
    throw "Is Exist";
  }
  try {
    docRef.set(data);
    return "Success";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDoc = async (col, docId) => {
  const doc = await firebase.firestore().collection(col).doc(docId);

  try {
    const snapshot = await doc.get();
    return snapshot.data();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateDoc = async (col, docId, updatedObj) => {
  const doc = await firebase.firestore().collection(col).doc(docId);

  try {
    await firebase.firestore().runTransaction(async (transaction) => {
      transaction.update(doc, updatedObj);
    });
    return "Success";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateDocL3 = async (col, docId, l1, l2, l3, updatedObj) => {
  const doc = await firebase.firestore().collection(col).doc(docId);

  try {
    await firebase.firestore().runTransaction(async (transaction) => {
      transaction.update(doc, `${l1}.${l2}.${l3}`, updatedObj);
    });
    return "Success";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteDocL3 = async (col, docId, l1, l2, l3) => {
  const doc = await firebase.firestore().collection(col).doc(docId);

  try {
    await doc.update({
      [`${l1}.${l2}.${l3}`]: firebase.firestore.FieldValue.delete(),
    });
    return "Success";
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllDocs = async (col) => {
  const snapshots = await firebase.firestore().collection(col).get();

  try {
    const result = snapshots.docs.map((i) => i.data());
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
