$(function() {
  var config = {
    apiKey: "AIzaSyCyeeck_Ih0GBawfPcaycV7fXixRjTm4IM",
    authDomain: "rps-online-facfc.firebaseapp.com",
    databaseURL: "https://rps-online-facfc.firebaseio.com",
    projectId: "rps-online-facfc",
    storageBucket: "",
    messagingSenderId: "668109073167"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  $("#run").click(function(e) {
    e.preventDefault();
    var newTrain = $("#name")
      .val()
      .trim();
    var newDestiny = $("#destiny")
      .val()
      .trim();
    var firstTime = $("#first").val().trim();
    var frequency = $("#time").val().trim();
    var newTrain = {
      name: newTrain,
      destiny: newDestiny,
      firstTrain: firstTime,
      frequency: frequency
    };

    $("#name").val(" ");
    $("#destiny").val(" ");
    $("#first").val(" ");
    $("#time").val(" ");

    database.ref().push(newTrain);
    
  });

  database.ref().on("child_added", function(snap) {
    var trainName = snap.val().name;
    var trainDestiny = snap.val().destiny;
    var trainFirst = snap.val().firstTrain;
    var trainFrequency = snap.val().frequency;

    var firstTimeConverted = moment(trainFirst, "HH:mm a");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var tMinutesTillTrain = trainFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('HH:mm a');

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestiny),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
      
    );
    $("tbody").append(newRow);
  });
  // =============================================================
});
