## include janux

```html
<script type="text/javascript" src="janus.js" ></script>
```

---

## Janus.init

* #### init 동작
  * debug 속성 값에 따라 console 설정
  * adapter.js, jquery.min.js 필요 자바스크립트 로드
  * 설정 완료후 callback으로 넘겨진 함수를 실행

* #### 속성
  * debug : 자바스크립트 콘솔에 디버그 메시지 출력
  * callback : 초기화가 끝난 후에 실행되어야 할 함수

* #### 사용법
  
  ```javascript
  Janus.init({
     debug: true,
     callback: function() {
             // Done!
     });
  ```

* #### adapter.js
  * webkit, firefox 인지를 판단하여 사용해야 할 webrtc 함수를 호출하도록 만든 자바스크립트


* #### callback() 함수
  * mcu test 페이지에서는 callback() 함수 구현은 start를 클릭하면 실행되는 함수를 정의해둠
  * 실행 되는 함수는 webrtc를 지원하는지는 확인
  * Janus 생성자 함수를 사용해 객체를 생성
  
---

## Janus() 생성자 함수

* #### 함수 동작
  * 인자로 넘겨지는 객체에 success, error, destroyed, server 등의 속성 값을 설정
  * createSession 함수에 인자로 넘겨지는 객체를 넘겨 세션을 생성함
  * 생성되는 객체에 getServer, isConnected 등의 함수를 설정함
  * 생성된 객체를 리턴함

* #### 속성
  * 서버
    * server: 세션을 설정하기 위한 함수를 설정
      * 웹소켓 : ws://yourserver:8188/
      * HTTP : http://yourserver:8088/janus
    * iceServers: STUN/TURN 서버의 리스트를 넣음, 아무값도 넣지 않으면 기본 설정으로 되어 있는 서버를 사용

  * 이벤트가 발생하면 호출되는 함수를 설정
    * success: 세션 생성이 성공하면 호출되고 사용할수 있는 준비된 상태가 됨
    * error: 세션 생성이 실패되면 호출
    * destroyed: 세션이 파괴되면 호출


* #### 사용 예제

  ```javascript
  var janus = new Janus({
    server: 'http://yourserver:8088/janus', 
    success: function() {
      // Done! attach to plugin XYZ
    },
    error: function(cause) {
      // Error, can't go on...
    },
    destroyed: function() {
      // I should get rid of this
    }
  });
  ```

  ```javascript
  var janus = new Janus({
    server: ['ws://yourserver:8188/','http://yourserver:8088/janus'],
    ...
  });
  ```

* #### janus로 생성된 객체
  * getServer(): gateway 주소를 리턴
  * isConnected(): janus 인스턴스가 gateway에 연결되어 있으면 true를 리턴 
  * getSessionId(): gateway 세션 아이디를 리턴함
  * attach(parameters): plugin을 세션에 붙임, handle을 생성함
    * janus 생성자 함수 내부의 **createHandle** 함수가 호출됨
  * destroy(parameters): gateway에 세션이 파괴되면 호출됨. 모든 handle이 close되면 호출
    * janus 생성자 함수 내부의 **destroySession** 함수가 호출됨
  * 사용 예제

    ```javascript
    var janus = new Janus({
      server: ['ws://yourserver:8188/','http://yourserver:8088/janus'],
      ...
    });
    
    janus.getServer();
    
    janus.attach({
    });
    ```

* #### createSession() 함수
  * 12자리의 랜덤한 string을 생성
  * 서버가 http인지 ws인지를 판단해서 연결을 시도
  * 실패하면 인자로 들어온 server를 하나하나 시도한다.
  * 서버에 연결이 되면 { "janus": "create", "transaction": transaction }를 서버로 보낸다.
  * 서버에서 성공했다는 응답을 받으면 keepAlive(웹소켓이 아닌경우)를 호출해서 연결이 끊어지지 않도록 한다.
  * 또한 Janus 생성자 함수의 success()를 호출한다.

---

## Janus.attach 함수 호출

* #### 속성
  * plugin: janus 서버에 구현되어 있는 플러그인

  * success: handle이 성공적으로 만들어지면 호출됨, 사용할수있는 준비가 됨
  * error: handle이 성공적으로 만들어지지 않으면 호출
  * consentDialog: 
  * onmessage: plugin을 통해서 메시지를 받으면 호출됨
  * onlocalstream: local MediaStream이 준비가 완료되어 사용 가능하면 호출
  * onremotestream: remote media stream이 준비가 완료되어 사용 가능하면 호출
  * ondataopen: Data Channel이 사용가능하면 호출
  * ondata: Data Channel을 통해 데이터를 받으면 호출
  * oncleanup: plugin에 WebRTC PeerConnection이 close되면 호출
  * detached:

