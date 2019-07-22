import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';
import {AuthService} from '../common/services/auth-service';

@inject(PostService, AuthService)
export class View {
  constructor(PostService, AuthService) {
    this.postService = PostService;
    this.authService = AuthService;
  }

  activate(params) {
    this.error = '';
    /* The find method here is provided by the post-service js
      It returns either the post or an error */
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.error = error.message;
    })
  }
}
