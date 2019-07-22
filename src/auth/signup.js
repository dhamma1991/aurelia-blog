import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService, Router, EventAggregator)
export class Signup {
  constructor(AuthService, Router, EventAggregator) {
    this.authService = AuthService;
    this.router = Router;
    this.ea = EventAggregator;
    /* Assume the error doesn't exist until it actually does exist */
    this.error = null;
  }

  signup() {
    this.error = null;
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
