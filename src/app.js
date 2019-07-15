import bootstrap from 'bootstrap';
import { PLATFORM } from "aurelia-framework";
import {inject} from 'aurelia-framework';
import {PostService} from './common/services/post-service';

@inject(PostService)
export class App {

  constructor(PostService) {
    this.postService = PostService;
    /* Get the current year to use (currently) in the footer of the app */
    this.currentYear = moment().format('YYYY');
  }

  /* Attached is often the preferred life cycle hook for backend calls */ 
  attached() {
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
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View Post'},
    ]);
  }
}
