import mqtt from 'mqtt';

const MQTT_BROKER = 'mqtt://broker.emqx.io:1883';
const MQTT_TOPIC_PREFIX = 'bayarnyala';

let mqttClient: mqtt.MqttClient | null = null;

export function getMqttClient(): mqtt.MqttClient {
  if (!mqttClient) {
    mqttClient = mqtt.connect(MQTT_BROKER, {
      clientId: `bayarnyala_web_${Math.random().toString(16).slice(3)}`,
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    mqttClient.on('connect', () => {
      console.log('MQTT Client Connected');
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT Client Error:', err);
    });

    mqttClient.on('offline', () => {
      console.log('MQTT Client Offline');
    });

    mqttClient.on('reconnect', () => {
      console.log('MQTT Client Reconnecting...');
    });
  }

  return mqttClient;
}

export function publishRelayControl(kamarId: string, status: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = getMqttClient();
    const topic = `${MQTT_TOPIC_PREFIX}/kamar/${kamarId}/relay`;
    const message = JSON.stringify({
      status: status ? 'ON' : 'OFF',
      timestamp: new Date().toISOString(),
    });

    client.publish(topic, message, { qos: 1, retain: true }, (error) => {
      if (error) {
        console.error('MQTT Publish Error:', error);
        reject(error);
      } else {
        console.log(`MQTT Published to ${topic}: ${message}`);
        resolve();
      }
    });
  });
}

export function publishSewaExpiry(kamarId: string, tanggalSelesai: Date, status: 'aktif' | 'selesai'): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = getMqttClient();
    const topic = `${MQTT_TOPIC_PREFIX}/kamar/${kamarId}/sewa`;
    const message = JSON.stringify({
      status: status,
      tanggal_selesai: tanggalSelesai.toISOString(),
      timestamp: new Date().toISOString(),
    });

    client.publish(topic, message, { qos: 1, retain: true }, (error) => {
      if (error) {
        console.error('MQTT Publish Sewa Expiry Error:', error);
        reject(error);
      } else {
        console.log(`MQTT Published sewa info to ${topic}: ${message}`);
        resolve();
      }
    });
  });
}

export function disconnectMqtt(): void {
  if (mqttClient) {
    mqttClient.end();
    mqttClient = null;
  }
}
