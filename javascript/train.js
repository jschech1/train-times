$(document).ready(function () {

    // Initialize Firebase
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

    // 2. Button for adding Trains
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime = $("#first-train-input").val().trim();
        var tFrequency = $("#frequency-input").val().trim();


        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

        console.log(firstTimeConverted);

        // var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
        // var empRate = $("#rate-input").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            tFrequency: tFrequency
        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.trainName);
        console.log(newTrain.destination);
        console.log(newTrain.firstTime);
        console.log(newTrain.tFrequency);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().firstTime;
        var tFrequency = childSnapshot.val().tFrequency;

        // Train Info
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

        // Create the new row
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

        // Append the new row to the table
        $("#rows-here  > tbody").append(newRow);
    });

}) 