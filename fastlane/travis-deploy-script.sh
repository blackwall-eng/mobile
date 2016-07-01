#/usr/bin/env/sh
set -ev

if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "master" ]
then
	if [ "$PLATFORM" = ios ]
	then
		fastlane ios beta
	else
		fastlane android beta
	fi
fi		

