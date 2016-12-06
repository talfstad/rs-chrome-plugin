//tooltip for the popup
$('.info a').tooltip({trigger: 'manual'});
$('.info a').click(function(){
  $(this).tooltip('toggle');
});
$('.info a').focusout(function(){
  $(this).tooltip('hide');

});

$('#import-lineup').prop('disabled', true);

$(".input-append a.upload-csv").click(function(e){
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {action: "upload"}, function(response) {
  //     console.log('sent upload message to inject');
  //   });
  // });

  $('#csv').click();
});

$("#subfile").attr("readOnly", true);

// This is the simple bit of jquery to duplicate the hidden field to subfile
$('#csv').change(function(){
  var currentVal = $(this).val();
  var newVal = currentVal.replace("C:\\fakepath\\", "");
  
  $('#subfile').val(newVal);

  $('#import-lineup').prop('disabled', false);
}); 

// This bit of jquery will show the actual file input box
$('#showHidden').click(function(){
  $('#csv').css('visibilty','visible');
});




Number.prototype.pad = function (len) {
    return this.toString().pad(len);
};

String.prototype.pad = function (len) {
    var val = String(this);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
};

Date.prototype.formatHMS = function() {
    var dt = this.getTime() / 1000;
    var hours = Math.floor(dt / 3600).pad();
    var minutes = Math.floor((dt % 3600) / 60).pad();
    var seconds = Math.floor((dt % 60)).pad();
    return hours + ':' + minutes + ':' + seconds;
};



$("#import-lineup").click(function(e){
  var fileInput = $("#csv");

  var formatCsvForDK = function(arr){
    var allLineups = [];
    var lineupArr = [];
    var headers = arr[0];
    for(var i=1 ; i<arr.length ;i++){
      
      var player = {};
      var lineupDone = false;
      for(var j=0 ; j<arr[i].length ; j++){
        //if detect empty start new lineup
        if(arr[i][j] === ""){
          lineupDone = true;
          break;

        } else if(j === arr[i].length-1 && i === arr.length-1){
          lineupDone = true;
        }

        //add player to lineup
        player[headers[j].toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '')] = arr[i][j];
      }
      if(!$.isEmptyObject(player)) {
        lineupArr.push(player);
      }

      if(lineupDone && lineupArr.length > 0) {
        allLineups.push(lineupArr);
        lineupArr = [];
      }
    }
    return allLineups;
  };

   function CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return formatCsvForDK(arrData);
    }

  var readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {
      var csvData = reader.result;
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "import", csvData: CSVToArray(csvData)}, function(response) {
          console.log('sent csv data to dk');
        });
      });
    };
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput[0].files[0]);
  };

  readFile();
  


});
  var getPlayers = function(draftGroupId){
    var defer = $.Deferred();
    $.get("https://www.draftkings.com/lineup/getavailableplayers?draftGroupId=" + draftGroupId, function(data){
      defer.resolve(data);
    });
    return defer;
  };

  var sport = "", startDate = "", draftGroupId = "";
  var getSport = chrome.storage.local.get('sport', function(sportResult){
    var getStartDate = chrome.storage.local.get('startDate', function(startDateResult){
      var getStartDate = chrome.storage.local.get('draftGroupId', function(draftGroupIdResult){
        sport = sportResult.sport;
        startDate = startDateResult.startDate;
        draftGroupId = draftGroupIdResult.draftGroupId;
        console.log("sport: " + sport + " startdate: " + startDate, " draftGroupId:" + draftGroupId);

        var strTimeToStart = "";
        if(sport && startDate) {
          //add it to the gui

          $("#sport").text(sport);
          var src="images/icon-" + sport.toLowerCase() + ".png";
          $("#sport-icon").attr("src", src);

          var contestStartTime = moment(startDate).valueOf();
          var currentTime = moment().valueOf();
          var timeToStart = new Date(contestStartTime - currentTime);

          
          if (contestStartTime < 0)
            strTimeToStart = 'LIVE!';
          else if (contestStartTime < 86400000)
              strTimeToStart = (timeToStart < 0 ? '00:00:00' : timeToStart.formatHMS());
          else if (contestStartTime < 604800000)
              strTimeToStart = moment(contestStartTime).format('ddd h:mma');
          else
              strTimeToStart = moment(contestStartTime).format('M/D h:mma');



          $("#start-date").text(strTimeToStart);

          $("#setup-container").css("display","block");
        
        }

        var getPlayersForDraft = getPlayers(draftGroupId);
        $.when(getPlayersForDraft).done(function(data){
          var csvData = " ID, Name, Position\r\n";
          $.each(data.playerList, function(idx, row){
            var name = row.fn + " " + row.ln;
            var id = row.pid;
            var pos = row.pn;
            if(!row.IsDisabledFromDrafting){
              //add the name to the list
              if(id && name && pos) {
                csvData += id + "," + name + "," + pos + "\r\n";
              }
            }
          });

          $("#download-players").click(function(e){
            console.log("csvData: " + csvData);
            var blob = new Blob([csvData], {type: "text/csv"});
            saveAs(blob, "DK_Players_" + sport);
          });

        });
        
       
      });
    });
  });

   
