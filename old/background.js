// Responsible for channeling messages from devtools pane and content scripts
// Here is where the associations between them are made across tabs.

(function() {
  var portId, port;

  // A panel just tried to connect to the extension background
  chrome.runtime.onConnect.addListener(function(portContext) {

    port = portContext;

    function onMessage(message, sender, sendResponse) {
      switch (message.name) {
        case 'panel-init':
          portId = message.tabId;

          chrome.tabs.executeScript(message.tabId, {
            file: 'contentScript.js'
          });
          break;
        case 'fresh-page':
          // Tab's location had changed and the page confirmed that it was a refresh.
          // Start the content script.
          chrome.tabs.executeScript(message.tabId, {
            file: 'contentScript.js'
          });
          break;
      }
    }
    // We expect a `panel-init` message from it soon after the connection.
    port.onMessage.addListener(onMessage);
    // When a panel closes
    port.onDisconnect.addListener(function() {
      // Send a message to the content script do necessary clean-up
      chrome.tabs.sendMessage(tabId, {
        name: 'clean-up'
      });
    });


    chrome.devtools.network.onRequestFinished.addListener(
      function(request) {
        chrome.tabs.sendMessage(tabId, {
          name: 'request'
        });
        
        // if (request.response.bodySize > 40 * 1024) {
        // chrome.devtools.inspectedWindow.eval(
        //   'console.log("Large image: " + unescape("' +
        //   escape(request.request.url) + '"))');
        // // }
      });




  });






  // All the communcation
  // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  //   if (!port) {
  //     return;
  //   }
  //   switch (message.name) {
  //     case 'object-changed':
  //       // When an object changes
  //       port.postMessage({
  //         name: 'object-changed',
  //         changeList: message.changeList
  //       });
  //       break;
  //     case 'dom-mutation':
  //       // When a DOM mutation occurs
  //       port.postMessage({
  //         name: 'dom-mutation',
  //         changeList: message.changeList
  //       });
  //       break;
  //     case 'inspected-element-changed':
  //       // When element selection changes in the inspector
  //       port.postMessage({
  //         name: 'inspected-element-changed',
  //         key: message.key
  //       });
  //       break;
  //     case 'polymer-ready':
  //       // If `polymer-ready` happens after chrome.tabs detects page reload.
  //       port.postMessage({
  //         name: 'refresh'
  //       });
  //       break;
  //   }
  // });
})();
