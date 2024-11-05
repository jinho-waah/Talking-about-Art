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
} from "@/components/ui/dialog";
import { CuratorPostFormProps } from "../../types";

export default function AddCuratorPostForm({
  title,
  setTitle,
  content,
  setContent,
  handleOpenModal,
  showName,
  handleSubmit,
  isFormValid,
  isModalOpen,
  setIsModalOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchResults,
  handleSelectShow,
}: CuratorPostFormProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">큐레이터 글 작성</CardTitle>
        <CardDescription>커뮤니티에 여러분의 생각을 공유하세요</CardDescription>
      </CardHeader>

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
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!isFormValid}
        >
          업로드
        </Button>
      </CardFooter>

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
  );
}
