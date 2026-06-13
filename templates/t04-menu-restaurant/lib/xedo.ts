import { Xedo } from '@xedo/sdk';

if (!process.env.XEDO_API_KEY) {
  throw new Error(
    'XEDO_API_KEY manquant. Ajoute-le dans .env.local : XEDO_API_KEY=xdk_live_...'
  );
}

export const xedo = new Xedo({
  apiKey: process.env.XEDO_API_KEY,
});
