import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PostService} from '../common/services/post-service';

@inject(PostService, Router, EventAggregator)
export class NewPost {
  constructor(PostService, Router, EventAggregator) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.router = Router;
  }

  attached() {
    /* This is used primarily to tell aurelia that it should expect tags to be an array
      Without this, if you try checking a checkbox on the new-post form, all the options will become checked */
    this.post = {
      title: '',
      body: '',
      tags: []
    };
    /* Grab all the tags from the backend so that you can populate the input for tags on the form on new-post.html */
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      console.log(error);
    })
  }

  newPost() {
    this.postService.create(this.post).then(data => {
      /* Publish to something called post-updated, publish the date */
      this.ea.publish('post-updated', Date());
      /* So when the post is added, the app goes to that post's view
        It does this by going to post-view and then passing through data.slug as the :slug required by that route */
      this.router.navigateToRoute('post-view', {slug: data.slug});
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
}
