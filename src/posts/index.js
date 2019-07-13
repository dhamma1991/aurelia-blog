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
    /* Go get the posts data, and then... */
    this.postService.allPostPreviews().then(data => {
      if(data.errors) {
        // Handle the errors somehow
      } else {
        /* If there are no errors, data.posts will show up which is an array of posts */
        this.posts = data.posts;
        console.log(this.posts);
      }
    })
  }
}
