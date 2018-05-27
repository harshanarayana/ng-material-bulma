export interface UserDetails {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  gender: string;
  locale: string;
  updated_at: string;
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  acr: string;
  amr: string[];
  at_hast: string;
  nonce: string;
}

export interface AuthResult {
  accessToken: string;
  idToken: string;
  expiresIn: number;
  tokenType: string;
  appState?: string;
  refreshToken?: string;
  state: string;
  scope?: string;
  idTokenPayload: UserDetails;
}
