# SNOW LIVE KOREA

### 이력

- 시작 : 211229

### 서비스 User Flow

User 상태 : not Login / Member profile x / Member profile o / Member & admin

Page :  home / login / my_page  / 각각의 resort



##### Case 1 : 첫 가입

- login 페이지로 이동
- 카카오 인증을 통해, 계정 생성
- 계정 생성 후, 프로필을 등록하기 위해 my_page 의 profile 입력 tab 으로 이동 (다른 곳으로 이동 불가)
- 프로필을 등록 후, main 페이지로 이동





-------





## About Project

### 프로젝트 소정의 목표

- open source
- no css files

### 배운 내용

- fireabse private key, .env 에서 오류 발생 할 때

  - https://crispypotato.tistory.com/116
  - private_key끝에 replace(/\\n/g, '\n')를 넣어주면 정상적으로 작동

- CORS 에 관하여
  - https://evan-moon.github.io/2020/05/21/about-cors/
  - cloud function 에 auth 하는 코드를 추가할 때, **Access-Control-Allow-Origin** 로 요청하는 곳의 주소를 추가가 필요하다.
- express 를 이용하여, kakao auth 해주는 서버 구현 (내가 사용한 것 x)
  - https://blog.naver.com/PostView.nhn?blogId=chltmddus23&logNo=221784299552&parentCategoryNo=&categoryNo=19&viewDate=&isShowPopularPosts=true&from=search
  - https://github.com/FirebaseExtended/custom-auth-samples
- [Firebase Kakao Login, 카카오톡 로그인](https://parandol.tistory.com/48) (내가 사용 한 것)
  - firebase functions 를 이용하여, kakao auth를 통해, 카카오계정 번호를 얻어서 fireabse auth 를 진행하느 방법
- Firebase storage 에 cors 설정 추가하는 방법
  - https://stove99.github.io/etc/2021/06/09/firebase-storage-cors-setting/

- Custom Hook 을 이용해서 textfield 에 auto focus 하는 방법
  - https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

- 특정 행동하기 전에 사용자에게 의견을 묻은 방법 : window.confirm(msg) 사용

- 특정 component 의 width 를 동적으로 얻는 방법

  - https://thewebdev.info/2021/05/24/how-to-get-the-width-of-an-element-in-a-react-component/

  - 사용 : src/components/ImageEditorBox.js

    - ```javascript
      const myContainer = useRef(null);
      
        useEffect(() => {
          setWidth(myContainer.current?.offsetWidth);
        }, [myContainer.current?.offsetWidth]);
      ```

      
