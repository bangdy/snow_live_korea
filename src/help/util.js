import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import imageCompression from "browser-image-compression";
import React from "react";

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

export const uploadImage = async (folder, fileName, imageFile) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${fileName}`);

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
  try {
    const imgStorageUrl = await getDownloadURL(storageRef);
    const image = await imgLoad(imgStorageUrl);
    return URL.createObjectURL(image);
  } catch (err) {
    if (err.code === "storage/object-not-found") {
      return null;
    } else {
      throw err;
    }
  }
};

export const removeImage = async (folder, file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${folder}/${file}`);
  try {
    const result = await deleteObject(storageRef);
    console.log(result);
    return result;
  } catch (err) {
    if (err.code === "storage/object-not-found") {
      return null;
    } else {
      throw err;
    }
  }
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getJSON = function (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    const status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

export const nameToPath = (name, url = null) => {
  let result;

  switch (name) {
    case "Main":
      result = "/";
      break;
    case "Login":
      result = "/login";
      break;
    case "MyPage":
      result = "/my_page";
      break;
    case "Review":
      result = `/${url}`;
      break;
    case "ResortEditor":
      result = "/resort_editor";
      break;
    case "About":
      result = "/about";
      break;
    case "Admin":
      result = "/admin";
      break;
    case "LoadingItem":
      result = "/loading";
      break;
    default:
      result = "/";
  }

  return result;
};

export const ModalWrapper = React.forwardRef((props, ref) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export const dayFormatChange = (d) => d.slice(0, 4) + "-" + d.slice(4, 6) + "-" + d.slice(6);
