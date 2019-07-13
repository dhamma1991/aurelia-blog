/* Allows usage of dependency injection, this ensures the same instance of PostService across the entire app */
import {inject} from 'aurelia-framework';
/* Import the PostService which contains the post data */
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class Index {
  constructor(PostService) {
    this.postService = PostService;
  }

  /* This fires when the component is attached to the DOM */
  attached() {
    /* Ensure error is clear when the component is first attached to the DOM
      Catch will ensure that the error does get set if one is thrown */
    this.error = '';

    /* Go get the posts data, and then... */
    this.postService.allPostPreviews().then(data => {
      this.posts = data.posts;
    }).catch(error => {
      /* Set the error property of this view model to the contents of any errors thrown from the backend */
      this.error = error.message;
    })
  }
}
