export interface LikeOptionsBase {
  userId: number;
}

export type LikeOptions =
  | LikeOptionsBase & {
      ordinaryPostId?: number;
      curatorPostId?: number;
      commentId?: number;
    };

