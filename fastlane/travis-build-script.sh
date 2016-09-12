#!/bin/sh
set -ev

if [ "$PLATFORM" = ios ]
then
	#fastlane ios test
	echo "ios is disabled in CI for the moment till Xcode 8 is out"
else
	fastlane android test
fi
