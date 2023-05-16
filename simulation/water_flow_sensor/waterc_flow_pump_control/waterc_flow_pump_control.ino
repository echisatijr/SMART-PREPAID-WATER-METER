#include <LiquidCrystal.h>

// Pin assignments
volatile byte pulseCount = 0;
float flowRate = 0.0;
unsigned int flowMilliLitres = 0;
unsigned long totalMilliLitres = 0;
unsigned long oldTime = 0;
bool pumping = false; // whether or not the pump is currently running
const float targetFlowRate = 50; // 50 milliliters per second
unsigned int setPoint = 0; // 10 milliliters
unsigned int currentValue = 0; // Variable to store the current reading
unsigned int RemainingVolume = 0; // Variable to store the current reading
unsigned int newReading = 0; // Variable to store the current reading
const float calibrationFactor = 90;

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

  if (Serial.available()) {
    
    String inputString = Serial.readStringUntil('\n'); // Read a string until a newline character is received
    setPoint = inputString.toInt(); // Convert the string to an integer and assign it to currentReading
    setPoint = setPoint + RemainingVolume;
    currentValue = setPoint;
    // Add the currentReading to the setPoint
    totalMilliLitres = 0; // Reset the totalMilliLitres when a new set point is entered
  }

  if (totalMilliLitres < setPoint) { // Only process counters if totalMilliLitres is less than setPoint
  
    RemainingVolume = setPoint - totalMilliLitres;
    currentValue = RemainingVolume;
    
    
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
      currentValue = RemainingVolume - flowMilliLitres;
      // Send data to the virtual serial port
      Serial.print(totalMilliLitres);
      Serial.print(",");
      Serial.print(flowMilliLitres);
       Serial.print(",");
      Serial.println(currentValue);
      
    }
  }
}

void pulseCounter() {
  pulseCount++;
}
