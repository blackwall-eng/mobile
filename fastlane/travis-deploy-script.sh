#!/bin/sh
set -ev

if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_BRANCH" = "master" ]
then
	if [ "$PLATFORM" = ios ]
	then
		# fastlane ios beta
		echo "No ios beta build from travis right now"
	else
		fastlane android beta
	fi
fi
