import { useCallback, useEffect, useState } from "react";
import authStore from "@/store/authStore";
import { Combobox } from "../types";
import AddExhibitionPostForm from "./components/AddExhibitionPostForm";
import { usePostExhibition } from "./hooks/usePostExhibition";
import { useFetchGalleryName } from "./hooks/useFetchGalleryName";

export default function AddExhibitionPost() {
  const { galleryId } = authStore();
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
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [comboboxOpen, setComboboxOpen] = useState<true | false>(false);
  const [comboboxValue, setComboboxValue] = useState<Combobox>(null);

  const handleComboboxSelect = (value: Combobox) => {
    setComboboxOpen(false);
    setComboboxValue(value);
  };

  useFetchGalleryName(galleryId, setGalleryName);

  const mutation = usePostExhibition();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((file) => file.name);
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      const filesArray = Array.from(files);
      setSelectedFiles([...selectedFiles, ...filesArray]);

      setImageNames((prevNames) => [...prevNames, ...names]);
      setPreviewUrls((prevUrls) => [...prevUrls, ...previews]);
    }
  };

  const handleImageDelete = (indexToDelete: number) => {
    setImageNames((prevNames) =>
      prevNames.filter((_, index) => index !== indexToDelete)
    );
    setPreviewUrls((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToDelete)
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

    const formData = new FormData();
    const formattedStartDate = startDate.replace(/-/g, ".");
    const formattedEndDate = endDate.replace(/-/g, ".");

    formData.append("show_name", title);
    formData.append("show_artist", artists);
    formData.append("show_term_start", formattedStartDate);
    formData.append("show_term_end", formattedEndDate);
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

    formData.append("selectedTags", JSON.stringify(selectedTags));

    selectedFiles.forEach((file) => formData.append("images", file));

    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-1">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">새로운 전시 소개하기</h1>

        <AddExhibitionPostForm
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          comboboxOpen={comboboxOpen}
          setComboboxOpen={setComboboxOpen}
          comboboxValue={comboboxValue}
          handleComboboxSelect={handleComboboxSelect}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          detailLocation={detailLocation}
          setDetailLocation={setDetailLocation}
          price={price}
          setPrice={setPrice}
          artists={artists}
          setArtists={setArtists}
          siteLink={siteLink}
          setSiteLink={setSiteLink}
          instagramSearch={instagramSearch}
          setInstagramSearch={setInstagramSearch}
          handleImageUpload={handleImageUpload}
          previewUrls={previewUrls}
          handleImageDelete={handleImageDelete}
          handleCheckedFree={handleCheckedFree}
          handleCheckedPhoto={handleCheckedPhoto}
          handleCheckpermanent={handleCheckpermanent}
          handleCheckedOrient={handleCheckedOrient}
          handleCheckedGenre={handleCheckedGenre}
          handleCheckedEra={handleCheckedEra}
          handleCheckedArtMovement={handleCheckedArtMovement}
        />
      </div>
    </div>
  );
}
