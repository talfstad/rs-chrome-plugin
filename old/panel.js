(function() {

  var initBackgroundMessaging = function() {
    var backgroundPageConnection = chrome.runtime.connect({
    });

    backgroundPageConnection.onMessage.addListener(function(message, sender, sendResponse) {
      switch (message.name) {
        case 'request':
        console.log("got request")
          break;
      }
    });
  };

  /**
   * Called when panel is opened or page is refreshed.
   */
  var init = function() {
    initBackgroundMessaging();



  }

  init();




  // Send a message to background page so that the background page can associate panel
  // to the current host page
  // backgroundPageConnection.postMessage({
  //   name: 'panel-init',
  //   tabId: chrome.devtools.inspectedWindow.tabId
  // });




})();
