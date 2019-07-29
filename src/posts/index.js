/* Allows usage of dependency injection, this ensures the same instance of PostService across the entire app */
import {inject} from 'aurelia-framework';
/* Import the PostService which contains the post data */
import {PostService} from '../common/services/post-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class Index {
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  /* This fires when the component is attached to the DOM */
  attached() {
    /* Go get the posts data, and then... */
    this.postService.allPostPreviews().then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    })
  }
}
