import { EnvironmentVariables } from '../app/types/environment.variables';

export const environment: EnvironmentVariables = {
  production: false,
  authRedirectURL: 'http://localhost:4200/callback',
  authClientId: 'FSEGUYE7VH5ocGW9oVCrmobvR6XlIYUV',
  authDomain: 'harshanarayana.auth0.com',
  authResponseType: 'token id_token',
  authAudience: 'https://harshanarayana.auth0.com/userinfo',
  authScope: 'openid profile',
  timeSeriesAPIBase: 'https://api.openaq.org/v1',
  profileAPIBase: 'https://damp-anchorage-35481.herokuapp.com/api/v1'
};
