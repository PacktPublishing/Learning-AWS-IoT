import greengrasssdk

client = greengrasssdk.client('iot-data')

response = client.publish(
    topic='test/hello',
    qos=0,
    payload='some payload'.encode()
    )