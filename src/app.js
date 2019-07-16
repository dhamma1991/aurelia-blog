import { PLATFORM } from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {PostService} from './common/services/post-service';
import {AuthService} from './common/services/auth-service';
import bootstrap from 'bootstrap';
import moment from 'moment';

@inject(PostService, AuthService)
export class App {

  constructor(PostService) {
    this.postService = PostService;
    this.authService = AuthService;
    /* Get the current year to use (currently) in the footer of the app */
    this.currentYear = moment().format('YYYY');
  }

  /* Attached is often the preferred life cycle hook for backend calls */ 
  attached() {
    this.currentUser = this.authService.currentUser;

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
}
