import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface CarouselProps {
  items: string[]; // 이미지 URL이나 다른 콘텐츠 배열
  interval?: number; // 자동 재생 시간 간격 (밀리초)
}

export default function Carousel({ items, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이전 슬라이드로 이동
  function handlePrev() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }

  // 다음 슬라이드로 이동
  function handleNext() {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }

  // 자동 재생 기능 (선택 사항)
  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNext();
    }, interval);

    return () => {
      clearInterval(autoSlide);
    };
  }, [currentIndex, interval]);

  // 스와이프 기능 추가
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="relative w-full mx-auto overflow-hidden" // 높이를 더 높게 설정
    >
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="min-w-full aspect-video rounded-lg mb-6 w-full object-cover"
            style={{
              backgroundImage: `url(${item})`,
              backgroundPosition: "center", // 이미지가 중앙에 위치하도록 설정
              backgroundSize: "cover", // 컨테이너를 채우도록 설정
              backgroundRepeat: "no-repeat", // 반복 방지
              aspectRatio: "16 / 9", // 16:9 비율 설정
            }}
          />
        ))}
      </div>

      {/* 인디케이터 */}
      {items.length > 1 && (
        <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
