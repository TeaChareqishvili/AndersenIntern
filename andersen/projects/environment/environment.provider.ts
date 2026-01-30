import { BASE_URL } from './envionment.token';
import { API_URL } from "../auth/src/app/url/url";

export const baseUrlProvider = {
  provide: BASE_URL,
  useValue: API_URL,
};
