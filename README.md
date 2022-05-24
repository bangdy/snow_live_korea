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

##### Case 2 : 로그아웃

- my_page 에서 profile 탭으로 이동, SpeedDial 을 눌러, 로그아웃 진행
- 프로필을 등록하지 않아도, 로그아웃 가능 (프로필은 최초 1회 등록 필수)



### 로직

##### 시즌을 보여주는 방식

- 가입날짜로 해서 그 해의 4월 이전에 가입했으면 그 시즌을 포함해서 보여준다
- 끝나는 시즌은 별도의 setting document 에서 갖고 온다. 



### Micro Interactions

- Resort 페이지 이동 button 누를 때 
- Resort 리뷰 페이지 보일 때
  - 구현할 때, 참조한 곳 : https://samuelkraft.com/blog/page-transition-with-framer-motion







-------

### 



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

      

- 현재 device 가 Mobile 인지 Pc 인지 구분하는 방법
  - https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3



- fade-in, custom hook 만들기

  - https://shylog.com/react-custom-hooks-scroll-animation-fadein/

  - 로직

    1. FadeIn Animation을 구현한다.

    2. 특정 스크롤 시점에 Animation을 실행 시키도록 트리거 이벤트를 만든다.

    3. Animation 트리거 이벤트를 DOM에 지정한다.

- children 의 data를 parent 로 올리는 심플 모델
  - https://javascript.plainenglish.io/how-to-pass-props-from-child-to-parent-component-in-react-d90752ff4d01



- useContext 사용 하는 명확한 예제 코드
  - https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
