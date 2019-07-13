import bootstrap from 'bootstrap';

export class App {
  message = 'Hello World!';

  configureRouter(config, router) {
    config.title = "Chris's Blog";

    /* Pass an array of routes to config.map */
    config.map([
      { route: '', name: 'home', moduleId: 'posts/index', title: 'All Posts'}
    ]);
  }
}
