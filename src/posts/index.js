/* Allows usage of dependency injection, this ensures the same instance of PostService across the entire app */
import {inject} from 'aurelia-framework';
/* Import the PostService which contains the post data */
import {PostService} from '../common/services/post-service';

@inject(PostService)
export class Index {
  constructor(PostService) {
    this.PostService = PostService;
  }
}
