import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.camarm.dule',
  appName: 'dule',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
