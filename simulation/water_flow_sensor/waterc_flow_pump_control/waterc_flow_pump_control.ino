#include <LiquidCrystal.h>

// Pin assignments
volatile byte pulseCount = 0;
float flowRate = 0.0;
unsigned int flowMilliLitres = 0;
unsigned long totalMilliLitres = 0;
unsigned long oldTime = 0;
bool pumping = false; // whether or not the pump is currently running
const float targetFlowRate = 50; // 50 milliliters per second
const unsigned int setPoint = 10; // 400 milliliters
const float calibrationFactor = 90; // You can change according to your datasheet

// Pin assignments
const int sensorPin = 2;
const int pumpingMotor = 5;
const int rs = 12, en = 11, d4 = 9, d5 = 8, d6 = 7, d7 = 6;

// Initialize LCD screen
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup() {
  // Initialize serial communication
  Serial.begin(9600);

  // Initialize LCD screen
  lcd.begin(16, 2);

  // Set pin modes
  pinMode(pumpingMotor, OUTPUT);
  digitalWrite(pumpingMotor, HIGH); // Pumping motor off
  pinMode(sensorPin, INPUT);
  digitalWrite(sensorPin, HIGH); // Turn on internal pull-up resistor

  // Attach interrupt to sensor pin
  attachInterrupt(digitalPinToInterrupt(sensorPin), pulseCounter, FALLING);
}

void loop() {
  if (totalMilliLitres < setPoint) { // Only process counters if totalMilliLitres is less than 10
    // Only process counters once per second
    if ((millis() - oldTime) > 1000) {
      // Calculate flow rate
      flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;

      // Note the time this processing pass was executed
      oldTime = millis();

      // Calculate flow in milliliters for this second
      flowMilliLitres = (flowRate / 60) * 1000;

      // Add the milliliters passed in this second to the cumulative total
      totalMilliLitres += flowMilliLitres;

      // Display data on LCD screen
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Flow rate:");
      lcd.setCursor(0, 1);
      lcd.print(flowMilliLitres);
      lcd.print("mL/sec");
      lcd.setCursor(8, 0);
      lcd.print("Total:");
      lcd.setCursor(8, 1);
      lcd.print(totalMilliLitres);
      lcd.print("mL");

      // Turn off pumping motor if set point has been reached
      if (totalMilliLitres >= setPoint) {
        digitalWrite(pumpingMotor, LOW);
        pumping = false;
      }

      // Control the pumping motor based on the current flow rate
      if (flowRate >= targetFlowRate && !pumping) {
        digitalWrite(pumpingMotor, HIGH);
        pumping = true;
      } else if (flowRate < targetFlowRate && pumping) {
        digitalWrite(pumpingMotor, LOW);
        pumping = false;
      }

      // Reset pulse counter
      pulseCount = 0;

      // Send data to virtual serial port
      Serial.print(totalMilliLitres);
      Serial.print(",");
      Serial.println(flowMilliLitres);
    }
  }
}


void pulseCounter() {
  pulseCount++;
}
