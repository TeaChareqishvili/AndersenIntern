import { BASE_URL, HARD_CODE_TOKEN } from './envionment.token';
import { API_URL, API_TOKEN } from '../shared/src/lib/url/url';

export const baseUrlProvider = {
  provide: BASE_URL,
  useValue: API_URL,
};

export const TokenProvider = {
  provide: HARD_CODE_TOKEN,
  useValue: API_TOKEN,
};
