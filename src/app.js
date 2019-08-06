import { PLATFORM } from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {PostService} from './common/services/post-service';
import {AuthService} from './common/services/auth-service';
import {AuthorizeStep} from './pipeline-steps/authorize-step';
import bootstrap from 'bootstrap';
import moment from 'moment';
import * as toastr from 'toastr';

@inject(PostService, AuthService, EventAggregator, I18N)
export class App {

  constructor(PostService, AuthService, EventAggregator, I18N) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.i18n = I18N

    /* Get the current year to use (currently) in the footer of the app */
    this.currentYear = moment().format('YYYY');
  };

  /* Attached is often the preferred life cycle hook for backend calls */ 
  attached() {
    console.log(this.i18n.getLocale())
    this.currentUser = this.authService.currentUser;
    /* This subscribe is talking to the publish found in login.js 
      This is needed because the frontend does not automatically know when the user has changed
      You have to explicitly tell it using publish and subscribe 
      Storing the ea in a property called 'subscription' in this case allows the property to be used within the detached life cycle hook */
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    });

    this.updateTags();
    /* Using ea, any time that post-updated gets published, updateTags() will be called */
    this.postSubscription = this.ea.subscribe('post-updated', updatedAt => {
      this.updateTags();
    });

    this.toastSubscription = this.ea.subscribe('toast', toast => {
      toastr[toast.type](toast.message);
    });
  };

  updateTags() {
    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    })
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "Chris's Blog";
    config.addAuthorizeStep(AuthorizeStep);

    /* Pass an array of routes to config.map */
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign Up'},
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      { route: 'new-post', name: 'new-post', moduleId: PLATFORM.moduleName('posts/new-post'), title: 'New Post', settings: {auth: true}},
      /* Go to the route post, pass a variable within the url string called slug */
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post'},
      { route: 'post/:slug/edit', name: 'edit-post', moduleId: PLATFORM.moduleName('posts/edit-post'), title: 'Edit Post', settings: {auth: true}},
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Post by Tag'},
    ]);
  }

  detached() {
    /* Dispose of the subscription created in the attached() life cycle hook
      This is the proper way to clean up after a subscription */
    this.subscription.dispose();
    this.postSubscription.dispose();
    this.toastSubscription.dispose();
  }

  logout() {
    this.authService.logout().then(data => {
      /* Publishing the user data here allows the subscribe in the attached() method above to catch the change */
      this.ea.publish('user', null);
      this.ea.publish('toast', {
        type: 'success',
        message: 'You have successfully logged out'
      });
      /* Upon successful logout, navigate the user to the home page */
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    })
  }

  setLocale(locale) {
    console.log(locale);
    this.i18n.setLocale(locale)
    .then( () => {
    })
    .catch(error => {
      console.log(error);
    });
  }
}