* #### 사용 예제

  ```javascript
  janus.attach({
    plugin: "janus.plugin.echotest",
    success: function(pluginHandle) {
      // Plugin attached! 'pluginHandle' is our handle
    },
    error: function(cause) {
      // Couldn't attach to the plugin
    },
    consentDialog: function(on) {
      // e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
    },
    onmessage: function(msg, jsep) {
      // We got a message/event (msg) from the plugin
      // If jsep is not null, this involves a WebRTC negotiation
    },
    onlocalstream: function(stream) {
      // We have a local stream (getUserMedia worked!) to display
    },
    onremotestream: function(stream) {
      // We have a remote stream (working PeerConnection!) to display
    },
    oncleanup: function() {
      // PeerConnection with the plugin closed, clean the UI
      // The plugin handle is still valid so we can create a new one
    },
    detached: function() {
      // Connection with the plugin closed, get rid of its features
      // The plugin handle is not valid anymore
    }
  });
  ```

* #### createHandle 동작
  * 인자로 넘어온 객체를 설정
  * { "janus": "attach", "plugin": plugin, "transaction": transaction } 를 서버로 전송
  * 서버에 응답이 success가 아니면 attach로 넘긴 객체의 error를 호출
  * 서버에 응답이 success이면 서버로부터 받은 handleId를 가지고 pluginHandle 객체를 생성하고 pluginHandles에 저장한다.
  * janus.attach의 success를 호출하고 인자로 생성된 pluginHandle 객체를 넘겨준다.

---

## pluginHandle 객체

* #### pluginHandle 객체
  * mcutest 예제에서는 pluginHandle 객체는 mcutest이다.

  ```javascript
  var pluginHandle = {
    session : that,
    plugin : plugin,
    id : handleId,
    webrtcStuff : {
      started : false,
      myStream : null,
      remoteStream : null,
      mySdp : null,
      pc : null,
      dataChannel : null,
      dtmfSender : null,
      trickle : true,
      iceDone : false,
      sdpSent : false,
      volume : {
        value : null,
        timer : null
      },
      bitrate : {
        value : null,
        bsnow : null,
        bsbefore : null,
        tsnow : null,
        tsbefore : null,
        timer : null
      }
    },
    getId : function() { return handleId; },
    getPlugin : function() { return plugin; },
    getVolume : function() { return getVolume(handleId); },
    getBitrate : function() { return getBitrate(handleId); },
    send : function(callbacks) { sendMessage(handleId, callbacks); }, // 일반 message를 보낼 때 사용
    data : function(callbacks) { sendData(handleId, callbacks); },  // data channel로 보낼 때 사용
    dtmf : function(callbacks) { sendDtmf(handleId, callbacks); },
    consentDialog : callbacks.consentDialog,
    onmessage : callbacks.onmessage,
    createOffer : function(callbacks) { prepareWebrtc(handleId, callbacks); },
    createAnswer : function(callbacks) { prepareWebrtc(handleId, callbacks); },
    handleRemoteJsep : function(callbacks) { prepareWebrtcPeer(handleId, callbacks); },
    onlocalstream : callbacks.onlocalstream,
    onremotestream : callbacks.onremotestream,
    ondata : callbacks.ondata,
    ondataopen : callbacks.ondataopen,
    oncleanup : callbacks.oncleanup,
    ondetached : callbacks.ondetached,
    hangup : function() { cleanupWebrtc(handleId); },
    detach : function(callbacks) { destroyHandle(handleId, callbacks); },
  };
  ```

* #### createOffer 함수
  * 사용 예제
  
  ```javascript
  mcutest.createOffer({
    media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true, data:true },	// Publishers are sendonly
    success: function(jsep) {
      console.log("Got publisher SDP!");
      console.log(jsep);
      var publish = { "request": "configure", "audio": useAudio, "video": true };
      mcutest.send({"message": publish, "jsep": jsep});
    },
    error: function(error) {
      console.log("WebRTC error:");
      console.log(error);
      if (useAudio) {
         publishOwnFeed(false);
      } else {
        bootbox.alert("WebRTC error... " + JSON.stringify(error));
        $('#publish').removeAttr('disabled').click(function() { publishOwnFeed(true); });
      }
    }
  });
  ```
  
* #### media 객체
  * audioSend: true/false (do or do not send audio);
  * audioRecv: true/false (do or do not receive audio);
  * audio: true/false (do or do not send and receive audio, takes precedence on the above);
  * videoSend: true/false (do or do not send video);
  * videoRecv: true/false (do or do not receive video);
  * video: true/false (do or do not send and receive video, takes precedence on the above);
  * video: "lowres"/"lowres-16:9"/"stdres"/"stdres-16:9"/"hires"/"hires-16:9"
    * send a 320x240/320x180/640x480/640x360/1280x720 video 
    * takes precedence on the above
    * default is "stdres"
  * video: "screen" (use screensharing for video, disables audio, takes precedence on both audio and video);
  * data: true/false (do or do not use Data Channels, default is false)




---

## 참조

* [janus JS API](http://janus.conf.meetecho.com/docs/JS.html)