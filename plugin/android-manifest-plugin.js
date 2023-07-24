const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function androiManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    let androidManifest = config.modResults.manifest;

    androidManifest["application"].$ = {
      ...androidManifest["application"].$,
      "android:usesCleartextTraffic": "true",
    };

    return config;
  });
};
