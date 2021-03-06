import BaseHttpService from "./base-http.service";

export default class AuthService extends BaseHttpService {
  async signin(username, password) {
    console.log(username, password);
    const result = await this.post(`auth/signin`, {
      username,
      password,
    });

    const accessToken = result.data.accessToken;
    console.log(accessToken);
    this.saveToken(accessToken);
    return result.data.username;
  }

  async signup(
    username,
    password,
    email,
    fullname,
    number,
    address,
    postalcode,
    city
  ) {
    await this.post(`auth/signup`, {
      username,
      password,
      email,
      fullname,
      number,
      address,
      postalcode,
      city,
    });
  }

  async signout() {
    this.removeToken();
  }
}
