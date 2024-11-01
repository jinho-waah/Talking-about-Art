import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import authStore from "@/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { getKstTimeString } from "@/lib/utils";
import EditOrdinaryPostForm from "./components/EditOrdinaryPostForm";
import { useFetchOrdinaryPost } from "../hooks/useFetchOrdinaryPost";
import { useUpdateOrdinaryPost } from "./hooks/useUpdateOrdinaryPost";

export default function EditOrdinaryPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userId, role } = authStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: post, isLoading, error } = useFetchOrdinaryPost(id!, userId);
  const updateMutation = useUpdateOrdinaryPost();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      if (post.author_id !== userId && role !== "admin") {
        alert("접근 권한이 없습니다.");
        navigate(pageRoutes.main);
      }
    }
  }, [post]);

  const handleSubmit = () => {
    const updatedPost = {
      title: title.trim(),
      content: content.trim(),
      updated_at: getKstTimeString(),
    };
    updateMutation.mutate({ id: id!, updatedPost });
  };

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post data</div>;

  return (
    <div className="container mx-auto px-1 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">큐레이터 글 수정</CardTitle>
          <CardDescription>
            기존의 글을 수정하여 업데이트하세요.
          </CardDescription>
        </CardHeader>
        <EditOrdinaryPostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!isFormValid}
          >
            수정 완료
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
