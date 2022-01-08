# HTML5-study
2020.11~2022.02 3개월간 HTML5와 TS로 간단한 게임을 만들어보는 스터디입니다.

### 읽으면 도움이 되는 서적 목록
- [코어자바스크립트, 정재남, 위키북스](http://www.yes24.com/Product/Goods/78586788)
- [게임 프로그래밍 패턴, 로버트 나이스트롬, 한빛미디어](http://www.yes24.com/Product/Goods/27767709)

### 스터디에 등장하는 주요 개념
- 이벤트: 브라우저에서 어떠한 변화가 일어났을 때 발생하는 시그널(신호)
- 이벤트 리스너:  특정 이벤트 발생을 기다리고 있다가 이벤트가 발생하면 특정 처리를 하는 함수
- 콜백 함수: 코드가 특정 조건에 도달하면 호출하는 함수 (예시 - 터치 이벤트 콜백)

![image](https://user-images.githubusercontent.com/32667619/148628773-db011d39-15cf-4621-adf7-29b095bafa6a.png)
- 동기: 순차적, 직렬적으로 일을 수행하는 방식, 결과물을 받아야지만 다음 동작을 수행함
- 비동기: 병렬적으로 일을 수행하는 방식, 병렬적으로 일을 수행하기 위해서는 일반적으로 멀티스레드여야합니다. 그러나 자바스크립트는 싱글스레드이므로 비동기 관련 작업은 Web API에 이관합니다.
- promise: 콜백 함수의 일종으로, 작업이 끝난 후 실행할 함수나 메소드를 .then()으로 지정할 수 있습니다.
- async/await: promise를 보다 쉽고 짧게 구현하기 위한 문법입니다. 함수 이름 앞에 async를 붙여 사용하며, async가 붙은 함수는 무조건 promise를 반환합니다.
- 스코프: 식별자에 대한 유효범위
- 렉시컬 스코프: 함수를 어디서 선언하였는지에 따라 상위 스코프를 결정합니다. 예시로 화살표 함수의 경우 자기 자신의 this가 없으며, 대신(?) 선언부의 바로 상위 스코프의 this를 가집니다.

- 렌더링: 연산 결과를 화면의 픽셀로 그려주는 과정
- 드로우콜(Drwacall): CPU가 GPU에게 렌더링을 요청 하는 횟수, =연산 결과를 요청하는 횟수
- tick: 하나의 업데이트 동작이 소비하는 시간 단위
- FPS: 게임이 1초에 처리하는 프레임 수를 측정한 것, 60FPS 기준으로 약 16.6ms마다 한 프레임을 처리합니다.

### 이상한 자바스크립트
- 자바스크립트에서는 함수는 '값'입니다. 즉, 함수 = 값 = 객체입니다. `var a = function() {}`와 같이 변수에 함수를 바인딩 할 수 있습니다.
- ES5까지의 JS는 전역공간을 제외하면 오직 함수에 의해서만 스코프가 생성됩니다. ES6에서는 함수에 의해서 생성된 스코프와 블록{ }에 의해서 생성된 스코프가 있습니다.

### 이해하기 쉬운 생활코딩 강의
- [JavaScript - 실행과 실습 (2/3) : 브라우저 개발자 콘솔 사용법](https://www.youtube.com/watch?v=uWbCJGSeqlY&list=PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU&index=3)
- [JavaScript - 객체 (1/3) : 객체의 문법](https://www.youtube.com/watch?v=MiLELE_yskc&list=PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU&index=38)
- [JavaScript - 값으로서 함수와 콜백 (1/4) : 함수의 용도 1](https://www.youtube.com/watch?v=zGBkPTwydeg&list=PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU&index=61)
- [JavaScript - 값으로서 함수와 콜백 (2/4) : 함수의 용도 2](https://www.youtube.com/watch?v=1pqJphcounU&list=PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU&index=62)
- [JavaScript - 값으로서 함수와 콜백 (3/4) : 콜백](https://www.youtube.com/watch?v=R2AcG_SoCMk&list=PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU&index=63)
- [JavaScript - 값으로서 함수와 콜백 (4/4) : 비동기 콜백](https://www.youtube.com/watch?v=NDFjwybbong&list=PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU&index=64)
- [JavaScript 객체지향 프로그래밍 - 5. this](https://www.youtube.com/watch?v=-LWOv0PlcRA&list=PLuHgQVnccGMAMctarDlPyv6upFUUnpSO3&index=7)
