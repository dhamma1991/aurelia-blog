import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';

@inject(PostService, Router)
export class NewPost {
  constructor(PostService, Router) {
    this.postService = PostService;
    this.router = Router;
  }

  attached() {
    /* Grab all the tags from the backend so that you can populate the input for tags on the form on new-post.html */
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error);
    })
  }

  newPost() {
    this.postService.create(this.post).then(data => {
      /* So when the post is added, the app goes to that post's view
        It does this by going to post-view and then passing through data.slug as the :slug required by that route */
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    })
  }
}
