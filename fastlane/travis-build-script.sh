#/usr/bin/env/sh
set -ev

if [ "$PLATFORM" = ios ]
then
	fastlane ios test
else
	fastlane android test
fi	
