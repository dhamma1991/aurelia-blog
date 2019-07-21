import {inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService)
export class Signup {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  signup() {
    /* name is what was used for the two-way binding on the input on signup.html */
    this.authService.signup(this.name).then(data => {
      /* What happens here is very similiar to the login method found in login.js */
      this.ea.publish('user', data.name);
      this.router.navigateToRoute('login');
    }).catch(error => {
      this.error = error.message;
    });
  }
}
