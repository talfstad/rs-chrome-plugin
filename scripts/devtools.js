// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
// chrome.devtools.panels.create("RS Inspect", null, "panel.html", function(panel) {});


var urls = [
  'github-cdn.com',
  'googleapis.io'
];

var endpoint2Id = [];
endpoint2Id['Open+Sans'] = '1f6c0823-6ffa-485f-b9ec-1b5df2ac267b'; //z6m
endpoint2Id['/ajax/libs/jquery/1.11.1/jquery.min.js'] = '1f6c0823-6ffa-485f-b9ec-1b5df2ac267b'; //z6m
endpoint2Id['Martel+Sans'] = 'a2ba5696-a37a-4d19-a266-96fd54517244'; //balling/adsinc
endpoint2Id['/ajax/libs/jquery/1.12.4/jquery.min.js'] = 'a2ba5696-a37a-4d19-a266-96fd54517244'; //balling/adsinc

var id2user = [];
id2user['1f6c0823-6ffa-485f-b9ec-1b5df2ac267b'] = 'z6m';
id2user['c2b85770-f441-11e4-8662-477cf5ce3783'] = 'z6m';
id2user['6be180a8-6486-4dbc-b815-3b67870e4751'] = 'z6m';
id2user['4374a526-d48c-4713-a368-d50d660e236e'] = 'z6m';
id2user['f63b804a-7399-4d04-8d2e-9cbaf0dba580'] = 'z6m';
id2user['9a0a7ef8-cae7-4429-a324-045b1c459e1c'] = 'z6m';
id2user['4773c68d-c6f6-475e-a3f4-167e40317761'] = 'z6m';
id2user['4f073ad4-3275-4ceb-a1f5-75993f3558b9'] = 'z6m';
id2user['7529475e-1877-4465-bbb0-a96647d70bb3'] = 'z6m';
id2user['48f5eeae-c7d2-4e11-99c9-d91e99e4b525'] = 'z6m';
id2user['234c0823-6ffa-485f-b9ec-1b5df2ac267b'] = 'z6m';
id2user['1f6c0823-6ffa-485f-b9ec-1b5df2ac267b'] = 'z6m';
id2user['ae468880-81d6-11e4-9921-5db8fb9116a2'] = 'z6m';
id2user['f63b804a-7399-4d04-8d2e-9cbaf0dba580'] = 'z6m';
id2user['4773c68d-c6f6-475e-a3f4-167e40317761'] = 'z6m';
id2user['4374a526-d48c-4713-a368-d50d660e236e'] = 'z6m';
id2user['9a0a7ef8-cae7-4429-a324-045b1c459e1c'] = 'z6m';
id2user['4f073ad4-3275-4ceb-a1f5-75993f3558b9'] = 'z6m';
id2user['c2b85770-f441-11e4-8662-477cf5ce3783'] = 'z6m';
id2user['7529475e-1877-4465-bbb0-a96647d70bb3'] = 'z6m';
id2user['1f6c0823-6ffa-485f-b9ec-1b5df2ac267b'] = 'z6m';
id2user['48f5eeae-c7d2-4e11-99c9-d91e99e4b525'] = 'z6m';
id2user['234c0823-6ffa-485f-b9ec-1b5df2ac267b'] = 'z6m';


