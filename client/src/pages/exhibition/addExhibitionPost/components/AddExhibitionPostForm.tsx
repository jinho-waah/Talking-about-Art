import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, Upload, X, ChevronDown } from "lucide-react";
import {
  free,
  takePhoto,
  permanent,
  orient,
  era,
  genre,
  artMovement,
} from "../../ui/Tags";
import TagsCheckBox from "../../ui/TagCheckBox";
import { AddExhibitionPostFormProps, Combobox } from "../../types";
import { frameworks } from "@/utils/location/Location";

export default function AddExhibitionPostForm({
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  comboboxOpen,
  setComboboxOpen,
  comboboxValue,
  handleComboboxSelect,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  detailLocation,
  setDetailLocation,
  price,
  setPrice,
  artists,
  setArtists,
  siteLink,
  setSiteLink,
  instagramSearch,
  setInstagramSearch,
  handleImageUpload,
  previewUrls,
  handleImageDelete,
  handleCheckedFree,
  handleCheckedPhoto,
  handleCheckpermanent,
  handleCheckedOrient,
  handleCheckedGenre,
  handleCheckedEra,
  handleCheckedArtMovement,
}: AddExhibitionPostFormProps) {
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>전시 세부 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">전시 제목</Label>
            <Input
              id="title"
              placeholder="전시 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="전시에 대한 설명을 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="combobox">지역 선택</Label>
            <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  aria-expanded={comboboxOpen}
                >
                  {comboboxValue
                    ? frameworks.find((f) => f.value === comboboxValue)?.label
                    : "지역을 선택하세요"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="지역 검색..." />
                  <CommandList>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          onSelect={() =>
                            handleComboboxSelect(framework.value as Combobox)
                          }
                        >
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">시작 날짜</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">마지막 날짜</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="detail-location">상세 위치</Label>
            <Input
              id="detail-location"
              placeholder="상세 위치 ex) K관, 302호"
              value={detailLocation}
              onChange={(e) => setDetailLocation(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">전시 가격</Label>
            <Input
              id="price"
              type="number"
              placeholder="입장료 (0원 입력 시 무료)"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artists">참여 작가</Label>
            <Textarea
              id="artists"
              placeholder="작가 이름을 쉼표로 구분해 입력하세요"
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>
              태그 (추가를 원하시는 태그가 있으시다면 문의 주시면
              감사하겠습니다.)
            </Label>
            <div className="pb-2">
              <Card>
                <CardHeader>
                  <CardTitle>기본</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap">
                    <TagsCheckBox
                      items={free}
                      handleCheckedItems={handleCheckedFree}
                    />
                    <TagsCheckBox
                      items={takePhoto}
                      handleCheckedItems={handleCheckedPhoto}
                    />
                    <TagsCheckBox
                      items={permanent}
                      handleCheckedItems={handleCheckpermanent}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>지역</CardTitle>
                </CardHeader>
                <CardContent>
                  <TagsCheckBox
                    items={orient}
                    handleCheckedItems={handleCheckedOrient}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>장르</CardTitle>
                </CardHeader>
                <CardContent>
                  <TagsCheckBox
                    items={genre}
                    handleCheckedItems={handleCheckedGenre}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>시대</CardTitle>
                </CardHeader>
                <CardContent>
                  <TagsCheckBox
                    items={era}
                    handleCheckedItems={handleCheckedEra}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>미술 사조</CardTitle>
                </CardHeader>
                <CardContent>
                  <TagsCheckBox
                    items={artMovement}
                    handleCheckedItems={handleCheckedArtMovement}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-link">사이트 링크</Label>
            <Input
              id="site-link"
              placeholder="전시 관련 사이트 링크를 입력하세요"
              value={siteLink}
              onChange={(e) => setSiteLink(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram-search">인스타그램 해시태그 검색</Label>
            <Input
              id="instagram-search"
              placeholder="인스타그램 해시태그를 입력하세요"
              value={instagramSearch}
              onChange={(e) => setInstagramSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">커버 이미지 업로드</Label>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">클릭하여 업로드</span> 또는
                    드래그 앤 드롭
                    <br />
                    <span className="font-semibold">
                      이미지는 순서대로 최대 10장 업로드 됩니다
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG</p>
                </div>
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple // 여러 파일 선택 가능하도록 설정
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {previewUrls.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt="미리보기"
                      className="w-24 h-24 object-cover"
                    />
                    <X
                      className="absolute top-1 right-1 cursor-pointer text-black bg-white border border-white rounded-full"
                      style={{ padding: "2px" }}
                      onClick={() => handleImageDelete(index)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            전시 소개하기
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
