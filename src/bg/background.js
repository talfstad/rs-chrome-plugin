// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
    
//   	// chrome.pageAction.show(sender.tab.id);
//     // sendResponse();
//   });



chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);

    if(request.action === "saveContestInfo") {
      chrome.storage.local.set({sport: request.sport, startDate: request.startDate, draftGroupId: request.draftGroupId});
      sendResponse('success');
    }

    if(request.action === "getContestInfo"){
      var getSport = chrome.storage.local.get('sport', function(sportResult){
        var getStartDate = chrome.storage.local.get('startDate', function(startDateResult){
          sport = sportResult.sport;
          startDate = startDateResult.startDate;
          
          sendResponse({sport: sport, startDate: startDate});
        });
      });
    }
    return true;
  });