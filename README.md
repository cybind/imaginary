Imaginary
=========

It is an example from the book "PhoneGap by Example".

### Installation Prerequisites
- Install Node.js from [Node.js official website](http://nodejs.org/)
- Install Cordova with NPM: `$ npm install -g cordova`

#### iOS setup
In order to be able to run the application being developed in iOS Simulator or on an iOS device connected to our computer, we need the following:
-	OS: Mac OS X
-	IDE: Xcode (6.0 and newer)
-	iOS SDK

> You can download Xcode from https://developer.apple.com/xcode/downloads/ and iOS SDK from https://developer.apple.com/ios/download/

The only disappointment when developing for iOS with the ability to debug on your computer is a limitation of the operating system by Apple. Unfortunately, it only must be Mac OS X operating system.

#### Android Setup
Setting up the project to run the application on Android platform looks a little bit easier. But also has its complexity. To run the application in the Android simulator or on Android device connected to our computer, we need the following:
-	OS: Linux or Windows or Mac
-	Java: Oracle JDK
-	IDE: Android Studio
-	Android SDK

### Clone
After that you can clone this repo and we can run the application.

### Running
- Open Xcode project `cordova/platforms/ios/Imaginary.xcodeproj`
- Select the intended device from the toolbar's *Scheme menu*
- Press the *Run* button that appears in the same toolbar to the left of the Scheme. That builds, deploys and runs the application in the emulator. A separate emulator application opens to display the app.

A similar procedure can be done with the help of Cordova CLI.
```
$ cordova build ios
```
This generates ios platform-specific code within the project's platforms subdirectory.
The cordova build command is a shorthand for the following:
```
$ cordova prepare ios
$ cordova compile ios
```
To run our application in iOS emulator it is enough to execute the following command:
```
$ cordova emulate ios
```
And we see the same application in the emulator that we saw when run from XCode.
