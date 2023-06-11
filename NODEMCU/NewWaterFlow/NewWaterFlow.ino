#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <ThingSpeak.h>

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);

//firebase
#define FIREBASE_HOST "https://meter-123-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "AIzaSyCXkVM3-W_BwztwNDrtU-05PGyac8pQEQA"

//wifi
#define WIFI_SSID "iPhone"
#define WIFI_PASSWORD "nafe1739"

//Thingspeak
const char* host = "api.thingspeak.com";
const char* writeAPIKey = "25W83PHHY4AVXOOO";
unsigned long chanID = 2146181;

FirebaseData firebaseData;
WiFiClient client;

//some pins
#define LED_BUILTIN 16
#define SENSOR  D4
#define relay D5

//Define some variables
long currentMillis = 0;
long previousMillis = 0;
int interval = 1000;
boolean ledState = LOW;
float calibrationFactor = 4.5;
volatile byte pulseCount;
byte pulse1Sec = 0;
float flowRate;
unsigned long flowMilliLitres;
unsigned int totalMilliLitres;
float flowLitres;
float totalLitres;
float remainingWater;
int userSignal;
float token;
String previousRecharge = ""; // Variable to store previous data value
String previousSignal = "";

void IRAM_ATTR pulseCounter(){
  pulseCount++;
}

void setup() {
  lcd.begin();
  lcd.clear();
  lcd.backlight();
  
  //pins mode
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(SENSOR, INPUT_PULLUP);
  pinMode(relay, OUTPUT);

  //initial assignment of variables
  pulseCount = 0;
  flowRate = 0.0;
  flowMilliLitres = 0;
  totalMilliLitres = 0;
  previousMillis = 0;
  remainingWater = 0;
  
  attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);
  
  // Put your setup code here, to run once:
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  ThingSpeak.begin(client);
  Serial.begin(115200);

  // Establishing a WiFi connection
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    lcd.setCursor(0, 0);
    lcd.print("Conectng to WiFi");
    lcd.setCursor(0, 1);
    lcd.print(".");
    delay(1000);
  }
  
  Serial.println();
  Serial.print("Connected with: ");
  Serial.print(WiFi.localIP());
  lcd.setCursor(0, 0);
  lcd.print("Connected to");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
  delay(1000);

  // Connecting to Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void loop() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SMART WATR METER");
  
  Serial.println("SMART WATER METER");
  // getting the recharge value from the database
  if (Firebase.getString(firebaseData, "/meter/token/key")) {
    String newData = firebaseData.stringData();
    if (newData != previousRecharge) {
      Serial.println("tocken has changed!");
      Serial.println("New data: " + newData);
      previousRecharge = newData; 
      token = newData.toFloat();
      remainingWater = remainingWater + token;
    }
  }

  //getting the signal value from the database
  if (Firebase.getString(firebaseData, "/meter/signal/key")) {
    String newData = firebaseData.stringData();
    if (newData != previousSignal) {
      Serial.println("signal has changed!");
      Serial.println("New data: " + newData);
      previousSignal = newData;
      userSignal = newData.toInt();
    }
  }

  //error for db
  else {
    Serial.println("Failed to connect to Firebase");
  }
  
  if (remainingWater < 0.01){
    digitalWrite(relay, HIGH); //closing the valve
  }
  else if (remainingWater > 0){
  if (userSignal == 1){
    digitalWrite(relay, LOW);//opening the valve
    Serial.println("opened the valve");
    }
  if (userSignal == 0){
    digitalWrite(relay, HIGH);//closing the valve
    Serial.println("closed the valve");
    }
  }

  Serial.println("remaining water");
  Serial.print(remainingWater);

  
  currentMillis = millis();
  if (currentMillis - previousMillis > interval){
    pulse1Sec = pulseCount;
    pulseCount = 0;

  /* 
    this loop may not complete in exactly 1 second intervals so we calculate
    the number of milliseconds that have passed since the last execution and use
    that to scale the output. We also apply the calibrationFactor to scale the output
    based on the number of pulses per second per units of measure (litres/minute in
    this case) coming from the sensor. 

    Divide the flow rate in litres/minute by 60 to determine how many litres have
    passed through the sensor in this 1 second interval, then multiply by 1000 to
    convert to millilitres.

    Adding the millilitres passed in this second to the cumulative total
  */  


    flowRate = (((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor);
    previousMillis = millis();

    flowMilliLitres = ((flowRate / 60) * 1000)*2;
    flowLitres = (flowRate / 60)*2;

    totalMilliLitres += flowMilliLitres;
    totalLitres += flowLitres;

    //remainingWater = remainingWater - totalLitres;

    //Printing the flow rate for this second in litres/ minute
    Serial.print("Flow rate: ");
    Serial.print(float(flowRate));
    Serial.print("L/min");
    Serial.print("\t");

    //Printing the flow rate for this second in litres/ minute
    lcd.setCursor(0, 1);
    lcd.print("FR:");
    lcd.print(flowRate);

    //Printing the cumulative total litres flowed since starting
    Serial.print("Output Liquid Quantity: ");
    Serial.print(totalMilliLitres);
    Serial.print("mL / ");
    Serial.print(totalLitres);
    Serial.println("L");

    //Printing the cumulative total liters flowed since starting
    lcd.setCursor(9, 1);
    lcd.print("VL:");
    lcd.print(totalLitres);
  }

  //writing total litters to database
  if(Firebase.setString(firebaseData, "/meter/volume", totalLitres)){
    Serial.println("PASSED");
    Serial.println("PATH: " + firebaseData.dataPath());
    Serial.println("TYPE: " + firebaseData.dataType());
  }
  else{
    //error
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
  }
  
  //writing  the flow rate to database
  if(Firebase.setString(firebaseData, "/meter/flowRate", flowRate)){
    Serial.println("PASSED");
    Serial.println("PATH: " + firebaseData.dataPath());
    Serial.println("TYPE: " + firebaseData.dataType());
  }
  else{
    //error
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
  }

  //Writing to Thingspeak
  ThingSpeak.writeField(chanID, 1, flowRate, writeAPIKey);
  ThingSpeak.writeField(chanID, 2, totalLitres, writeAPIKey);

 /*
  if (remainingWater < 1){
   remainingWater = 0;
  }
  else{
    remainingWater = remainingWater - flowLitres;
  }*/
  remainingWater = remainingWater - (flowLitres);

  // Sending remainingWater to Firebase database
  String remainingWaterString = String(remainingWater);
  Firebase.setString(firebaseData, "/meter/remainingWater", remainingWaterString);
  delay(1000);
}
