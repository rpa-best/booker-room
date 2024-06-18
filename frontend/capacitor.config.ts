import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Booker-room',
  webDir: '.output/public',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.18:3000',
    cleartext: true
  }
};

export default config;
