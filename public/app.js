$(document).ready(function() {

  $('#save').on('click', function(){
    confirm('Proceed to arena with current deck?');
    addToLocalStorage();
  })


  var deck = {};
  var pageCount = 0;
  var resultsMax = 5;
  var startPosition = 0;
  var name;
  var greenSearch = "";
  var redSearch = "";
  var blueSearch = "";
  var whiteSearch = "";
  var blackSearch = "";
  var commonSearch = "";
  var uncommonSearch = "";
  var rareSearch = "";
  var mythicalSearch = "";
  var subtype = "";
  var type = "";


  function updateViewer(){
    $('#testBox').children().remove();
    for (var key in deck) {
      $('#testBox').append('<div><div class="deckViewerList" data-name="'+deck[key][2]+'" >' + key + ' x ' + deck[key][0] + '</div><div id="remove">Remove</div></div>')
    };
  }

  $('.mana').on('click', function(){
    var currentColor = $(this).children('path').attr('fill');
    var fillColor = $(this).children('path').attr('data-iconColor')
    if (currentColor == '#0D0F0F'){
      console.log(fillColor)
    $(this).find('path').attr('fill', fillColor);
  } else {
    $(this).find('path').attr('fill', '#0D0F0F');
  }
  });



  $('#name').on('keyup', function() {
    $('.imageHolder.one').children().remove();
    name = ('name=' + $('#name').val());
    // console.log('https://api.deckbrew.com/mtg/cards?' + name + greenSearch + redSearch + blueSearch + whiteSearch + blackSearch + commonSearch + uncommonSearch + rareSearch + mythicalSearch + subtype + type + '&page=' + pageCount)

    ajaxFunc();
  });

  $('.navButton').on('click', function(event) {
    var adder = ((+resultsMax) - startPosition)
    if ($(this).attr('id') == 'next') {
      if ((numberResults < ((+resultsMax) + ((+resultsMax) - startPosition))) && numberResults != 100) {
        resultsMax = numberResults;
      } else {
        resultsMax = ((+resultsMax) + ((+resultsMax) - startPosition));
        startPosition += adder;
      }
    } else {
      resultsMax = ((+resultsMax) - ((+resultsMax) - startPosition));
      startPosition -= adder;
    };

    if (startPosition > 99) {
      pageCount++;
      startPosition = 0;
      resultsMax = adder;
    }
    if (startPosition < 0) {
      if (pageCount == 0) {
        pageCount = 0;
        startPosition = 0;
        resultsMax = adder;
      } else {
        pageCount--
        startPosition = (100 - adder);
        resultsMax = 100;
      }
    }
    // console.log(startPosition)
    event.preventDefault();
    $('.imageHolder.one').children().remove();
    ajaxFunc();
  });

  // $('.mana').on('mouseenter', function(){
  //   $(this).css({
  //     'width': '+=4px',
  //     'height': '+=6px',
  //     'margin-right': '-=1px',
  //     'margin-bottom': '-=3px',
  //     'margin-left': '-=3px',
  //     'margin-top': '-=3px',
  //   });
  //
  //   console.log('SVG Enter')
  // })
  //
  //
  // $('.mana').on('mouseleave', function(){
  //   $(this).css({
  //     'width': '-=4px',
  //     'height': '-=6px',
  //     'margin-right': '+=1px',
  //     'margin-bottom': '+=3px',
  //     'margin-left': '+=3px',
  //     'margin-top': '+=3px',
  //   });
  //
  //   console.log('SVG Leave')
  // })

  $('.mana').on('click', function(e) {
    $('.imageHolder.one').children().remove();
    var currentClass = $(this).attr('class');
    console.log(currentClass);
    var text = ('mana ' + $(this).attr('data-color'));
    if (currentClass == text) {
      $(this).removeClass().addClass('' + currentClass + 'Click');
    } else {
      $(this).removeClass().addClass(text);
    };
    switch (currentClass) {
      case "mana GreenClick":
        greenSearch = "";
        break;
      case "mana RedClick":
        redSearch = "";
        break;
      case "mana BlueClick":
        blueSearch = "";
        break;
      case "mana BlackClick":
        blackSearch = "";
        break;
      case "mana WhiteClick":
        whiteSearch = "";
        break;
      case "mana Black":
        blackSearch = "&color=black";
        break;
      case "mana Green":
        greenSearch = "&color=green";
        break;
      case "mana Red":
        redSearch = "&color=red";
        break;
      case "mana White":
        whiteSearch = "&color=white";
        break;
      case "mana Blue":
        blueSearch = "&color=blue";
        break;
      case "CommonClick":
        commonSearch = "";
        break;
      case "UncommonClick":
        uncommonSearch = "";
        break;
      case "RareClick":
        rareSearch = "";
        break;
      case "MythicalClick":
        mythicalSearch = "";
        break;
      case "Common":
        commonSearch = "&rarity=common";
        break;
      case "Uncommon":
        uncommonSearch = "&rarity=uncommon";
        break;
      case "Rare":
        rareSearch = "&rarity=rare";
        break;
      case "Mythical":
        mythicalSearch = "&rarity=mythical";
        break;
    }
    console.log('https://api.deckbrew.com/mtg/cards?' + name + greenSearch + redSearch + blueSearch + whiteSearch + blackSearch + commonSearch + uncommonSearch + rareSearch + mythicalSearch + subtype + type + '&page=' + pageCount)
    e.preventDefault();
    ajaxFunc();
  });

  $('select').not('.resultsCount').on('change', function() {
    resultsMax = ($('.resultsCount > option:selected').val());
    $('.imageHolder.one').children().remove();
    if ($('.subtypes > option:selected').val() == '-Select One-') {
      subtype = "";
    } else {
      subtype = ('&subtype=' + $('.subtypes > option:selected').val()).toLowerCase();
    }
    if ($('.types > option:selected').val() == '-Select One-') {
      type = "";
    } else {
      type = ('&type=' + $('.types > option:selected').val()).toLowerCase();
    };

    pageCount = 0;
    startPosition = 0;
    // console.log('running function')
    ajaxFunc();
  })

  $('.resultsCount').on('change', function() {
    $('.imageHolder.one').children().remove();
    resultsMax = ($('.resultsCount > option:selected').val());
    while (startPosition % ($('.resultsCount > option:selected').val()) != 0) {
      startPosition--
    };
    // console.log('yuuuur')

    ajaxFunc();


  })


  var storeResponse;

  function ajaxFunc() {


    $.ajax({


      url: ('https://api.deckbrew.com/mtg/cards?' + name + greenSearch + redSearch + blueSearch + whiteSearch + blackSearch + commonSearch + uncommonSearch + rareSearch + mythicalSearch + subtype + type + '&page=' + pageCount),
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        storeResponse = response;
        // console.log('ajax is running')
        for (var i = startPosition; i < resultsMax; i++) {
          var j = 0;
          checkForPicture();

          function checkForPicture() {
            // console.log('checking')
            // console.log('no. editions =' + response[i].editions.length)
            var editionsCount = response[i].editions.length;
            if ((response[i].editions[j].image_url == 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') && (j < (response[i].editions.length - 1))) {
              j++;
              checkForPicture();
            } else {
              var imageID = (response[i].editions[j].image_url);
              // console.log(response[i])
              if (imageID === 'https://image.deckbrew.com/mtg/multiverseid/0.jpg') {
                console.log("No images for this card.")
              } else if (editionsCount > 1) {
                //  style="background:url(thumbnail1.jpg)"
                $('.imageHolder.one').append('<div class="wrapperDiv"><img class="multiEdition" data-index="' + i + '" src="' + imageID + '"></div>');
              } else {
                $('.imageHolder.one').append('<div class="wrapperDiv"><img class="card" src="' + imageID + '" data-index="' + i + '" data-edition="0"></div>');
              };
              numberResults = response.length;
              j = 0;
            }
          }
        }
      }
    })
  };


  $('#popup').hide();



  $('.imageHolder').on('click', '.multiEdition', function() {
    // console.log("event imageHolder clicked");
    $('#editionBrowser').children().remove();
    i = $(this).attr('data-index');
    // console.log(storeResponse[i]);
    for (var k = 0; k < storeResponse[i].editions.length; k++) {
      var localImageID = (storeResponse[i].editions[k].image_url);
      $('#editionBrowser').append('<div class="wrapperDiv"><img class="card" data-index="' + i + '" data-edition="' + k + '" src="' + localImageID + '"></div> ')
    }
    $('#editionBrowser').prepend('<div id="top">Click to close.</div>');
    // console.log("line 227");
    $('#editionBrowser').animate({
      bottom: "0%"
    });
  });

  $('#editionBrowser').on('click', '#top', function() {
    $('#editionBrowser').animate({
      bottom: "-50%"
    });
    // console.log('clicking top red button')
  });

  $('.imageHolder, #editionBrowser').on('click', '.card', function() {
    // console.log($(this).attr('data-index'))
    $('#popup').fadeIn(400).fadeOut(400);
  });

  $('.imageHolder, #editionBrowser').on('click', '.card', function() {
    var cardIndexValue = $(this).attr('data-index');
    var cardEditionValue = $(this).attr('data-edition');
    var cardObject = storeResponse[cardIndexValue].editions[cardEditionValue]
    var name = storeResponse[cardIndexValue].name
    if (deck[name] == undefined) {
      deck[name] = [1, cardObject, name];
    } else if (deck[name][0] == 4 && name != 'Forest' && name != 'Plains' && name != 'Mountain' && name != 'Swamp' && name != 'Island') {
      deck[name][0] = 4
      alert('Sorry, each deck may only contain four instances of any card, basic lands excepted.');
    } else {
      deck[name][0]++
    }
    console.log(deck);
    updateViewer();
  })

  $('#testBox').on('click', '#remove', function(event){
    console.log($(this).siblings().attr('data-name'));
    var name = $(this).siblings().attr('data-name');
    if (deck[name][0] > 1){
      deck[name][0]--
    } else {
      delete deck[name];
      // event.preventDefault();
    };
    // console.log('there are ' + deck[name][0] + 'of us');
    updateViewer();
    event.preventDefault();
  })

  // $('.imageHolder, #editionBrowser').on('mouseenter', '.card, .multiEdition', function() {
  //   $(this).css({
  //     'width': '+=4px',
  //     'height': '+=6px',
  //     'margin-right': '-=1px',
  //     'margin-bottom': '-=3px',
  //     'margin-left': '-=3px',
  //     'margin-top': '-=3px',
  //   });
  // });
  //
  //
  // $('.imageHolder, #editionBrowser').on('mouseleave', '.card, .multiEdition', function() {
  //   $(this).css({
  //     'width': '-=4px',
  //     'height': '-=6px',
  //     'margin-right': '+=1px',
  //     'margin-bottom': '+=3px',
  //     'margin-left': '+=3px',
  //     'margin-top': '+=3px',
  //   });
  // })

  var whereDeckIs = 1;
  // $('#deckViewer').css('bottom', "-=45%")
  $('#deckViewerHeader').on('click', function() {
    if (whereDeckIs == 0) {
      $(this).parent().animate({
        bottom: "-=45%"
      });
      whereDeckIs = 1;
    } else {
      $(this).parent().animate({
        bottom: "+=45%"
      });
      whereDeckIs = 0;
    }

    // $(this).slideToggle(1000);
  })
  // $('#testBox').on('click', '.deckViewerList', function() {
  //   console.log('werd')
  //   var imageURL = $(this).attr('data-imageurl')
  //   $('#deckImageHolder').html('<img id="deckViewImage" src="'+imageURL+'">');
  // })

  function addToLocalStorage(){
      data = JSON.stringify(deck);
      window.localStorage.deckData = data
    }

})

// $('#deckImageHolder').append('<img id="deckViewImage" src="https://image.deckbrew.com/mtg/multiverseid/31761.jpg">');

// localStorage.setItem(yourObj)
// localStorage.getItem(matchYourObj)
// for loop over localStorage and retrieve the item you want with if/else conditionals then use .getItem to pull that out
