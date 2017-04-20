/**
 * Created by Emiliya Vuntsova on 4/20/17.
 */
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBb9dEXqQzub8IRsLXmtbsaOqYCTOQ-STY",
    authDomain: "trainschaduale-fc654.firebaseapp.com",
    databaseURL: "https://trainschaduale-fc654.firebaseio.com",
    projectId: "trainschaduale-fc654",
    storageBucket: "trainschaduale-fc654.appspot.com",
    messagingSenderId: "382760415599"
};
firebase.initializeApp(config);

//
var trainData = firebase.database();

//
$("#addTrainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    trainData.ref().push(newTrain);
    alert("New Train Added");

    $("#trainNameInput").val();
    $("#destinationInput").val();
    $("#firstTrainInput").val();
    $("#frequencyInput").val();

    return false;
});

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var reminder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - reminder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(reminder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");


});
