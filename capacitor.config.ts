import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.camarm.dule',
  appName: 'Dule',
  webDir: 'dist',
  plugins: {
    "SplashScreen": {
      "launchAutoHide": false,
      "androidScaleType": "CENTER_CROP",
      "splashFullScreen": true,
      "splashImmersive": false,
      "backgroundColor": "#EBF8EF"
    },
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
