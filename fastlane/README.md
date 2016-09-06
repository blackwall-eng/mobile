fastlane documentation
================
# Installation
```
sudo gem install fastlane
```
# Available Actions
## iOS
### ios test
```
fastlane ios test
```
Runs all the tests
### ios prepare_deploy
```
fastlane ios prepare_deploy
```

### ios beta
```
fastlane ios beta
```
Submit a new Beta Build to Apple TestFlight and Fabric

This will also make sure the profile is up to date
### ios appstore
```
fastlane ios appstore
```
Deploy a new version to the App Store
### ios version
```
fastlane ios version
```
Tag a new version e.g. fastlane version minor:true

----

## Android
### android test
```
fastlane android test
```
Run the tests
### android beta
```
fastlane android beta
```
Deploy a new version to Crashlytics

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [https://fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [GitHub](https://github.com/fastlane/fastlane/tree/master/fastlane).