id2user['a2ba5696-a37a-4d19-a266-96fd54517244'] = 'balling';
id2user['c46b3fb0-a619-4012-956a-c04315a1e6b0'] = 'balling';
id2user['b2a98da3-116b-47f2-be51-e0ba1309cd23'] = 'balling';
id2user['c09d093e-2ef8-4977-9a43-24a56a80f42f'] = 'balling';
id2user['bc692565-47da-4864-b93a-5cf2f40ed2cc'] = 'balling';
id2user['06113535-9ac2-45da-9f5e-c6b0eedab272'] = 'balling';
id2user['92c2a147-0eb2-4892-80d5-5108d7d12202'] = 'balling';
id2user['0bce77e9-c2dc-46f4-b2bb-b8e089588094'] = 'balling';
id2user['994caf17-fca5-47ad-917f-01ac1ac0e894'] = 'balling';
id2user['a493ab92-ca8d-4bfb-a3db-d1392299682b'] = 'balling';
id2user['39031c46-d3b6-4a6d-9036-84574c2ca891'] = 'balling';
id2user['dfc57128-ebc2-4ecf-8d09-a722d47ad86a'] = 'balling';
id2user['32b23aef-e078-417a-a538-b4b9b7d9b84a'] = 'balling';
id2user['b36d6b18-83b1-4b08-8298-1f965a6df50e'] = 'balling';
id2user['bfbfd80c-d06c-4b74-9471-e7b630b70bed'] = 'balling';
id2user['7a0e6382-a47f-43b8-a36a-da9adb34948e'] = 'balling';
id2user['d4797ff0-2946-455b-8a5b-83a248f782e1'] = 'balling';
id2user['d0554af2-dbfc-44b8-95ba-99e44b43decd'] = 'balling';
id2user['6224652f-8318-49b8-8152-119b7cda4c0e'] = 'balling';
id2user['97f4e171-baac-4ea8-8e3a-0f1e4735241b'] = 'balling';
id2user['7a5edad6-4083-4ba7-b166-babd625e7599'] = 'balling';
id2user['2a106187-0ae5-4f88-8786-d611443210e9'] = 'balling';
id2user['38f5eeae-c7d2-4e11-99c9-d91e99e4b519'] = 'balling';
id2user['f6f4f5e8-b70d-483a-be1a-4b57450fd7c8'] = 'balling';
id2user['1f0fe2ce-f694-4e77-88e5-74cd9b70bbb3'] = 'balling';
id2user['3fc5d444-c8a3-4e94-bd2f-29aa28db8d64'] = 'balling';
id2user['87b2a13a-298f-476f-ac48-c884f320185b'] = 'balling';
id2user['f82ac0b8-440f-48af-bb3f-42841e142910'] = 'balling';
id2user['0810a84e-0ee0-487e-be56-f74043e09aa8'] = 'balling';
id2user['93ab448e-c2fd-4b66-b5f9-acb5080c8e62'] = 'balling';
id2user['6715f941-bb13-43d6-8513-f58e3de322a4'] = 'balling';
id2user['3f7734e3-9759-4fab-a8ba-ca4c1743cb02'] = 'balling';
id2user['cd7ccb5a-3620-400d-8124-5f816f594441'] = 'balling';
id2user['275d3ff5-2c72-4448-8d50-6525629098c5'] = 'balling';
id2user['bdfb7dee-68c5-4f7c-aa45-ac76c7759b34'] = 'balling';
id2user['1684fb40-a828-426f-aab7-de85b8dd326d'] = 'balling';
id2user['a2ba5696-a37a-4d19-a266-96fd54517244'] = 'balling';


