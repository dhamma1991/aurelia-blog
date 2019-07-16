import {inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService)
export class Login {
  constructor(AuthService) {
    this.authService = AuthService;
  }
  
  login() {

  }
