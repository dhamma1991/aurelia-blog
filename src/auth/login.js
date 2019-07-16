import {inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService)
export class Login {
  constructor(AuthService) {
    this.authService = AuthService;
  }
  
  login() {
    this.authService.login(this.name).then(data => {
      console.log(data.user);
    }).catch(error => {
      console.log(error.message);
    })
  }
}
