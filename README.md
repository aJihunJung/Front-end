# Front-end

#### Node.js 설치

* [Node.js](https://nodejs.org/) 링크에 가서 받아서 설치하거나 아래의 방법을 추천
  * 버전 업데이트가 많은 노드를 쉽게 업데이트 할 수 있기 때문

  1\. 원하는 [release 버전](https://github.com/joyent/node/releases) 을 찾음<br>
  2\. git으로 브랜치 변경해서 설치

  ```nohighlight
  $ git clone https://github.com/joyent/node
  $ cd node
  $ git checkout v0.12.7-release
  $ ./configure
  $ make
  $ sudo make install
  ```

* 모든 브랜치 확인

  ```nohighlight
  $ git branch -a
  ```

* 리모트 서버와 동기화

  ```nohighlight
  $ git fetch
  ```

---

#### npm

* 의존성 라이브러리 관리자

* package.json 파일 생성

  ```nohighlight
  $ npm init
  ```

* 모듈 설치

  ```nohighlight
  $ npm install [모듈이름] [--save-dev | -save-dev]
  ```

* 모듈 삭제

  ```nohighlight
  $ npm uninstall [모듈이름]
  ```

* package.json 파일의 dependencies에 항목들을 설치

  ```nohighlight
  $ npm install
  ```

---

#### bower

* 트위터에서 만든 프론트엔드용 패키지 매니저

* bower 설치

  ```nohighlight
  $ sudo npm install -g bower
  ```

* bower.json 파일 생성

  ```nohighlight
  $ bower init
  ```

  ```nohighlight
  {
    "name": "CommonProject",
    "version": "0.0.0",
    "authors": [
      "flslg85 <flslg85@gmail.com>"
    ],
    "moduleType": [
      "amd"
    ],
    "license": "MIT",
    "ignore": [
      "**/.*",
      "node_modules",
      "bower_components",
      "test",
      "tests"
    ]
  }
  ```

* bower 설치

  ```nohighlight
  $ bower install [패키지] [--save-dev | -save-dev]
  ```

* bower 설치 목록 확인

  ```nohighlight
  $ bower list
  ```

* bower 패키지 검색

  ```nohighlight
  $ bower lookup soundmanager2
  ```

* bower 패키지의 버전 정보

  ```nohighlight
  $ bower info jquery
  ```

* .bowerrc
  * bower에 적용할 설정

    ```nohighlight
    {
      "directory" : "../src/main/webapp/WEB-INF/assets/bower_components"
    }
    ```

  * directory : 컴포넌트를 설치할 기본 디렉토리
  * endpoint: 커스텀 등록 엔드포인트
  * json: 의존성을 처리할 때 사용할 기본 JSON 파일
  * searchpath: 추가적으로 검색할 읽기전용 Bower 저장소
  * shorthand_resolver: 간단하게 지정할 패키지명의 템플릿

---

#### Grunt

* Grunt 설치

  ```nohighlight
  $ sudo npm install -g grunt-cli
  ```

* Gruntfile.js 생성

  ```nohighlight
  - myproject/
  -- Gruntfile.js
  -- grunt/
  --- aliases.yaml
  --- concat.js
  --- uglify.js
  --- clean.js
  ```

  ```nohighlight
  // Gruntfile.js
  module.exports = function(grunt) {
    // 각 태스크가 얼마나 시간을 사용하는지 측정합니다.
    require('time-grunt')(grunt);

    // Grunt 설정을 로딩합니다.
    require('load-grunt-config')(grunt);
  };
  ```

  ```nohighlight
  // concat.js
  module.exports = {
    dist: {
      src: ['src/js/jquery.js', 'src/js/intro.js', 'src/js/main.js', 'src/js/outro.js'],
      dest: 'dist/build.js',
    }
  };
  ```

  ```nohighlight
  // uglify.js
  module.exports = {
    dist: {
      files: {
        'dist/build.min.js': ['dist/build.js']
      }
    }
  };
  ```

  ```nohighlight
  // clean.js
  module.exports = {
    dist: 'dist'
  };
  ```

  ```nohighlight
  // aliases.yaml
  default:
    - 'clean'
    - 'concat'
    - 'uglify'
  ```

* Grunt 모듈 설치

  ```nohighlight
  $ npm install --save-dev load-grunt-config grunt-contrib-concat grunt-contrib-uglify runt-contrib-clean time-grunt
  ```

* Grunt 사용<br>
  task 를 지정해주지 않으면 default가 실행됨

  ```nohighlight
  $ grunt [task]
  ```

---

#### karma

* 자바스크립트 테스트 러너
* 유닛 테스트용 프레임워크가 아닌 작성한 테스트를 실행해 주는 역할

* karma 설치

  ```nohighlight
  $ sudo npm install -g karma
  ```

* karma.conf.js 생성

  ```nohighlight
  $ karma init
  ```

* grunt 에서 karma 사용

  ```nohighlight
  $ npm install --save-dev karma grunt-karma karma-chrome-launcher
  ```

---

#### jasmine

* 유닛 테스트 프레임워크

* jasmine 설치

  ```nohighlight
  $ npm install --save-dev jasmine karma-jasmine karma-jasmine-jquery
  ```
