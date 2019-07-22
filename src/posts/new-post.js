import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class NewPost {
  constructor(PostService) {
    this.postService = PostService;
  }
}
