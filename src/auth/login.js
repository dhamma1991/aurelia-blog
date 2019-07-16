import {inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService)
export class Login {
  constructor(AuthService) {
    this.authService = AuthService;
  }

  activate() {
    /* When the component is activated, initialise error in case there is no error */
    this.error = null;
  }
  
  login() {
    this.authService.login(this.name).then(data => {
      console.log(data.user);
    }).catch(error => {
      this.error = error.message;
    })
  }
}
