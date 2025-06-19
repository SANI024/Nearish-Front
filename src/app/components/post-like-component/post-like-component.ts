import { Component, Input } from '@angular/core';
import { PostLikeService } from '../../Services/post-like-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-like-component',
  imports: [CommonModule],
  templateUrl: './post-like-component.html',
  styleUrl: './post-like-component.css'
})
export class PostLikeComponent {

   @Input() postId!: number;
  liked = false;
  error? = '';
   

  constructor(private postLikeService: PostLikeService) {}

  toggleLike() {
    if (this.liked) {
      this.postLikeService.unlikePost(this.postId).subscribe({
        next: (res) => {
          if (res.success) this.liked = false;
          else this.error = res.message;
        },
        error: (err) => (this.error = 'Failed to unlike post.'),
      });
    } else {
      this.postLikeService.likePost(this.postId).subscribe({
        next: (res) => {
          if (res.success) this.liked = true;
          else this.error = res.message;
        },
        error: (err) => (this.error = 'Failed to like post.'),
      });
    }
  }
}
