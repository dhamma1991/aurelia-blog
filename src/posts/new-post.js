import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class NewPost {
  constructor(PostService) {
    this.postService = PostService;
  }

  newPost() {
    this.postService.create(this.post).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    })
  }
}
