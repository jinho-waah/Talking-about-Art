import { useCallback, useEffect, useState } from "react";
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
} from "./ui/Tags";
import TagsCheckBox from "./ui/TagCheckBox";
import authStore from "@/store/authStore";
import { DOMAIN } from "@/constants";
import { useNavigate } from "react-router-dom";

type Combobox =
  | "Seoul"
  | "Busan"
  | "Daegu"
  | "Incheon"
  | "Gwangju"
  | "Daejeon"
  | "Ulsan"
  | "Sejong"
  | "Gyeonggi"
  | "Chungbuk"
  | "Chungnam"
  | "Jeonnam"
  | "Jeonbuk"
  | "Gyeongbuk"
  | "Gyeongnam"
  | "Gangwon"
  | "Jeju"
  | null;

const frameworks = [
  {
    value: "Seoul",
    label: "서울",
  },
  {
    value: "Busan",
    label: "부산",
  },
  {
    value: "Daegu",
    label: "대구",
  },
  {
    value: "Incheon",
    label: "인천",
  },
  {
    value: "Gwangju",
    label: "광주",
  },
  {
    value: "Daejeon",
    label: "대전",
  },
  {
    value: "Ulsan",
    label: "울산",
  },
  {
    value: "Sejong",
    label: "세종",
  },
  {
    value: "Gyeonggi",
    label: "경기",
  },
  {
    value: "Chungbuk",
    label: "충북",
  },
  {
    value: "Chungnam",
    label: "충남",
  },
  {
    value: "Jeonnam",
    label: "전남",
  },
  {
    value: "Jeonbuk",
    label: "전북",
  },
  {
    value: "Gyeongbuk",
    label: "경북",
  },
  {
    value: "Gyeongnam",
    label: "경남",
  },
  {
    value: "Gangwon",
    label: "강원",
  },
  {
    value: "Jeju",
    label: "제주",
  },
];

