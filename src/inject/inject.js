
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  var doneAlready = false;
  var sport = "";
  var startDate = "";
  var draftGroupId = "";
  var addedPlayersYet = false;
  if (request.action === "import") {
    var lineups = request.csvData;
        
    if(lineups.length > 0){

      $(".create-new")[0].click();
      var i=0;
      var createLineupInterval = setInterval(function() {
        //GET SPORT
        chrome.runtime.sendMessage({action: "getContestInfo"}, function(response) {
          if($(".choose-sport > p > label:contains('"+ response.sport +"')").length > 0) {
            // clearInterval(createLineupInterval);
            $(".choose-sport > p > label:contains('"+ response.sport +"')")[0].click();
            
            var chooseSportLoadedInterval = setInterval(function() {
              if(i+1 === lineups.length) {
                clearInterval(chooseSportLoadedInterval);
              }
              if($(".choose-start-date > p > label > input[data-start-date='"+ response.startDate +"'").length > 0) {
                clearInterval(chooseSportLoadedInterval);
                
                $(".choose-start-date > p > label > input[data-start-date='"+ response.startDate +"'")[0].click();
                
                var chooseDateInterval = setInterval(function() {
                  if(i+1 === lineups.length) {
                    clearInterval(chooseDateInterval);
                  }
                  if($(".continue").length > 0) {
                    if($(".continue").css("display") !== "none"){
                      clearInterval(chooseDateInterval);
                      $(".continue")[0].click(); 
                      var selectAllTabInterval = setInterval(function(){
                        if(i+1 === lineups.length) {
                          clearInterval(selectAllTabInterval);
                        }
                        if($(".available-players > .tabs > ul > li").length > 0){
                          clearInterval(selectAllTabInterval);
                          if(!addedPlayersYet) {
                            //add the player
                            for(var j=0 ; j<lineups[i].length ; j++) {
                              //add the player to the lineup
                              var firstElem = $("a.swap:first");
                              firstElem.attr("data-pid",lineups[i][j].id);
                              firstElem[0].click();
                            }

                            //save the lineup here
                            $(".create-lineup-card")[0].click();
                            addedPlayersYet = true;
                          }
                          var addLineupInterval = setInterval(function(){
                            if(i+1 === lineups.length) {
                              clearInterval(addLineupInterval);
                            }
                            if($(".new-lineup-panel").length <= 0){
                              clearInterval(addLineupInterval);
                              
                              if(i+1 < lineups.length) {
                                i++;
                                $(".create-new")[0].click();
                                addedPlayersYet = false;
                              } else {
                                if(!doneAlready) {
                                  doneAlready = true;
                                  //done uploading all lineups
                                  $.growl.notice({ title: "Lineup Import Finished",message: "Successfully Imported " + lineups.length + " Lineups" });
                                  clearInterval(createLineupInterval);
                                }
                              }
                            }
                          }, 100);
                        }
                      }, 100);
                    }
                  }
                }, 100);                       
              }
            }, 100);
          }
        });
              
      }, 100); 
    }
  }
});


$(function(){
  $(".create-new").click(function(a){
    var sportAndStartDateSent = false; //for some reason this click fires like 4 times. DK is poorly coded lmfao

    var createLineupInterval = setInterval(function() {
      if($(".choose-sport > p").html() !== "Loading, please wait...") {
        clearInterval(createLineupInterval);
        $(".choose-sport > p > label").click(function(b){
          
          var chooseSportLoadedInterval = setInterval(function() {
            if($(".choose-start-date p").html() !== "") {
              clearInterval(chooseSportLoadedInterval);
              $(".choose-start-date > p > label").click(function(c){
                
                var chooseDateInterval = setInterval(function() {
                  if($(".continue").css("display") !== "none"){
                    clearInterval(chooseDateInterval);
                    $(".continue").click(function(d){
                      
                      var getDraftIdInterval = setInterval(function(){
                        if($(".export-to-csv").length > 0) {
                          clearInterval(getDraftIdInterval);
                          //get the sports and time that these lineups are for
                          if(!sportAndStartDateSent){
                            sportAndStartDateSent = true;

                            sport = $(".choose-sport input:checked").parent().text();
                            startDate = $(".choose-start-date input:checked").attr("data-start-date");
                            draftGroupId = $(".export-to-csv").attr("href").split("draftGroupId=")[1];
                            console.log("Sport: " + sport + "\nStart Date: " + startDate);

                            //sending setup information to the popup date/time
                            chrome.runtime.sendMessage({action: "saveContestInfo", sport: sport, startDate: startDate, draftGroupId: draftGroupId}, function(response) {
                              console.log("sport and date selected: " + response);
                            });

                          }
                        }
                      
                      }, 10);
                    });
                  }
                
                }, 10);
              });
            }
          }, 10);
        });
      }
    }, 10);
  });
});

//this is to make sure the background script is ran at init
chrome.extension.sendMessage({}, function(response) {
});