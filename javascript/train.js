$(document).ready(function () {

    // Firebase
    var config = {
        apiKey: "AIzaSyBiekwmpIsh8QhS9zGnG8WbRq05A-qGbS4",
        authDomain: "train-times-860f1.firebaseapp.com",
        databaseURL: "https://train-times-860f1.firebaseio.com",
        projectId: "train-times-860f1",
        storageBucket: "train-times-860f1.appspot.com",
        messagingSenderId: "61283311088"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Submit button
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // Input fields
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime = $("#first-train-input").val().trim();
        var tFrequency = $("#frequency-input").val().trim();


        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        console.log(firstTimeConverted);

        // var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
        // var empRate = $("#rate-input").val().trim();

        // Holder for employee data
        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            tFrequency: tFrequency
        };

        // Uploads employee data
        database.ref().push(newTrain);

        // Console log
        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTime);
        console.log(newTrain.tFrequency);

        alert("Train successfully added");

        // Clear
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    });

    
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store variables
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTime;
        var tFrequency = childSnapshot.val().tFrequency;

       
        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(tFrequency);

        // Prettify the employee start
        // var trainStartPretty = moment.unix(firstTime).format("HH:mm");

        var timeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(timeConverted);

        // Need next arrival formula
        var diffTime = moment().diff(moment(timeConverted), "minutes");

        console.log(diffTime);

        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log(tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
        // console.log(moment(nextTrain).format("hh:mm"));
        console.log(nextTrain);

        // Create rows
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(tFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain)


            //     // $("<td>").text(minutesAway)
        );

        // $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        //     tFrequency + "</td><td></td><td></td></tr>");

        // Append row
        $("#rows-here  > tbody").append(newRow);
    });

}) 