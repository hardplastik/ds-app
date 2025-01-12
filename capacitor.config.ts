import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.hardplastik',
  appName: 'Athlos One',
  webDir: 'public',
  server: {
    "url": "http://<YOUR-IP>:3000",
    "cleartext": true
  }
};

export default config;
