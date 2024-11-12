import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, Share2, Ellipsis } from "lucide-react";
import { FormatDate } from "@/lib/utils";
import { CuratorPostTopProps } from "../../types";
import { Role } from "@/constants";
import { createPortal } from "react-dom";
import { lazy, Suspense } from "react";
import { LoadingPage } from "@/pages/loading/components/LoadingPage";

const Modal = lazy(() => import("../../../common/components/Modal"));

export default function CuratorPostTop({
  post,
  userId,
  role,
  toggleModal,
  isModalOpen,
  handleEdit,
  handleDelete,
  handleLikeToggle,
  isLiked,
  likeCount,
}: CuratorPostTopProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{post.curator_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.curator_name}</p>
              <p className="text-sm text-muted-foreground">
                {FormatDate(post.created_at)}
              </p>
            </div>
          </div>
          {((userId !== null && userId === post.curator_id) ||
            role === Role.ADMIN) && (
            <Button variant="ghost" size="icon" onClick={toggleModal}>
              <Ellipsis />
            </Button>
          )}
          {isModalOpen &&
            createPortal(
              <Suspense fallback={<LoadingPage />}>
                <Modal
                  isModalOpen={isModalOpen}
                  toggleModal={toggleModal}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </Suspense>,
              document.body
            )}
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-muted-foreground mb-4">{post.content}</p>
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={handleLikeToggle}>
            <ThumbsUp
              className={`mr-2 h-4 w-4 ${isLiked ? "text-blue-500" : ""}`}
            />
            좋아요 {likeCount}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
