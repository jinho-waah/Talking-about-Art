<h1 align='center'><b>Art-Lover</b></h1>

## **1. Art-lover 소개**

![스크린샷 2024-09-16 오후 6 21 25](https://github.com/user-attachments/assets/717a97f0-dc62-49ec-9b1d-cd105cbee2c3)

> Art-lover는 전시회를 손 쉽게 검색 할 수 있는 입니다.<br/>
> Frontend by 조진호<br/>
> Backend by 조진호 <br/>
> Designed by 조진호 <br/>
[Art-Lover URL](https://art-lover.co.kr)<br/>
                                                               
## **2. 개발 환경 & 핵심 기술 설명**

### **개발 환경**

<table>
<tr>
 <td align="center">Front-End</td>
 <td>
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp 
  	<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>&nbsp
  	<img src="https://img.shields.io/badge/styled--Components-db7093?style=for-the-badge&logo=styled-Components&logoColor=black"/>&nbsp 
  	<img src="https://img.shields.io/badge/Axios-white?style=for-the-badge&logo=Axios&logoColor=black"/>&nbsp 
  	<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=black"/>&nbsp 
   	<img src="https://img.shields.io/badge/Zustand-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp 
   	<img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=MUI&logoColor=white"/>&nbsp 
 </td>
</tr>
	
<tr>
 <td align="center">Back-End</td>
 <td>
	 <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp
	 <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>&nbsp
</tr>

<tr>
 <td align="center">디자인</td>
 <td>
    <img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp  
 </td>
</tr>

<tr>
 <td align="center">IDE</td>
 <td>
    <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
</tr>

 <td align="center">배포</td>
 <td>
	 <img src="https://img.shields.io/badge/cPanel-FF6C2C?style=flat-square&logo=cPanel&logoColor=white"/>&nbsp
</tr>
</table>

### **핵심 기술 사용 이유**

|     **기술**      |                                                   **설명**                                                    |
| :---------------: | :-----------------------------------------------------------------------------------------------------------: |
|       REACT       | Vue.js의 템플릿 구문 보다는 React의 JSX가 더 유연하게 컴포넌트를 작성 할 수 있기에 React를 채택|
|       Axios       | HTTP 요청을 보다 간편하게 처리하기 위해 사용 |
| Styled-components |    props나 상태에 따라 동적으로 스타일을 변경할 수 있기에 사용      |
|  Tanstack Query | 서버 데이터의 상태를 효율적으로 관리하고, 캐시와 자동 리페칭으로 사용자 경험을 개선하기 위해 사용  |
| Zustand  | 클라이언트가 주력으로 이용할 state가 많지 않아 효율적으로 관리할 수 있는 zustand 채택 |
| Kakao map api  | 사용자 편의성과 로딩시간, 검색시간이 중요하다고 판단하여  kakao map api 를 사용  |




## **3. EXHI-LOVER 프로젝트 구조**

```
EXHI_LOVER
├─ .github
|  
├- 📂client
|      ├──── 📂build
|      |        ├─ 📂 static
|      |        └─ 📂 upload
|      |
|      ├─── 📂 node_modules
|      ├─── 📂 public
|      |          ├─ 📂 favicon
|      |          ├─ 📂 upload
|      |          ├─ favicon.ico
|      |          └─ index.html
|      |
|      ├─── 📂 component
|      |           ├─ 📂 button
|      |           |       ├─ MainButton.js
|      |           |       └─ SearchBar.js
|      |           ├─ 📂 calendar
|      |           |         ├─ Calendar.css
|      |           |         └─ MyCalendar.js
|      |           ├─ 📂 detail
|      |           |       ├─ DetailTemplate.js
|      |           |       └─ DetailViewer.js
|      |           ├─ 📂 hashtag
|      |           |       ├─ HashTag.js
|      |           |       ├─ HashTagTemplate.js
|      |           |       ├─ IdToShow.js
|      |           |       ├─ Tags.js
|      |           |       └─ TagCheckBox.js
|      |           ├─ 📂 layout
|      |           |       ├─ Footer.js
|      |           |       ├─ HorizontalLine.js
|      |           |       ├─ MainHeader.js
|      |           |       └─ SubHeader.js
|      |           ├─ 📂 map
|      |           |      ├─ FetchShowInfo.js
|      |           |      ├─ FetchShowTags.js
|      |           |      ├─ KaKaoMap.js
|      |           |      ├─ MapTemplate.js
|      |           |      ├─ Marker.js
|      |           |      ├─ MiniMap.js
|      |           |      └─ SwipeableEdgeDrawere.js
|      |           ├─ 📂 post
|      |           |       ├─ Post.js
|      |           |       ├─ PostSkeleton.js
|      |           |       └─ PostTemplate.js
|      |           └─ 📂 search   
|      |                   └─ Search.js
|      ├─── 📂 lib     
|      |        ├─ 📂 api
|      |        |   └─ api.js
|      |        ├─ 📂 icon
|      |        ├─ 📂 logo
|      |        ├─ 📂 styles
|      |        |       ├─ colorSet.js
|      |        |       ├─ fontStyle.js
|      |        |       └─ palette.js
|      |        └─ 📂 zustand
|      |                └─ bearsStore.js
|      └─── 📂 pages
|                ├─ DetailPage.js
|                └─ MainPage.js
├- App.css
├- App.js
├- index.css
├- reportWebVitals.js
├- setupTest.js
└─ 📂 server
	 ├─── 📂 node_modules
	 └─── server.js
	   
```

## **4. 핵심 코드**

<details>
  <summary>
    <b>
	활성화 되어 있는 해시태그를 선택하면 해당 관련 게시물만 필터링 된 후, 필터된 게시물에 해당하지 않는 해시 태그는 비활성화
    </b>
  </summary>

- 미디어 아트 선택하기 전<br/>
![스크린샷 2024-09-16 오후 6 25 39](https://github.com/user-attachments/assets/1785fe59-99bc-4a08-ad8b-7c0bad4475b7)

- 미디어 아트 선택 한 후<br/>
![스크린샷 2024-09-16 오후 6 25 57](https://github.com/user-attachments/assets/68f238ce-0d32-4df3-8b81-1f28fca30352)

```JSX

  const TagsCheckBox = ({ title, items, handleCheckedItems, tags }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [disableTagIds, setDisableTagIds] = useState([]);
  const [error, setError] = useState(null);

  const objectKeys = Object.keys(items); // string, object의 앞
  const valueKeys = Object.values(items); // int, object의 뒤

  useEffect(() => {
    handleCheckedItems(checkedItems);
  }, [handleCheckedItems, checkedItems]);

  useEffect(() => {
    const fetchTagId = async () => {
      try {
        if (tags !== null) {
          setError(null);
          const TagIds = tags.map((obj) => obj.tag_id);
          const filteredDisableTagIds = valueKeys.filter(
            (element) => !TagIds.includes(element)
          );
          setDisableTagIds(filteredDisableTagIds);
        }
      } catch (e) {
        setError(e);
      }
    };

    fetchTagId();
  }, [tags]);

  const handleItemClick = (index) => {
    if (checkedItems.includes(index)) {
      setCheckedItems((val) => val.filter((text) => text !== index));
    } else {
      setCheckedItems((val) => [...val, index]);
    }
  };

  const handleReset = () => {
    setCheckedItems([]);
  };

  return (
    <Box>
      <p>
        {title}
        <button onClick={handleReset}>선택 초기화</button>
      </p>
      <br />
      <Container>
        {objectKeys.map((item) => (
          <Item
            key={items[item]}
            checked={checkedItems.includes(items[item])}
            onClick={() => handleItemClick(items[item])}
            disable={disableTagIds.includes(items[item])}
          >
            {checkedItems.includes(item) && <Done />}
            {item}
          </Item>
        ))}
      </Container>
    </Box>
  );
};

```

</details>

<details><summary><b>Kakao map api 전시관 marker 표시</b></summary>
<br/>

![스크린샷 2024-09-16 오후 6 54 00](https://github.com/user-attachments/assets/6469000f-c9cf-418b-b0b6-1ac080a14cc8)

- Marker 표시 

```jsx
//MapTemplate.js
const MapTemplate = () => {
  const [state, setState] = useState({
    center: {
      lat: 37.56649,
      lng: 126.978488,
    },
    errMsg: null,
    isLoading: true,
  });

  const { positions, isLoading: markersLoading } = Marker(); // Marker에서 로딩 상태와 positions을 받음

  const [flag, setFlag] = useState(false); // true -> marker 활성화 (위치 활성화를 하지 않으면 no marker)

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (!state.isLoading && !markersLoading) {
      setFlag(true); // 모든 로딩이 완료되었을 때 flag를 true로 설정
    }
  }, [state.isLoading, markersLoading]);
  if (!flag) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }
```

```jsx
//Marker.js
import { useQuery } from "@tanstack/react-query";
import { fetchGalleryLocation } from "../../lib/api/Api";

function Marker() {
  const {
    data: galleries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["galleries"],
    queryFn: fetchGalleryLocation,
  });

  const positions = galleries
    ? galleries.map((gallery) => ({
        id: gallery.id,
        title: gallery.gallery_name,
        latlng: {
          lat: parseFloat(gallery.gallery_add_tude.split(",")[1]),
          lng: parseFloat(gallery.gallery_add_tude.split(",")[0]),
        },
        add: gallery.gallery_add_word,
        contact: gallery.gallery_phone_num,
        url: gallery.site,
        onDisplay: gallery.on_display,
      }))
    : [];

  return { positions, isLoading, error }; // positions, 로딩 상태, 에러 반환
}

export default Marker;

```

</details>

<details><summary><b>Zustand localStorage 저장</b></summary>
<br/>
	
![스크린샷 2024-09-16 오후 6 59 49](https://github.com/user-attachments/assets/bd4c1fc7-3433-4e9c-b4b1-ec7f1307df6d)

- 필요한 정보만 localstorage에 저장

```jsx
//bearsStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBearsStore = create(
  persist(
    (set) => ({
      menuValue: "0",
      setMenuValue: (value) => set({ menuValue: value }),
      buttonValue: 0,
      setButtonValue: (value) => set({ buttonValue: value }),
      lastClickedMarker: {
        lat: 0,
        lng: 0,
      },
      setLastClickedMarker: (lat, lng) =>
        set({ lastClickedMarker: { lat, lng } }),
    }),
    {
      name: "bears-storage",
      partialize: (state) => ({
        menuValue: state.menuValue,
        buttonValue: state.buttonValue,
      }),
    }
  )
);

export default useBearsStore;

```

</details>

<details><summary><b>Tanstack Query를 이용하여 검색 api 관리</b></summary>
<br/>

![스크린샷 2024-09-16 오후 7 16 00](https://github.com/user-attachments/assets/ef282666-2866-4950-9b25-c6261ee5abc2)


```jsx
function Search() {
  const [paginationValue, setPaginationValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const initialLoadRef = useRef(true);

  const { menuValue, setMenuValue } = useBearsStore(); // Access Zustand store

  const onSearch = useCallback(
    (searchString) => setSearchQuery(searchString),
    []
  );

  // Tanstack Query 사용
  const {
    data: showsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["shows", searchQuery, menuValue, paginationValue],
    queryFn: () =>
      fetchShowsbySearchQuery(searchQuery, menuValue, paginationValue),
    keepPreviousData: true, // 추가적인 옵션을 여기에 넣을 수 있습니다.
    staleTime: 1000 * 5,
  });
  // 페이지 카운트를 계산합니다.
  const pageCount = showsData ? Math.ceil(showsData.totalCount / 10) : 1;

  // 페이징 변화 시 스크롤 조정
  React.useEffect(() => {
    if (!initialLoadRef.current) {
      let location = document.querySelector("#Art").offsetTop;
      window.scrollTo({
        top: location - 20,
      });
    } else {
      initialLoadRef.current = false;
    }
  }, [paginationValue]);
```

</details>

## **5. 트러블 슈팅**

<b style="font-size:18px">상태 값 초기화 문제</b><br/>

- 원인: 브라우저에서 새로고침 시 중요 상태 값이 초기화되어 default 값으로 돌아가는 문제 발생.
- 고민 과정: 초기에 상태를 브라우저의 기본 스토리지에 저장할 방법을 찾았으나, 불필요한 정보까지 저장되는 문제와 성능 부담이 우려됨. 중요한 상태만 저장하고 불필요한 정보는 제외할 방법을 고민.
- 해결 방법: Zustand의 persist 기능을 사용해 상태를 관리하고, 불필요한 정보가 저장되는 문제를 해결하기 위해 getStorage 대신 partialize를 사용하여 필요한 상태만 로컬 스토리지에 저장.
- 결과: 상태 값이 새로고침 후에도 정상적으로 유지됨.

<b style="font-size:18px">텍스트 검색시 불필요한 API 호출 발생</b><br/>
![스크린샷 2024-09-18 오전 12 07 58](https://github.com/user-attachments/assets/4eabc55a-4cd6-4244-9750-1faf53356347)
- 원인: 검색 입력창에서 타이핑할 때마다 onSearch 함수가 호출되어, 불필요한 API 호출이 발생.
- 고민 과정: 검색 입력 시 실시간으로 결과를 제공할 필요는 없다고 판단, 타이핑이 끝난 후에만 API 요청을 보내는 것이 적절하다고 생각.
- 해결 방법: debounce를 적용.
- 결과: 사용자가 입력을 멈춘 후 500ms 대기 후 API 호출. 500ms 내에 입력이 이어지면 호출은 생략.

<b style="font-size:18px">불필요한 초기 데이터를 최소화하여 페이지 로딩 속도를 향상</b><br/>

- 원인: First Contentful Paint (FCP) 값이 각 상황마다 2.3초(텍스트 검색 페이지) / 2.6초(게시물 페이지) / 5.4초(해시태그 페이지) 로 개선 필요.
- 고민 과정: 페이지의 주요 콘텐츠를 먼저 로드하고, 부차적인 정보는 나중에 로드하는 방식을 고려. 성능 저하를 막으면서도 사용자가 필요한 데이터를 빠르게 볼 수 있게 하려고 함.
- 해결 방법: Lazy loading을 적용해, 중요하지 않은 데이터는 사용자가 필요할 때 로드되도록 최적화.
- 결과: FCP 값이 2.1초 / 2.2초 / 2.2초 로 평균 27% 감소


<b style="font-size:18px">중복 API 호출 문제</b><br/>

- 원인: 비동기 작업 중복으로 인해 API 호출이 반복적으로 발생, 성능 저하 문제 발생.
- 고민 과정: API 요청을 캐싱하거나 특정 기간 동안 동일한 요청을 방지할 방법을 고민. Tanstack Query의 캐싱 기능을 활용해 반복 호출을 줄일 수 있는지 테스트.
- 해결 방법: Tanstack Query를 이용 API 호출을 최적화하고 캐싱을 적용하여 중복 호출을 방지.
- 결과: stale time 적용으로 API 호출 최소화.


<b style="font-size:18px">스크롤 위치 유지 문제</b><br/>

- 원인: 게시물에 접속할 때 Tanstack Query로 인해 정보가 fresh인 경우, 브라우저가 이전 스크롤 위치를 기억하고 페이지 접근 시 해당 위치에서 랜더링되는 문제.
- 고민 과정: 브라우저에서 뒤로가기 눌렀을때랑 현상이 동일. 캐싱된 정보로 인해 이런 문제가 발생 되는 것으로 판단되어 강제로 스크롤을 올리는 방법 밖에 없다고 판단.
- 해결 방법: 페이지 접근 시 window.scrollTo(0, 0)을 적용하여 스크롤 위치를 초기화.
- 결과: 스크롤 위치 문제가 해결되어 페이지 접근 시 항상 최상단에서 렌더링됨.

<b style="font-size:18px">무한 리렌더링 문제</b><br/>
![스크린샷 2024-09-18 오전 9 28 53](https://github.com/user-attachments/assets/32893e3d-4a2b-442a-807a-f89b35cf72a1)
- 원인: useEffect에서 valueKeys가 새로운 배열로 인식되어 매번 호출이 발생, 무한 리렌더링 문제가 발생.
- 고민 과정: 배열이나 객체를 사용할 때 참조가 변경되는 문제를 인식하고, 이를 해결하기 위해 useMemo를 고려. 객체의 참조 무결성을 유지할 방법을 찾아보며 useMemo가 배열의 불필요한 재생성을 방지하는 최적의 방법이라고 판단.
- 해결 방법: Object.values(items) 대신 useMemo를 사용하여 배열을 캐싱, 매번 새로운 참조가 생성되지 않도록 최적화.
- 결과: 무한 리렌더링 문제가 해결되고 성능이 개선됨.

<b style="font-size:18px">태그 데이터 요청 비효율성</b><br/>

- 원인: 태그 ID와 이름을 병렬로 요청하지 않고, 별도로 요청함으로써 성능 저하 발생.
- 고민 과정: API 요청을 병렬로 처리하여 네트워크 병목을 줄이는 방안을 검토. 태그 ID와 이름 데이터를 한 번에 요청할 수 있는 방법을 찾았으며, 여러 요청을 병합할 필요성을 느낌.
- 해결 방법: 태그 ID와 이름을 비동기 작업에서 병합하여 한 번에 처리하도록 수정. Promise를 병렬로 처리하여 데이터 가공 과정을 단순화하고, 성능을 최적화.
- 결과: 데이터 요청 속도가 크게 개선되었고, 불필요한 요청을 줄여 성능이 최적화됨.

<b style="font-size:18px">다중 API 호출 성능 문제</b><br/>

- **원인**: 여러 API 호출을 순차적으로 처리하다 보니, 호출 간 대기 시간이 길어지면서 전체 응답 시간이 지연됨.
- 고민 과정: 네트워크 요청을 병렬로 처리할 필요성을 인식. 순차적으로 처리하는 것보다 Promise를 활용하여 병렬로 API를 호출할 경우 처리 시간을 크게 단축할 수 있을 것으로 예상. API 호출의 동시성을 고려한 최적화를 고민함.
- **해결 방법**: Promise.all을 사용해 API 요청을 병렬로 처리하여 동시에 데이터가 수집되도록 최적화.
- **결과**: API 요청 속도가 현저히 개선되어 사용자에게 빠른 응답을 제공할 수 있었으며, 전반적인 성능이 향상됨.

## **6. 기술 의사 결정**

<b style="font-size:18px">KakaoMap API</b><br/>

- 사용자 위치 기반의 지도 서비스를 제공하기 위해 정확하고 사용하기 쉬운 KakaoMap API를 선택. 사용자 경험을 높이기 위해 전시관 마커 기능과 맞춤형 스타일링을 적용.

<b style="font-size:18px">Zustand</b><br/>

- Redux나 RTK보다 zustand를 선택한 이유
    1. Redux가 필요할 만큼 복잡한 상태 관리가 요구되지 않았고, 코드베이스를 더 단순하고 유지 보수가 쉬운 방식으로 유지하기 위해 Zustand를 선택
    2. 상태 관리가 빈번하게 이루어지는 UI에서는 성능 이슈를 최소화하기 위해 Zustand의 간단한 상태 구조가 더 유리하다고 판단
    3. 코드베이스를 더 깔끔하고 유지보수가 쉽게 만들기 위해 복잡한 구조를 피하고자 Zustand를 선택
    4. Redux는 상태를 유지하거나 저장하는 데 있어 별도의 미들웨어나 라이브러리를 사용해야 하지만, Zustand는 기본적으로 persist 기능을 제공


<b style="font-size:18px">Styled-components</b><br/>
- 상태나 props에 따라 동적 스타일링을 쉽게 적용하기 위해 Styled-components가 선택
- 장기적인 유지보수성을 고려했을 때, 코드가 길어질 수 있는 Tailwind의 단점 대신, 스타일과 로직을 분리하고 명확하게 관리하기 위해 Styled-components가 더 적합하다고 판단
  
<b style="font-size:18px">Tanstack Query</b><br/>

- 상태 관리를 위해 useQuery를 사용하여 서버에서 데이터를 비동기적으로 가져오고 있으며, 캐싱과 staleTime 등을 통해 성능 최적화
</details>
