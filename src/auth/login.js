import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService, Router, EventAggregator)
export class Login {
  constructor(AuthService, Router, EventAggregator) {
    this.router = Router;

    this.authService = AuthService;

    this.ea = EventAggregator;
  }

  activate() {
    /* When the component is activated, initialise error in case there is no error */
    this.error = null;
  }
  
  login() {
    this.error = null;

    /* Successful case with data */
    this.authService.login(this.name).then(data => {
      this.router.navigateToRoute('home');
    /* Unsuccessful case with data */
    }).catch(error => {
      this.error = error.message;
    })
  }
}
