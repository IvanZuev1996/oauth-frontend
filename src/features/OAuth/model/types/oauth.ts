export interface OAuthAuthorizeParams {
  client_id: string;
  response_type: string;
  code_challenge: string;
  code_challenge_method: string;
  scope?: string;
  redirect_uri?: string;
  state?: string;
}
