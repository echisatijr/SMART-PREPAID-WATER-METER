/*
  SMART PREPAID WATER METER
  FOURTH YEAR PROJECT
  GROUP 15
*/

#include <Arduino.h>
#if defined(ESP32)
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <ThingSpeak.h>
#endif
#include <Firebase_ESP_Client.h>
//#include <FirebaseArduino.h>


#include <Wire.h>
#include <LiquidCrystal_I2C.h>
//#include "addons/TokenHelper.h"
//#include "addons/RTDBHelper.h"

LiquidCrystal_I2C lcd(0x27, 16, 2);

//Insert your network credentials
#define WIFI_SSID "iPhone"
#define WIFI_PASSWORD "nafe1739"

//Firebase project API Key, RTDB URLefine the RTDB URL
#define API_KEY "AIzaSyCXkVM3-W_BwztwNDrtU-05PGyac8pQEQA"
#define DATABASE_URL "https://meter-123-default-rtdb.firebaseio.com"

//Defining some pins
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
WiFiClient client;

//Thingspeak
const char* host = "api.thingspeak.com";
const char* writeAPIKey = "25W83PHHY4AVXOOO";
unsigned long chanID = 2146181;

void IRAM_ATTR pulseCounter(){
  pulseCount++;
}

//Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;

void setup() {

  lcd.begin();
  lcd.clear();
  lcd.backlight();

  Serial.begin(115200);
  ThingSpeak.begin(client);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(SENSOR, INPUT_PULLUP);
  pinMode(relay, OUTPUT);

  pulseCount = 0;
  flowRate = 0.0;
  flowMilliLitres = 0;
  totalMilliLitres = 0;
  previousMillis = 0;

  attachInterrupt(digitalPinToInterrupt(SENSOR), pulseCounter, FALLING);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  lcd.setCursor(0, 0);
  lcd.print("Conectng to WiFi");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) {
    lcd.setCursor(i, 1);
    lcd.print(".");
    i = i + 1;
    
    Serial.print(".");
    delay(1000);
  }

 
  Serial.println();
  Serial.print("Connected with IP: ");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected to");
  Serial.println(WiFi.localIP());
  lcd.setCursor(0, 1);
  delay(1000);
  lcd.print(WiFi.localIP());
  Serial.println();
  

  //Assigning the api key, the RTDB URL
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  //Sign up
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Status is OK");
    signupOK = true;
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  //Assigning the callback function for the long running token generation task
  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {

  lcd.clear();
  //Printing to the LCD
  lcd.setCursor(0, 0);
  lcd.print("SMART WATR METER");

  digitalWrite(relay, LOW);
  delay(1000);
  digitalWrite(relay, HIGH);
  delay(1000);

  currentMillis = millis();
  if (currentMillis - previousMillis > interval)
  {

    pulse1Sec = pulseCount;
    pulseCount = 0;

    /* Because this loop may not complete in exactly 1 second intervals we calculate
      the number of milliseconds that have passed since the last execution and use
      that to scale the output. We also apply the calibrationFactor to scale the output
      based on the number of pulses per second per units of measure (litres/minute in
      this case) coming from the sensor. */
    flowRate = (((1000.0 / (millis() - previousMillis)) * pulse1Sec) / calibrationFactor);
    previousMillis = millis();

    /* Divide the flow rate in litres/minute by 60 to determine how many litres have
      passed through the sensor in this 1 second interval, then multiply by 1000 to
      convert to millilitres. */
    flowMilliLitres = ((flowRate / 60) * 1000)*2;
    flowLitres = (flowRate / 60)*2;

    //Adding the millilitres passed in this second to the cumulative total
    totalMilliLitres += flowMilliLitres;
    totalLitres += flowLitres;

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

  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // Write total number of litters (volume) on the database path meter/volume
    if (Firebase.RTDB.setInt(&fbdo, "meter/volume", totalLitres)) {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;

    //Writing the flow rate of water on the database path meter/volume
    if (Firebase.RTDB.setFloat(&fbdo, "meter/flowRate", flowRate)) {
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }

  if (totalLitres >= 5){
    digitalWrite(relay, HIGH);
  }


 ThingSpeak.writeField(chanID, 1, flowRate, writeAPIKey);
 ThingSpeak.writeField(chanID, 2, totalLitres, writeAPIKey);
}
