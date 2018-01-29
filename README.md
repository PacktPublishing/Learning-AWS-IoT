# Learning AWS IoT
This is the code repository for [Learning AWS IoT](https://www.packtpub.com/networking-and-servers/linux-device-drivers-development?utm_source=github&utm_medium=repository&utm_campaign=9781785280009), published by [Packt](https://www.packtpub.com/?utm_source=github). It contains all the supporting project files necessary to work through the book from start to finish.
## Instructions and Navigation
All of the code is organized into folders. Each folder starts with a number followed by the application name. For example, Chapter02.



The code will look like the following:

device
   .on('connect', function() {
     console.log('connected');
     device.subscribe('topic_1');
     device.publish('topic_1', JSON.stringify({ test_data: 1}));
   });

The Internet of Things market increased a lot in the past few years and IoT development and its adoption have showed an upward trend. Analysis and predictions say that Enterprise IoT platforms are the future of IoT. AWS IoT is currently leading the market with its wide range of device support SDKs and versatile management console.

This book initially introduces you to the IoT platforms, and how it makes our IoT development easy. It then covers the complete AWS IoT Suite and how it can be used to develop secure communication between internet-connected things such as sensors, actuators, embedded devices, smart applications, and so on. The book also covers the various modules of AWS: AWS Greengrass, AWS device SDKs, AWS IoT Platform, AWS Button, AWS Management consoles, AWS-related CLI, and API references, all with practical use cases.

Near the end, the book supplies security-related best practices to make bi-directional communication more secure. When you've finished this book, you'll be up-and-running with the AWS IoT Suite, and building IoT projects.


## Related Products
* [Linux: Embedded Development](https://www.packtpub.com/application-development/linux-embedded-development?utm_source=github&utm_medium=repository&utm_campaign=9781787124202)

* [Embedded Linux Projects Using Yocto Project Cookbook](https://www.packtpub.com/virtualization-and-cloud/embedded-linux-projects-using-yocto-project-cookbook?utm_source=github&utm_medium=repository&utm_campaign=9781784395186)

* [Linux: Powerful Server Administration](https://www.packtpub.com/networking-and-servers/linux-powerful-server-administration?utm_source=github&utm_medium=repository&utm_campaign=9781788293778)
