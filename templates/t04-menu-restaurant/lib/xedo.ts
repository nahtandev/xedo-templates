import { Xedo } from '@xedo/sdk';
import { XEDO_API_KEY, XEDO_API_BASE_URL } from './env';

if (!XEDO_API_KEY) {
  throw new Error(
    'XEDO_API_KEY manquant. Ajoute-le dans .env.local : XEDO_API_KEY=xdk_live_...'
  );
}

export const xedo = new Xedo({
  apiKey: XEDO_API_KEY,
  baseUrl: XEDO_API_BASE_URL,
});
