<h1 align='center'><b>Talking about Art</b></h1>

## **1. Talking about Art 소개**

![스크린샷 2024-11-18 오후 3 31 35](https://github.com/user-attachments/assets/e1974d2a-9e16-476b-95b7-c11b03df2fad)\

> Talking about Art는 전시회 상세 정보, 큐레이터의 전시 소개, 일반 게시글을 올릴 수 있는 커뮤니티입니다.<br/>
> Frontend by 조진호<br/>
> Backend by 조진호 <br/>
> Designed by 조진호 <br/> > [Talking aobut Art URL](https://art-lover.co.kr)<br/>

## **2. 개발 환경 & 핵심 기술 설명**

### **개발 환경**

<table>
<tr>
 <td align="center">Front-End</td>
 <td>
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>&nbsp 
  	<img src="https://img.shields.io/badge/typecript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp
  	<img src="https://img.shields.io/badge/Axios-white?style=for-the-badge&logo=Axios&logoColor=black"/>&nbsp 
  	<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=black"/>&nbsp 
   	<img src="https://img.shields.io/badge/Zustand-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>&nbsp 	
	<img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=for-the-badge&logo=TailwindCss&logoColor=white"/>&nbsp 	
 </td>
</tr>
	
<tr>
 <td align="center">Back-End</td>
 <td>
	 <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>&nbsp
	 <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>&nbsp
	 <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">&nbsp
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

|    **기술**    |                                             **설명**                                              |
| :------------: | :-----------------------------------------------------------------------------------------------: |
|     REACT      |  Vue.js의 템플릿 구문 보다는 React의 JSX가 더 유연하게 컴포넌트를 작성 할 수 있기에 React를 채택  |
|     Axios      |                           HTTP 요청을 보다 간편하게 처리하기 위해 사용                            |
| Tanstack Query | 서버 데이터의 상태를 효율적으로 관리하고, 캐시와 자동 리페칭으로 사용자 경험을 개선하기 위해 사용 |
|    Zustand     |       클라이언트가 주력으로 이용할 state가 많지 않아 효율적으로 관리할 수 있는 zustand 채택       |

## **3. FSD 폴더링 변형 구조**

- 기존 장점
  - 기능 중심의 모듈화: 각 기능을 독립된 모듈로 관리하여 코드의 재사용성을 높이고, 특정 기능을 찾고 수정 용이
  - 확장성과 유지보수성: 기능별로 나눠진 구조 덕분에 새로운 기능 추가 시 영향을 최소화할 수 있어, 뛰어난 확장성과 유지보수성
  - 개발 협업 효율성 향상: 팀 내에서 기능별로 작업을 나눌 수 있어 협업의 높은 효율성
- 변형

  - 폴더 구조 간소화: 일부 반복적인 폴더 구조나 복잡한 계층을 줄여, 코드 탐색을 더 직관적이고 간단하게 표현. 이를 통해 FSD의 복잡도를 낮추면서도 기능별 모듈화는 유지
  - 공통 요소의 일관된 관리: 공통적으로 사용되는 로직이나 유틸리티를 개별 모듈이 아닌 상위 레벨에서 관리하도록 하여 코드 중복을 줄이고 높은 유지보수성
  - 유연성 증대: 프로젝트 요구사항에 맞게 구조를 조정했기 때문에 필요할 때 구조를 쉽게 변경할 수 있음

<details>
  <summary>
    <b>
  폴더 구조
    </b>
  </summary>
```
📦
└─ src
    ├─ PrivateRoute.tsx
    ├─ apiRoutes.ts
    ├─ components
    ├─ constants.ts
    ├─ index.css
    ├─ lib
    ├─ main.tsx
    ├─ pages
    │  ├─ common
    │  │  ├─ api
    │  │  ├─ components
    │  │  ├─ hooks
    │  │  ├─ layout
    │  │  └─ types
    │  ├─ curator
    │  │  ├─ AddCuratorPost
    │  │  ├─ CuratorPost
    │  │  ├─ EditCuratorPost
    │  │  ├─ api
    │  │  ├─ hooks
    │  │  └─ types
    │  ├─ event
    │  │  ├─ api
    │  │  ├─ eventTab
    │  │  └─ index.tsx
    │  ├─ exhibition
    │  │  ├─ addExhibitionPost
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  ├─ exhibitionPost
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  ├─ types
    │  │  └─ ui
    │  ├─ home
    │  │  ├─ api
    │  │  ├─ components
    │  │  ├─ hooks
    │  │  └─ types
    │  ├─ loading
    │  │  └─ components
    │  ├─ login
    │  │  ├─ api
    │  │  ├─ components
    │  │  ├─ hooks
    │  │  └─ types
    │  ├─ myPage
    │  │  ├─ api
    │  │  ├─ editMyPage
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  ├─ myPage
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  └─ types
    │  ├─ ordinary
    │  │  ├─ addOrdinaryPost
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  ├─ api
    │  │  ├─ comments
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  ├─ editOrdinaryPost
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  ├─ hooks
    │  │  ├─ ordinaryPost
    │  │  │  ├─ api
    │  │  │  ├─ components
    │  │  │  └─ hooks
    │  │  └─ types
    │  ├─ postsList
    │  │  ├─ api
    │  │  ├─ components
    │  │  ├─ hooks
    │  │  └─ types
    │  └─ register
    │     ├─ api
    │     ├─ components
    │     ├─ hooks
    │     └─ types
    ├─ router.tsx
    ├─ store
    ├─ types
    └─ utils
       ├─ location
       ├─ register
       └─ time
```

</details>

## **4. 핵심 코드**

<details>
  <summary>
    <b>
	tmp 1
    </b>
  </summary>
	tmp 1 주요 내용 
</details>

<details>
	<summary>
		<b>
			tmp2	
		</b>
	</summary>
	<br/>
	tmp2 주요내용
</details>

<details>
	<summary>
		<b>
			Zustand localStorage 저장
		</b>
	</summary>
	<br/>
</details>

<details>
	<summary>
		<b>
			tmp3
		</b>
	</summary>
<br/>
tmp3 주요내용

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

<b style="font-size:18px">좋아요 기능의 debounce 문제</b><br/>

- 원인: useMutation의 onMutate와 debounce를 함께 사용하면서, "좋아요" 버튼을 빠르게 짝수 번 클릭할 때 debounce는 이를 단일 명령으로 처리해 의도와 다른 결과가 발생함.
- 고민 과정: debounce로 인한 문제를 해결하려면 다중 클릭을 독립적으로 처리할 방법을 모색. 특히 사용자의 빠른 클릭에 대해 각각의 상태 업데이트를 보장할 방법을 고려.
- 해결방법: debounce와 useCallback을 사용하여 서버에 "좋아요" 상태를 업데이트하는 debouncedToggleLikeServer 함수를 생성하고, 클라이언트 쪽에서는 isLiked와 likeCount 상태를 즉시 업데이트하도록 구성.
- 결과: 로컬 상태와 서버 상태가 일치하면서도, debounce로 인해 발생하는 의도치 않은 상태 변화 문제를 해결하여, 사용자 경험을 개선함.

## **6. 기술 의사 결정**

<b style="font-size:18px">Zustand</b><br/>

- Redux나 RTK보다 zustand를 선택한 이유

1. Redux가 필요할 만큼 복잡한 상태 관리가 요구되지 않았고, 코드베이스를 더 단순하고 유지 보수가 쉬운 방식으로 유지하기 위해 Zustand를 선택
2. 상태 관리가 빈번하게 이루어지는 UI에서는 성능 이슈를 최소화하기 위해 Zustand의 간단한 상태 구조가 더 유리하다고 판단
3. 코드베이스를 더 깔끔하고 유지보수가 쉽게 만들기 위해 복잡한 구조를 피하고자 Zustand를 선택
4. Redux는 상태를 유지하거나 저장하는 데 있어 별도의 미들웨어나 라이브러리를 사용해야 하지만, Zustand는 기본적으로 persist 기능을 제공

<b style="font-size:18px">pnpm 사용</b><br/>

- pnpm으로 설치한 Node.js는 Corepacke이 포함되어 있지 않지만 Node.js 버전 관리 용이
- 패키지 설치 속도와 디스크 공간 절약 가능
- npm이나 Yarn에서는 종속성 트리가 깊어질 수 있지만, pnpm은 항상 최상위 노드에서 종속성을 공유하도록 강제하므로, 종속성 트리가 일관되고 예상 가능한 방식으로 유지

<b style="font-size:18px">Tanstack Query</b><br/>

- 상태 관리를 위해 useQuery를 사용하여 서버에서 데이터를 비동기적으로 가져오고 있으며, 캐싱과 staleTime 등을 통해 성능 최적화
- onMutate를 이용한 Optimistic update 적용

<b style="font-size:18px">React Dev Tools</b><br/>

- 불필요한 리렌더링을 찾아 useMemo나 useCallback을 이용하여 최적화
