import fetch from 'fetch-register';

interface Configuration {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  restLoginUrl?: string;
  tokenHost?: string;
}

interface LoginResponseData {
  BhRestToken: string;
  restUrl: string;
}

class Bullhorn {
  private _config: Configuration;
  private _defaultSettings: Configuration = {
    client_id: null,
    client_secret: null,
    username: null,
    password: null,
    restLoginUrl: 'https://rest.bullhornstaffing.com/rest-services/login',
    tokenHost: 'https://auth.bullhornstaffing.com',
  };
  public restUrl: string = '';

  constructor(config: Configuration) {
    this.setConfig(config);
  }

  setConfig(config: Configuration) {
    this._config = Object.assign({}, this._defaultSettings, config);
  }

  fetch(input: string, init?: RequestInit): Promise<Response> {
    return fetch(this.restUrl + input, init);
  }

  async login(): Promise<LoginResponseData> {
    // authorizeUrl
    const req = await fetch(`${this._config.tokenHost}/oauth/authorize?response_type=code&client_id=${this._config.client_id}&action=Login&username=${this._config.username}&password=${this._config.password}`, {
      method: 'POST'
    });
    const authorizationCode = req.url.split('code=')[1].split('&')[0];
    const req_1 = await fetch(`${this._config.tokenHost}/oauth/token?grant_type=authorization_code&code=${authorizationCode}&client_id=${this._config.client_id}&client_secret=${this._config.client_secret}`, {
      method: 'POST'
    });
    const json = await req_1.json();
    /* { access_token: 'x',
        token_type: 'Bearer',
        expires_in: 600,
        refresh_token: 'x' } */
    const req_2 = await fetch(`${this._config.restLoginUrl}?version=*&access_token=${json.access_token}&ttl=999`);
    const json2 = await req_2.json();
    /*
        { BhRestToken: 'x',
    restUrl: 'x' } */
    this.restUrl = json2.restUrl;
    return json2;
  }
}

export default Bullhorn;