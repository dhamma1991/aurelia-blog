import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';

@inject(AuthService, PostService, Router, EventAggregator)
export class EditPost {
  constructor(AuthService, PostService, Router, EventAggregator) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.authService = AuthService;
    this.router = Router;
  };

  activate(params) {
    /* Go grab the post from the post slug that was passed through */
    this.postService.find(params.slug).then(data => {
      // First check that the logged in user is the author of the post
      if (data.post.author !== this.authService.currentUser) {
        this.router.navigateToRoute('home');
      }
      this.post = data.post;
    }).catch(error => {
      console.log(error);
    })

    /* The post-form custom element requires a title, so that is passed through from here */
    this.title = "Edit Post";
  };

  editPost() {
    this.postService.update(this.post).then(data => {
      /* Publish to something called post-updated, publish the date */
      this.ea.publish('post-updated', Date());
      /* So when the post is added, the app goes to that post's view
        It does this by going to post-view and then passing through data.slug as the :slug required by that route */
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    });
  };
};
