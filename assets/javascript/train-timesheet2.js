$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyA5ZeotbpzHuC5ll5UjnI4EUKi5nw4Riqg",
        authDomain: "train-timesheet-da4fe.firebaseapp.com",
        databaseURL: "https://train-timesheet-da4fe.firebaseio.com",
        projectId: "train-timesheet-da4fe",
        storageBucket: "",
        messagingSenderId: "12309080711",
        appId: "1:12309080711:web:11bf914477b987a4"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#submit").on("click", function () {
        event.preventDefault();

        var trainN = $("#trainN").val().trim();
        var destination = $("#destination").val().trim();
        var arrival = $("#arrival").val().trim();
        var frequency = $("#frequency").val().trim();

        var trainData = {
            name: trainN,
            place: destination,
            home: arrival,
            minutes: frequency
        }

        database.ref().push(trainData);
        
        $("#trainN").val("");
        $("#destination").val("");
        $("#arrival").val("");
        $("#frequency").val("");
    })
    database.ref().on("child_added", function (timesheet) {
        console.log(timesheet.val());

        var TrainName = timesheet.val().name;
        var TrainDestination = timesheet.val().place;
        var TrainArrival = timesheet.val().home;
        var TrainTime = timesheet.val().minutes;

        var newRow = $("<tr>").append(
            $("<td>").html(TrainName),
            $("<td>").html(TrainDestination),
            $("<td>").html(TrainArrival),
            $("<td>").html(TrainTime),
        );
        $("#trainTable > tbody").append(newRow)
    })
})