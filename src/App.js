/*global Kakao*/
import "./App.css";
import { useEffect } from "react";
import initFirebase from "./help/firebaseConfig";
import kakaoAuth from "./help/kakaoAuth";

//process.env.REACT_APP_REST_API_KEY ??

initFirebase();

function App() {
  const redirectUri = "http://localhost:3000";
  const onClickToAuthorize = () => {
    Kakao.Auth.authorize({
      redirectUri: redirectUri,
    });
  };

  useEffect(() => {
    const kakaoAuthCode = window.location.search.split("=")[1];
    kakaoAuth(kakaoAuthCode);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClickToAuthorize}>카카오톡</button>
      </header>
    </div>
  );
}

export default App;