id2user['994caf17-fca5-47ad-917f-01ac1ac0e894'] = 'balling';
id2user['7a5edad6-4083-4ba7-b166-babd625e7599'] = 'balling';
id2user['f82ac0b8-440f-48af-bb3f-42841e142910'] = 'balling';
id2user['bdfb7dee-68c5-4f7c-aa45-ac76c7759b34'] = 'balling';
id2user['06113535-9ac2-45da-9f5e-c6b0eedab272'] = 'balling';
id2user['32b23aef-e078-417a-a538-b4b9b7d9b84a'] = 'balling';
id2user['6224652f-8318-49b8-8152-119b7cda4c0e'] = 'balling';
id2user['1f0fe2ce-f694-4e77-88e5-74cd9b70bbb3'] = 'balling';
id2user['cd7ccb5a-3620-400d-8124-5f816f594441'] = 'balling';
id2user['b2a98da3-116b-47f2-be51-e0ba1309cd23'] = 'balling';
id2user['a493ab92-ca8d-4bfb-a3db-d1392299682b'] = 'balling';
id2user['7a0e6382-a47f-43b8-a36a-da9adb34948e'] = 'balling';
id2user['38f5eeae-c7d2-4e11-99c9-d91e99e4b519'] = 'balling';
id2user['93ab448e-c2fd-4b66-b5f9-acb5080c8e62'] = 'balling';
id2user['0bce77e9-c2dc-46f4-b2bb-b8e089588094'] = 'balling';
id2user['bfbfd80c-d06c-4b74-9471-e7b630b70bed'] = 'balling';
id2user['97f4e171-baac-4ea8-8e3a-0f1e4735241b'] = 'balling';
id2user['87b2a13a-298f-476f-ac48-c884f320185b'] = 'balling';
id2user['275d3ff5-2c72-4448-8d50-6525629098c5'] = 'balling';
id2user['bc692565-47da-4864-b93a-5cf2f40ed2cc'] = 'balling';
id2user['dfc57128-ebc2-4ecf-8d09-a722d47ad86a'] = 'balling';
id2user['d0554af2-dbfc-44b8-95ba-99e44b43decd'] = 'balling';
id2user['f6f4f5e8-b70d-483a-be1a-4b57450fd7c8'] = 'balling';
id2user['3f7734e3-9759-4fab-a8ba-ca4c1743cb02'] = 'balling';
id2user['c46b3fb0-a619-4012-956a-c04315a1e6b0'] = 'balling';
id2user['2a106187-0ae5-4f88-8786-d611443210e9'] = 'balling';
id2user['0810a84e-0ee0-487e-be56-f74043e09aa8'] = 'balling';
id2user['1684fb40-a828-426f-aab7-de85b8dd326d'] = 'balling';
id2user['92c2a147-0eb2-4892-80d5-5108d7d12202'] = 'balling';
id2user['b36d6b18-83b1-4b08-8298-1f965a6df50e'] = 'balling';
id2user['3fc5d444-c8a3-4e94-bd2f-29aa28db8d64'] = 'balling';
id2user['c09d093e-2ef8-4977-9a43-24a56a80f42f'] = 'balling';
id2user['39031c46-d3b6-4a6d-9036-84574c2ca891'] = 'balling';
id2user['d4797ff0-2946-455b-8a5b-83a248f782e1'] = 'balling';
id2user['6715f941-bb13-43d6-8513-f58e3de322a4'] = 'balling';


var endpoints = [
  'Open+Sans', //z6m
  'Martel+Sans', //balling/adsinc
  '/ajax/libs/jquery/1.11.1/jquery.min.js', //z6m
  '/ajax/libs/jquery/1.12.4/jquery.min.js' //balling/adsinc
];



chrome.devtools.network.onRequestFinished.addListener(
  function(request) {
    var url = request.request.url;
    var isActive = false;

    // if the request url contains the any of our cj endpoints then we have the cj installed
    for (var i = 0; i < urls.length; i++) {
      if (url.includes(urls[i]) && request.request.method != "OPTIONS") {
        isActive = true;
      }
    }

    if (isActive) {
      //get the endpoint we're using
      var endpoint = false;
      for (var i = 0; i < endpoints.length; i++) {
        if (request.request.url.includes(endpoints[i])) {
          endpoint = endpoints[i];
        }
      }

      var user = false;

      if (endpoint) {
        //map to id
        var id = endpoint2Id[endpoint];
        user = id2user[id];
      } else {
        //get the id from the request and map to user
        if (request.request.method == "POST") {
          var text = JSON.parse(request.request.postData.text);
          var id = text.version;
          user = id2user[id] || "...";
        } else if (request.request.method == "GET") {
          var headers = request.request.headers;
          for (var i = 0; i < headers.length; i++) {
            if (headers[i].name == "X-Alt-Referer") {
              var id = headers[i].value.substr(headers[i].value.length - 36);
              user = id2user[id] || "...";
            }
          }
        }

      }


      chrome.devtools.inspectedWindow.eval('console.log("%cRS ACTIVE: " + unescape("' + escape(user) + '") + " - " + unescape("' + escape(request.request.url) + '"), "background-color: #00ff00")');
    }
  });
