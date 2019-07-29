import {Redirect} from 'aurelia-router';

export class AuthorizeStep {
    /* navigationInstruction is the information from the router configuration */
    /* next tells the app what to do next after authorization */
    run(navigationInstruction, next) {
        // If the user needs to be logged in, check for login
        /* The some() array function means that we just need one hit */
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
            // Check for login
            // If the user is not logged in, send them to login
            return next.cancel(new Redirect('login'));
        }
        return next();
    }
}