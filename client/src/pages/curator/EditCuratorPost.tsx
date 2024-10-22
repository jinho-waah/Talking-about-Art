import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // 모달 UI 컴포넌트
import { DOMAIN } from "@/constants";
import authStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";

interface Show {
  id: number;
  show_name: string;
  show_place: string;
}

export default function AddCuratorPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [showId, setShowId] = useState<number | undefined>(undefined);
  const [showName, setShowName] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[]>([]);
  const navigate = useNavigate();
  const { userId } = authStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showId) return;

    const newPost = {
      curator_id: userId,
      show_id: showId,
      title: title.trim(),
      content: content.trim(),
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "), // "YYYY-MM-DD HH:MM:SS" 형식으로 변경
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      like_count: 0,
    };

    try {
      const response = await fetch(`${DOMAIN}api/uploadCuratorPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        alert("글이 성공적으로 업로드되었습니다!");
        setTitle("");
        setContent("");
        setShowId(undefined);
        navigate(pageRoutes.curatorList);
      } else {
        alert("글 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("글 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${DOMAIN}api/searchShowId?query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data: Show[] = await response.json();
      setSearchResults(data); // 검색 결과 업데이트
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSelectShow = (id: number, name: string) => {
    setShowId(id);
    setShowName(name);
    handleCloseModal();
  };

  const isFormValid =
    title.trim() !== "" && content.trim() !== "" && showId !== undefined;

  return (
    <div className="container mx-auto px-1 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">큐레이터 글 작성</CardTitle>
          <CardDescription>
            커뮤니티에 여러분의 생각을 공유하세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                placeholder="여기에 내용을 작성하세요"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Button variant="outline" onClick={handleOpenModal}>
                {showName ? `선택한 전시:  ${showName}` : "전시 검색"}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!isFormValid}>
              업로드
            </Button>
          </CardFooter>
        </form>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>전시 검색</DialogTitle>
              <DialogDescription>
                검색어를 입력하고 원하는 전시를 선택하세요.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="flex">
                <Input
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>검색</Button>
              </div>
              <div className="mt-4">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Button
                      key={result.id}
                      variant="outline"
                      onClick={() =>
                        handleSelectShow(result.id, result.show_name)
                      }
                      className="block w-full text-left mt-1"
                    >
                      {result.show_name} - {result.show_place}
                    </Button>
                  ))
                ) : (
                  <p>검색 결과가 없습니다.</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
