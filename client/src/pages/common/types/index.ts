export interface LikeOptionsBase {
  userId: number;
}

export type LikeOptions =
  | LikeOptionsBase & {
      ordinaryPostId?: number;
      curatorPostId?: number;
      commentId?: number;
    };

export type TargetType = "ordinaryPost" | "comments" | "curatorPost";

export interface UseToggleLikeProps {
  targetType: TargetType;
  targetId: number | undefined;
  userId: number | null;
}
