$(document).ready(function() {
// Initialize Firebase
var trainName;
var trainDest;
var firstTrain;
var trainFreq;


$("#submit-info").on("click", function(event)
{
    event.preventDefault();

    // Get the input values
    trainName = $("#train-name-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    trainDest = ($("#dest-input").val().trim());
    trainFreq = $("#freq-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: firstTrain,
        frequency: trainFreq
    };
    database.ref().push(newTrain);
    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");



database.ref().on("child_added", function(childSnapshot)
{
    console.log(childSnapshot.val().name);

    var tableRow = $("<tr>");

    var tableName = $("<td>").text(childSnapshot.val().name);
    tableRow.append(tableName);

    var tableRole = $("<td>").text(childSnapshot.val().destination);
    tableRow.append(tableRole);

    var tableStart = $("<td>").text(childSnapshot.val().start);
    tableRow.append(tableStart);

    var tableMonths = $("<td>").text(moment(childSnapshot.val().start).diff(moment(), "months")*-1);
    tableRow.append(tableMonths);

    var tableRate = $("<td>").text(childSnapshot.val().frequency);
    tableRow.append(tableRate);

    var tableBilled = $("<td>").text((moment(childSnapshot.val().start).diff(moment(), "months")) * (childSnapshot.val().rate)*-1);
    tableRow.append(tableBilled);

    $("#employeeTable").append(tableRow);
    console.log(moment(childSnapshot.val().start).diff(moment(), "months"));
})})
});