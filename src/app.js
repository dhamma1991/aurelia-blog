import { PLATFORM } from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from './common/services/post-service';
import {AuthService} from './common/services/auth-service';
import bootstrap from 'bootstrap';
import moment from 'moment';

@inject(PostService, AuthService, EventAggregator)
export class App {

  constructor(PostService, AuthService, EventAggregator) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;

    /* Get the current year to use (currently) in the footer of the app */
    this.currentYear = moment().format('YYYY');
  }

  /* Attached is often the preferred life cycle hook for backend calls */ 
  attached() {
    this.currentUser = this.authService.currentUser;
    /* This subscribe is talking to the publish found in login.js 
      This is needed because the frontend does not automatically know when the user has changed
      You have to explicitly tell it using publish and subscribe 
      Storing the ea in a property called 'subscription' in this case allows the property to be used within the detached life cycle hook */
    this.subscription = this.ea.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    })

    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    })
  }

  configureRouter(config, router) {
    config.title = "Chris's Blog";

    /* Pass an array of routes to config.map */
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log In'},
      /* Go to the route post, pass a variable within the url string called slug */
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post'},
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View Post by Tag'},
    ]);
  }

  detached() {
    /* Dispose of the subscription created in the attached() life cycle hook
      This is the proper way to clean up after a subscription */
    this.subscription.dispose();
  }
}
