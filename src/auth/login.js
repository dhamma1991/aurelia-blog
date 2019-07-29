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
  
  login() {
    /* Successful case with data */
    this.authService.login(this.name).then(data => {
      /* Now the user data has been published, anywhere you want to get the data can be reached with subscribe */
      this.ea.publish('user', data.name);
      this.router.navigateToRoute('home');
    /* Unsuccessful case with data */
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    })
  }
}