export default function AddExhibitionPost() {
  const { galleryId } = authStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState(() => localStorage.getItem("title") || "");
  const [galleryName, setGalleryName] = useState<string>("");
  const [description, setDescription] = useState(
    () => localStorage.getItem("description") || ""
  );
  const [startDate, setStartDate] = useState(
    () => localStorage.getItem("startDate") || ""
  );
  const [endDate, setEndDate] = useState(
    () => localStorage.getItem("endDate") || ""
  );
  const [detailLocation, setDetailLocation] = useState(
    () => localStorage.getItem("detailLocation") || ""
  );
  const [price, setPrice] = useState<number>(
    parseFloat(localStorage.getItem("price") || "0")
  );
  const [artists, setArtists] = useState(
    () => localStorage.getItem("artists") || ""
  );
  const [siteLink, setSiteLink] = useState(
    () => localStorage.getItem("siteLink") || ""
  );
  const [instagramSearch, setInstagramSearch] = useState(
    () => localStorage.getItem("instagramSearch") || ""
  );
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<number[]>([]);
  const [selectedPermanent, setSelectedPermanent] = useState<number[]>([]);
  const [selectedOrient, setSelectedOrient] = useState<number[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [selectedEra, setSelectedEra] = useState<number[]>([]);
  const [selectedArtMovement, setSelectedArtMovement] = useState<number[]>([]);
  const [selectedFree, setSelectedFree] = useState<number[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);

  const [comboboxOpen, setComboboxOpen] = useState<true | false>(false);
  const [comboboxValue, setComboboxValue] = useState<Combobox>(null);

  const handleComboboxSelect = (value: Combobox) => {
    setComboboxValue(value);
    setComboboxOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((file) => file.name);
      setImageNames((prevNames) => [...prevNames, ...names]); // 기존 파일에 추가로 저장
    }
  };

  const handleImageDelete = (indexToDelete: number) => {
    setImageNames((prevNames) =>
      prevNames.filter((_, index) => index !== indexToDelete)
    );
  };

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const handleCheckedFree = useCallback((items: number[]) => {
    setSelectedFree(items);
  }, []);

  const handleCheckedPhoto = useCallback((items: number[]) => {
    setSelectedPhoto(items);
  }, []);

  const handleCheckpermanent = useCallback((items: number[]) => {
    setSelectedPermanent(items);
  }, []);

  const handleCheckedOrient = useCallback((items: number[]) => {
    setSelectedOrient(items);
  }, []);

  const handleCheckedGenre = useCallback((items: number[]) => {
    setSelectedGenre(items);
  }, []);

  const handleCheckedEra = useCallback((items: number[]) => {
    setSelectedEra(items);
  }, []);

  const handleCheckedArtMovement = useCallback((items: number[]) => {
    setSelectedArtMovement(items);
  }, []);

  useEffect(() => {
    setSelectedTags(() => {
      const items = [
        ...selectedPhoto,
        ...selectedOrient,
        ...selectedGenre,
        ...selectedEra,
        ...selectedArtMovement,
        ...selectedFree,
        ...selectedPermanent,
      ];
      const orderedItmes = items.sort((a, b) => a - b);
      return orderedItmes;
    });
  }, [
    selectedPhoto,
    selectedOrient,
    selectedGenre,
    selectedEra,
    selectedArtMovement,
    selectedFree,
    selectedPermanent,
  ]);

  useEffect(() => {
    // 데이터가 변경될 때마다 localStorage에 저장
    saveToLocalStorage("title", title);
    saveToLocalStorage("description", description);
    saveToLocalStorage("startDate", startDate);
    saveToLocalStorage("endDate", endDate);
    saveToLocalStorage("detailLocation", detailLocation);
    saveToLocalStorage("price", price.toString());
    saveToLocalStorage("artists", artists);
    saveToLocalStorage("siteLink", siteLink);
    saveToLocalStorage("instagramSearch", instagramSearch);
  }, [
    title,
    description,
    startDate,
    endDate,
    detailLocation,
    price,
    artists,
    siteLink,
    instagramSearch,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const showSearch = `${title} ${artists} ${detailLocation}`;

    // FormData 객체 생성
    const formData = new FormData();

    try {
      const response = await fetch(`${DOMAIN}api/galleryname/${galleryId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("갤러리 이름을 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      setGalleryName(data.gallery_name); // 받아온 갤러리 이름
    } catch (error) {
      console.error("에러 발생:", error);
    }

    // 기본 데이터 추가
    formData.append("show_name", title);
    formData.append("show_artist", artists);
    formData.append("show_term_start", startDate);
    formData.append("show_term_end", endDate);
    formData.append("show_city", comboboxValue || "");
    formData.append("gallery", galleryId?.toString() || "");
    formData.append("show_place", galleryName);
    formData.append("show_search", showSearch);
    formData.append("show_price", price.toString());
    formData.append("show_link", siteLink);
    formData.append("show_imgs", imageNames.length.toString());
    formData.append("show_brief", description);
    formData.append("instagram_search", instagramSearch);
    formData.append("on_display", "1");
    formData.append("show_place_detail", detailLocation);

    // 선택된 태그 배열을 JSON 문자열로 변환해 추가
    formData.append("selectedTags", JSON.stringify(selectedTags));

    // 이미지 파일을 FormData에 추가
    const imageInput = document.getElementById("image") as HTMLInputElement;
    if (imageInput && imageInput.files) {
      Array.from(imageInput.files).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await fetch(`${DOMAIN}api/exhibitionPosts`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("전시 정보 등록에 실패했습니다.");
      }
      const result = await response.json();
      console.log("전시 정보가 성공적으로 등록되었습니다:", result);

      localStorage.removeItem("title");
      localStorage.removeItem("description");
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      localStorage.removeItem("detailLocation");
      localStorage.removeItem("price");
      localStorage.removeItem("artists");
      localStorage.removeItem("siteLink");
      localStorage.removeItem("instagramSearch");

      navigate("/currentlist");
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className="container mx-auto px-1 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">새로운 전시 소개하기</h1>

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
                        ? frameworks.find((f) => f.value === comboboxValue)
                            ?.label
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
                                handleComboboxSelect(
                                  framework.value as Combobox
                                )
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
                      onChange={(e) => {
                        const formattedDate = e.target.value.replace(/-/g, "."); // 날짜 형식을 변환
                        setStartDate(formattedDate);
                      }}
                      className="pl-10"
                      required
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
                      onChange={(e) => {
                        const formattedDate = e.target.value.replace(/-/g, "."); // 날짜 형식을 변환
                        setEndDate(formattedDate);
                      }}
                      className="pl-10"
                      required
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
                <Label htmlFor="instagram-search">
                  인스타그램 해시태그 검색
                </Label>
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
                        <span className="font-semibold">클릭하여 업로드</span>{" "}
                        또는 드래그 앤 드롭
                        <br />
                        <span className="font-semibold">
                          이미지는 순서대로 업로드 됩니다
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG
                      </p>
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
                {imageNames.length > 0 && (
                  <div className="mt-2 text-center text-sm text-muted-foreground">
                    {imageNames.map((name, index) => (
                      <p key={index} className="flex">
                        업로드된 파일: {name}
                        <X
                          className="pb-1 cursor-pointer"
                          onClick={() => handleImageDelete(index)}
                        />
                      </p>
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
      </div>
    </div>
  );
}
