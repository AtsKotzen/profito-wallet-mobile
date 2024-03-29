
# Bumping up the version

The following files must be updated: `android/app/build.gradle`, `ios/ProfitoMobile.xcodeproj/project.pbxproj`, and `package.json`.

In the `package.json`, the field `version` must be updated.

In the `android/app/build.gradle`, the fields `versionCode` and `versionName` must be updated. The `versionCode` must always be increased because Google Play uses it to uniquelly identify the release.

In the `ios/ProfitoMobile.xcodeproj/project.pbxproj`, the fields `CURRENT_PROJECT_VERSION` and `MARKETING_VERSION` must be updated. Usually the `CURRENT_PROJECT_VERSION` is always `1`, while the `MARKETING_VERSION` is updated with the new version. Notice that there are two places to update the `MARKETING_VERSION` field, one for debug and another for release.

App Store uses the pair `(CFBundleShortVersionString, CFBundleVersion)` to identify a release. They are both from `ios/ProfitoMobile/Info.plist`.

Create a git tag and a new release on GitHub.

# Publishing the new App

## App Store

First, open the project in the XCode and Archive a new version. Then, upload this version to the App Store. Finally, go to the AppStoreConnect [1] to submit the new version to the TestFlight and to the App Store.

When writing the version number in the AppStoreConnect, we should supress the prefix `v`. So, `v0.4.1` becomes `0.4.1`.

We need to request the App review for both the FlightTest and the App Store. The reviews are independent processes.

When submitting for the App Store, in the Version Release section, "Manually release this version" should be checked.


## Google Play

First, open the project in Android Studio and Generate a Signed Bundle (Android App Bundle). Then, go to the Google Play Console [2] and generate the new release. Finally, upload the `.aab` to the release and do the rollout.

Usually, we first rollout to the Open track, and, after testing, we rollout to the Production track.


# Links

[1] https://appstoreconnect.apple.com/

[2] https://play.google.com/apps/publish/
