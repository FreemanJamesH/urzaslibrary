$(document).ready(function() {
  var storeCard;
  var switchCard;
  var lastPos;
  var deckData;
  var deckArray = [];
  var handArray = [];
  var tableObject = {};


  function tableGenerate() {
    for (var i = 0; i < 45; i++) {
      // console.log(tableObject['' + i + '']);
      if (tableObject['' + i + ''] === undefined) {
        $("div[data-index='" + i + "']").children().remove();
      } else {
        $("div[data-index='" + i + "']").html('<img class="tableTopImage" src="' + tableObject['' + i + ''][1].image_url + '">')
      }
    }
  }

  tableGenerate();

  // console.log(tableObject[1])

  deckShuffle(convertToArray(getDeckFromLocalStorage()))


  function convertToArray(deckObject) {
    deckArray = [];
    for (var key in deckObject) {
      for (var i = 0; i < deckObject[key][0]; i++)
        deckArray.push([deckObject[key][2], deckObject[key][1]])

    }
    return (deckArray);
  }


  var array = [1, 2, 3, 4, 5, 6, 7]

  function getDeckFromLocalStorage() {
    if (window.localStorage.deckData) {
      deckData = JSON.parse(window.localStorage.deckData);
    }
    return (deckData)
  }

  function deckShuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
  };


  $('#library').on('click', function() {
    handArray.push(deckArray[0]);
    deckArray.shift();
    turnHandArrayIntoHand();
  })




  $('.handCard').on('click', function() {
    var handPosition = $(this).attr('data-handPosition');
    storeCard = handArray[handPosition];
    handArray.splice(handPosition, 1);
  })

  // $('.cardSpace').click(function() {
  //   var cardSpaceIndex = $(this).attr('data-index');
  //   if (storeCard.length != 0) {
  //     if ($(this).html().length == 0) {
  //       tableObject['' + cardSpaceIndex + ''] = storeCard;
  //       storeCard = [];
  //       turnHandArrayIntoHand();
  //       tableGenerate();
  //     } else {
  //       switchCard = tableObject['' + cardSpaceIndex + ''];
  //       tableObject['' + cardSpaceIndex + ''] = storeCard;
  //       storeCard = [];
  //
  //     }
  //   } else if (tableObject['' + cardSpaceIndex + ''] != undefined) {
  //     // tableGenerate();
  //     storeCard = tableObject['' + cardSpaceIndex + ''];
  //     delete(tableObject['' + cardSpaceIndex + ''])
  //   }
  //   console.log(tableObject);
  // })

  $('.cardSpace').click(function() {
    var cardSpaceIndex = $(this).attr('data-index');
    console.log(storeCard)
    console.log(cardSpaceIndex);
    if (storeCard.length != 0) { // if you have a card stored //
      if ($(this).html().length != 0) { // and you're clicking on an occupied space //
        switchCard = tableObject['' + cardSpaceIndex + '']; // I want you save the card of the place you're clicking
        tableObject['' + lastPos + ''] = switchCard; // and I want you to put it where the last card you clicked
      };
      tableObject['' + cardSpaceIndex + ''] = storeCard; // then I want you to make the occupied space the stored card //
      storeCard = [];
      switchCard = [];
      tableGenerate();
    } else {
      lastPos = cardSpaceIndex;
      if (tableObject['' + cardSpaceIndex + ''] != undefined) {


        storeCard = tableObject['' + cardSpaceIndex + ''];
      };
      console.log(storeCard);
      delete(tableObject['' + cardSpaceIndex + ''])
    }
    turnHandArrayIntoHand();
  })


  function turnHandArrayIntoHand() {
    $('.handCard').children().remove();
    // console.log(handArray.length)
    for (var i = 0; i < handArray.length; i++) {
      ($('#' + '' + i + '')).html('<img src="' + handArray[i][1].image_url + '">')
    }
  }
});
