import {Redirect} from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService)
export class AuthorizeStep {
    constructor(AuthService) {
        this.authService = AuthService;
    }
    /* navigationInstruction is the information from the router configuration */
    /* next tells the app what to do next after authorization */
    run(navigationInstruction, next) {
        // If the user needs to be logged in, check for login
        /* The some() array function means that we just need one hit */
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
            // Check for login, if the currentUser is null...
            if (!this.authService.currentUser) {
                // Send them to login
                return next.cancel(new Redirect('login'));
            }
        }
        return next();
    }
}