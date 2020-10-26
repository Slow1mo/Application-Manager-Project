import { observable, action } from "mobx";

export default class UserStore {
  @observable username = null;

  constructor(authService) {
    this.authService = authService;
  }

  @action
  async signin(username, password) {
    this.username = await this.authService.signin(username, password);
  }

  @action
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
    return this.authService.signup(
      username,
      password,
      email,
      fullname,
      number,
      address,
      postalcode,
      city
    );
  }

  @action
  signout() {
    this.username = null;
    this.authService.removeToken();
  }
}
