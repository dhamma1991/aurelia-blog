import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {PostService} from '../../common/services/post-service';

@inject(PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  constructor(PostService) {
    this.postService = PostService;
  }

  attached() {
    /* Grab all the tags from the backend so that you can populate the input for tags on the form on new-post.html */
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error);
    })
  }

  addTag() {
    /* Add the tag to the allTags array */
    this.allTags.push(this.newTag);
    /* Ensure the newly added tag is checked */;
    this.post.tags.push(this.newTag);
    /* Clear the text box */
    this.newTag = '';
  }

  submit() {

  }

  valueChanged(newValue, oldValue) {
    //
  }
}
