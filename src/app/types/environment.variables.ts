export interface EnvironmentVariables {
  production: boolean;
  authRedirectURL: string;
  authClientId: string;
  authDomain: string;
  authResponseType: string;
  authAudience: string;
  authScope: string;
  timeSeriesAPIBase?: string;
}
