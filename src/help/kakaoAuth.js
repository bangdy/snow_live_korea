import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { setUid } from "store/user";
import { createUserDoc } from "help/firestore";

export default function kakaoAuth(kakaoAuthCode) {
  const functions = getFunctions();
  if (kakaoAuthCode) {
    //카카오 로그인 토큰을 파이어베이스 함수에 전달합니다.
    var kakaoAuth = httpsCallable(functions, "KakaoAuth");
    let kakaoToken;

    kakaoAuth({ code: kakaoAuthCode })
      .then(function (result) {
        // Read result of the Cloud Function.
        console.log("below : cloud function result");
        console.log(result);
        kakaoToken = result.data.kakao_token;
        var fireToken = result.data.firebase_token;
        // 토근이 정상적으로 처리될 경우 로그인 처리합니다.
        return firebase.auth().signInWithCustomToken(fireToken);
      })
      .catch(function (error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;

        console.log(error);
        console.log(code, message, details);
        console.log(error.body);

        alert("정상적이지 않은 접근입니다. 만료된 데이터이거나 이미 사용된 데이터입니다.");
        // alert(message + ' ' + details);
        // _this.$router.push("/signin");
        return;
      })
      .then(function (result) {
        // _this.token = kakaoToken;
        window.Kakao.Auth.setAccessToken(kakaoToken);
        const user = result.user;
        console.log("User : ", user);
        console.log(result.additionalUserInfo);
        if (result.additionalUserInfo.isNewUser) {
          console.log("신규 사용자...");
          // _this.$router.push("/welcome"); // welcome
        } else {
          // _this.$router.push("/profile");
          console.log("기존 user?");
        }
        return user;
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);

        alert("토큰이 정상적이지 않습니다. 만료된 토큰이거나 이미 사용된 토큰입니다.");
        // _this.$router.push("/signin");
        return;
      });
  } else {
    alert("잘못된 방법으로 접근하셨습니다. 로그인 페이지로 이동합니다.");
    // _this.$router.push("/signin");
    return;
  }
}
