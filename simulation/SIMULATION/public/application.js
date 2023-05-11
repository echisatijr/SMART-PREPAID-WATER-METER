// Complete Project Details at: https://RandomNerdTutorials.com/

// Database Paths
var dataFlowRatePath = 'meter/flowRate';
var dataVolumePath = 'meter/volume';
var dataTockenPath = 'meter/tocken';

// Get a database reference 
const databaseFlowRate = database.ref(dataFlowRatePath);
const databaseVolume = database.ref(dataVolumePath);

// Variables to save database current values
var floatReading;
var intReading;

// Attach an asynchronous callback to read the data
databaseFlowRate.on('value', (snapshot) => {
  floatReading = snapshot.val();
  console.log("FlowRate : ",floatReading);
  document.getElementById("reading-float").innerHTML = floatReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

databaseVolume.on('value', (snapshot) => {
  intReading = snapshot.val();
  console.log("Volume   : ", intReading);
  document.getElementById("reading-int").innerHTML = intReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});