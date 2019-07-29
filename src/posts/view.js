import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';

@inject(PostService, AuthService, EventAggregator, Router)
export class View {
  constructor(PostService, AuthService, EventAggregator, Router) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.router = Router;
  }

  activate(params) {
    /* The find method here is provided by the post-service js
      It returns either the post or an error */
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      this.router.navigateToRoute('home');
    })
  }
}
