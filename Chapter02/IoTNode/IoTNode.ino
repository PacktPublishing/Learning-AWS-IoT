
#include <aws_iot_mqtt.h>
#include <aws_iot_version.h>
#include "aws_iot_config.h"
#include "DHT.h"

aws_iot_mqtt_client myClient; // init iot_mqtt_client
char msg[32]; // read-write buffer
int cnt = 0; // loop counts
int rc = -100; // return value placeholder
bool success_connect = false; // whether it is connected

#define DHTTYPE DHT22 
#define DHTPIN 10
DHT dht(DHTPIN, DHTTYPE);

// Basic callback function that prints out the message
void msg_callback(char* src, unsigned int len, Message_status_t flag) {
  if(flag == STATUS_NORMAL) {
    Serial.println("CALLBACK:");
    int i;
    for(i = 0; i < (int)(len); i++) {
      Serial.print(src[i]);
    }
    Serial.println("");
  }
}

void setup() {
  // Start Serial for print-out and wait until it's ready
  Serial.begin(115200);
  while(!Serial);

  // init DHT22
  dht.begin();
  
  //
  char curr_version[80];
  snprintf_P(curr_version, 80, PSTR("AWS IoT SDK Version(dev) %d.%d.%d-%s\n"), VERSION_MAJOR, VERSION_MINOR, VERSION_PATCH, VERSION_TAG);
  Serial.println(curr_version);
  // Set up the client
  if((rc = myClient.setup(AWS_IOT_CLIENT_ID)) == 0) {
    // Load user configuration
    if((rc = myClient.config(AWS_IOT_MQTT_HOST, AWS_IOT_MQTT_PORT, AWS_IOT_ROOT_CA_PATH, AWS_IOT_PRIVATE_KEY_PATH, AWS_IOT_CERTIFICATE_PATH)) == 0) {
      // Use default connect: 60 sec for keepalive
      if((rc = myClient.connect()) == 0) {
        success_connect = true;
        // Subscribe to "topic1"
        if((rc = myClient.subscribe("sensorroom", 1, msg_callback)) != 0) {
          Serial.println("Subscribe failed!");
          Serial.println(rc);
        }
      }
      else {
        Serial.println(F("Connect failed!"));
        Serial.println(rc);
      }
    }
    else {
      Serial.println(F("Config failed!"));
      Serial.println(rc);
    }
  }
  else {
    Serial.println(F("Setup failed!"));
    Serial.println(rc);
  }
  // Delay to make sure SUBACK is received, delay time could vary according to the server
  delay(2000);
}

void loop() {
  if(success_connect) {
    char floatBuffer[8];

    float t = dht.readTemperature();
    byte precision = 2;
    dtostrf(t, precision+3, precision, floatBuffer);
     
    Serial.print("Temperature: ");
    Serial.println(t);
    if (isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
    
    sprintf(msg, "Temp: %s", floatBuffer);
    if((rc = myClient.publish("sensorroom", msg, strlen(msg), 1, false)) != 0) {
      Serial.println(F("Publish failed!"));
      Serial.println(rc);
    }
  
    // Get a chance to run a callback
    if((rc = myClient.yield()) != 0) {
      Serial.println("Yield failed!");
      Serial.println(rc);
    }
    Serial.print("Sent: ");
    Serial.println(msg);
  
    delay(3000);
  }
}
