import bootstrap from 'bootstrap';
import { PLATFORM } from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {PostService} from './common/services/post-service';

export class App {
  message = 'Hello World!';

  configureRouter(config, router) {
    config.title = "Chris's Blog";

    /* Pass an array of routes to config.map */
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All Posts'},
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post'},
    ]);
  }
}
