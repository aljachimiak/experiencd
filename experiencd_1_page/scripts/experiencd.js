//experiencd.js

//define the arrays
var typeArray = [];
var keyArray = [];
var valueArray = [];

//define the num* variables globally
numTypes = 0;
numKeys = 0;
numValues = 0;

//Numbers for making the score
numError = 0;
numWords = 0;
totalScore = 0;

//here's the form data
var formData = "";

var ajaxFunc = function(){
      $.ajax({
      type: "GET",
      url: "/experiencd_1_page/server/proxy.php",
      dataType: "application/x-www-form-urlencoded",
      data: formData,
      success: parseXml(xml)
    });
}

var jqTest = function() {
  //console.log('poop');
  $.post("/experiencd_1_page/server/proxy.php", {url:"/stats", data: formData})
    .success(function(xml){
      //alert('something happened!')
    parseXml(xml)
    })
}

function parseXml(xml)
{
  //find each metric
  $(xml).find("metric").each(function()
  {
    //$("#put-it-here").append($(this).find('type').text() + "<br />");

    //push types the merticArray
    typeArray.push($(this).find('type').text())

    //push keys to the keyArray
    keyArray.push($(this).find('key').text())

    //push values to the valueArray
    valueArray.push($(this).find('value').text())

    //check the length of the arrays
    numTypes = typeArray.length
    numKeys = keyArray.length
    numValues = valueArray.length

    //convert the values into integers
    for(i=0; i<numValues; i++){
    	valueArray[i] = parseInt(valueArray[i]);
    }
  });
  //Ahem...Testing, Testing
  console.log(typeArray);
  console.log("types length = " + numTypes) ;
  console.log(keyArray);
  console.log("keys length = " + numKeys);
  console.log(valueArray);
  console.log("values length = " + numValues);

  $('.stats').slideDown(function(){

  });
  getErrors();

}

function getErrors(){
  //get total errors
  for (var i = numValues - 3; i >= 0; i--) {
    numError += valueArray[i];
  };
  $('#number-errors').empty().hide().append(numError).fadeIn(600);
  getWords();
}

function getWords(){
  numWords = valueArray[numValues-1];
  $('#number-words').empty().hide().append(numWords).fadeIn(1200);
  makeScore();
}

function makeScore(){
  numCorrect = numWords - numError;
  totalScore = numCorrect/numWords;
  totalScore = 100 * totalScore;
  totalScore = parseInt(totalScore);
  $('#score').empty().hide().append(totalScore).fadeIn(2000);
  $('#get-info').off('click');
  $('#hide-filler').off('click');
  $('#giller-text').off('click');
}

$(document).ready(function() {
  $('#get-info').on('click', function(){
    formData = $('#textInput').val();
    if (formData.length <=0){
      formData = "The purpoce of a spell checker is to check the text four spelling and typeing errors. The checker finds errors througout the text.<br/>When the spell checker finds an questionable word, it highlights it and suggests the mpst likely variants too replace the questionable word. You can select the variant and replace the wrrd or leave the word unanged.";
        $('#textInput').append(formData);
        $('#filler-text').fadeOut(function(){
          $('#hide-filler').fadeIn();
        });
    }
    jqTest();
  });

  $('#filler-text').on('click', function(){
    $('#textInput').append("The purpoce of a spell checker is to check the text four spelling and typeing errors. The checker finds errors througout the text.<br/>When the spell checker finds an questionable word, it highlights it and suggests the mpst likely variants too replace the questionable word. You can select the variant and replace the wrrd or leave the word unanged.")
    $('#filler-text').fadeOut(function(){
      $('#hide-filler').fadeIn();
    });
    
  })

  $('#hide-filler').on('click', function(){
    $('#textInput').empty();
    $('#hide-filler').fadeOut(function(){
      $('#filler-text').fadeIn();
    });
  });

});


