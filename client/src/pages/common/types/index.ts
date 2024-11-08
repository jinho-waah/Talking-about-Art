export interface LikeOptionsBase {
  userId: number;
}

export type LikeOptions =
  | (LikeOptionsBase & {
      postId: number;
      curatorPostId?: null;
      commentId?: null;
    })
  | (LikeOptionsBase & {
      curatorPostId: number;
      postId?: null;
      commentId?: null;
    })
  | (LikeOptionsBase & {
      commentId: number;
      postId?: null;
      curatorPostId?: null;
    });
