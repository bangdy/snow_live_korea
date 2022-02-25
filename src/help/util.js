import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";

export const getDate = (d) => {
  var date = d;
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + month + day;
};

export function imgLoad(url) {
  "use strict";
  // Create new promise with the Promise() constructor;
  // This has as its argument a function with two parameters, resolve and reject
  return new Promise(function (resolve, reject) {
    // Standard XHR to load an image
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "blob";

    // When the request loads, check whether it was successful
    request.onload = function () {
      if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
        resolve(request.response);
      } else {
        // If it fails, reject the promise with a error message
        reject(new Error("Image didn't load successfully; error code:" + request.statusText));
      }
    };

    request.onerror = function () {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
      reject(new Error("There was a network error."));
    };

    // Send the request
    request.send();
  });
}

export const uploadImage = async (user, imageFile) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profile/${user.uid}`);

  const options = {
    maxSizeMB: 0.01,
    maxWidthOrHeight: 500,
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(imageFile, options);

  await uploadBytes(storageRef, compressedFile);
};

export const downloadImage = async (folder, file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${file}`);
  const imgStorageUrl = await getDownloadURL(storageRef);
  const image = await imgLoad(imgStorageUrl);
  return URL.createObjectURL(image);
};
