<h1 align='center'><b>Talking about Art</b></h1>

## **1. Talking about Art 소개**

![스크린샷 2024-09-16 오후 6 21 25](https://github.com/user-attachments/assets/717a97f0-dc62-49ec-9b1d-cd105cbee2c3)

> Talking about Art는 전시회 상세 정보, 큐레이터의 전시 소개, 일반 게시글을 올릴 수 있는 커뮤니티입니다.<br/>
> Frontend by 조진호<br/>
> Backend by 조진호 <br/>
> Designed by 조진호 <br/>
[Talking aobut Art URL](https://art-lover.co.kr)<br/>
                                                               
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
   	<img src="https://img.shields.io/badge/Zustand-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp 	
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

|     **기술**      |                                                   **설명**                                                    |
| :---------------: | :-----------------------------------------------------------------------------------------------------------: |
|       REACT       | Vue.js의 템플릿 구문 보다는 React의 JSX가 더 유연하게 컴포넌트를 작성 할 수 있기에 React를 채택|
|       Axios       | HTTP 요청을 보다 간편하게 처리하기 위해 사용 |
|  Tanstack Query | 서버 데이터의 상태를 효율적으로 관리하고, 캐시와 자동 리페칭으로 사용자 경험을 개선하기 위해 사용  |
| Zustand  | 클라이언트가 주력으로 이용할 state가 많지 않아 효율적으로 관리할 수 있는 zustand 채택 |




## **3. Talking about Art 폴더 구조**
```

📦 
├─ client
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  ├─ postcss.config.js
│  ├─ public
│  ├─ src
│  │  ├─ PrivateRoute.tsx
│  │  ├─ apiRoutes.ts
│  │  ├─ components
│  │  │  └─ ui
│  │  ├─ constants.ts
│  │  ├─ index.css
│  │  ├─ lib
│  │  │  └─ utils.ts
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ common
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ Like.tsx
│  │  │  │  │  └─ Modal.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  ├─ useLike.ts
│  │  │  │  │  └─ useToggleLike.ts
│  │  │  │  ├─ layout
│  │  │  │  │  ├─ AuthLayout.tsx
│  │  │  │  │  ├─ Layout.tsx
│  │  │  │  │  ├─ components
│  │  │  │  │  │  ├─ EventSection.tsx
│  │  │  │  │  │  ├─ HashTagsSection.tsx
│  │  │  │  │  │  ├─ Header.tsx
│  │  │  │  │  │  ├─ NavigationBar.tsx
│  │  │  │  │  │  ├─ RecommendSection.tsx
│  │  │  │  │  │  └─ UserAvatar.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     ├─ ScrollToTop.ts
│  │  │  │  │     └─ useCheckLoginStatus.ts
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ curator
│  │  │  │  ├─ AddCuratorPost
│  │  │  │  │  ├─ AddCuratorPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  └─ AddCuratorPostForm.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     └─ useAddCuratorPost.ts
│  │  │  │  ├─ CuratorPost
│  │  │  │  │  ├─ CuratorPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  ├─ CuratorPostBottom.tsx
│  │  │  │  │  │  └─ CuratorPostTop.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     ├─ useDeleteCuratorPost.ts
│  │  │  │  │     └─ useToggleLike.ts
│  │  │  │  ├─ EditCuratorPost
│  │  │  │  │  ├─ EditCuratorPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  └─ EditCuratorPostForm.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     └─ useUpdateCuratorPost.ts
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ hooks
│  │  │  │  │  ├─ useGetCuratorPost.ts
│  │  │  │  │  └─ useSearchShowForCuratorPost.ts
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ event
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ eventTab
│  │  │  │  │  ├─ EventBone.tsx
│  │  │  │  │  ├─ MyEvent.tsx
│  │  │  │  │  ├─ PreviousEvent.tsx
│  │  │  │  │  └─ UpcommingEvent.tsx
│  │  │  │  └─ index.tsx
│  │  │  ├─ exhibition
│  │  │  │  ├─ addExhibitionPost
│  │  │  │  │  ├─ AddExhibitionPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  ├─ components
│  │  │  │  │  └─ hooks
│  │  │  │  ├─ exhibitionPost
│  │  │  │  │  ├─ ExhibitionPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  ├─ components
│  │  │  │  │  └─ hooks
│  │  │  │  ├─ types
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ ui
│  │  │  ├─ home
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ PostsListSection.tsx
│  │  │  │  │  ├─ TabSection.tsx
│  │  │  │  │  ├─ TabSection
│  │  │  │  │  │  ├─ Curators.tsx
│  │  │  │  │  │  ├─ CurrentExhibition.tsx
│  │  │  │  │  │  └─ UpCommingExhibition.tsx
│  │  │  │  │  ├─ ViewMore.tsx
│  │  │  │  │  └─ skeletons
│  │  │  │  │     ├─ PostListSkeleton.tsx
│  │  │  │  │     └─ TabSectionSkeleton.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  ├─ useLatestCuratorPosts.ts
│  │  │  │  │  ├─ useLatestExhibitionPosts.ts
│  │  │  │  │  └─ useLatestOrdinaryPosts.ts
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ loading
│  │  │  │  └─ components
│  │  │  │     └─ LoadingPage.tsx
│  │  │  ├─ login
│  │  │  │  ├─ LoginPage.tsx
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ components
│  │  │  │  │  └─ LoginForm.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ useLogin.tsx
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ myPage
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ editMyPage
│  │  │  │  │  ├─ EditMyPage.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  └─ EditMyPageForm.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     ├─ useFetchMyPage.tsx
│  │  │  │  │     └─ useUpdateMyPage.tsx
│  │  │  │  ├─ myPage
│  │  │  │  │  ├─ components
│  │  │  │  │  │  └─ MyPageForm.tsx
│  │  │  │  │  ├─ hooks
│  │  │  │  │  │  └─ useMyPageData.tsx
│  │  │  │  │  └─ index.tsx
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ ordinary
│  │  │  │  ├─ addOrdinaryPost
│  │  │  │  │  ├─ AddOrdinaryPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  ├─ AddOrdinaryForm.tsx
│  │  │  │  │  │  └─ AddOrdinaryImage.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     ├─ useImageUpload.ts
│  │  │  │  │     └─ usePostOrdinaryPost.ts
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ comments
│  │  │  │  │  ├─ Comments.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  ├─ CommentEditForm.tsx
│  │  │  │  │  │  ├─ CommentForm.tsx
│  │  │  │  │  │  └─ CommentsList.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     ├─ useDeleteComment.ts
│  │  │  │  │     ├─ useFetchComments.ts
│  │  │  │  │     ├─ usePostComment.ts
│  │  │  │  │     ├─ useToggleLikeComment.ts
│  │  │  │  │     └─ useUpdateComment.ts
│  │  │  │  ├─ editOrdinaryPost
│  │  │  │  │  ├─ EditOrdinaryPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  └─ EditOrdinaryPostForm.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     └─ useUpdateOrdinaryPost.ts
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ useFetchOrdinaryPost.ts
│  │  │  │  ├─ ordinaryPost
│  │  │  │  │  ├─ OrdinaryPost.tsx
│  │  │  │  │  ├─ api
│  │  │  │  │  │  └─ index.ts
│  │  │  │  │  ├─ components
│  │  │  │  │  │  └─ OrdinaryPostBody.tsx
│  │  │  │  │  └─ hooks
│  │  │  │  │     ├─ useDeleteOrdinaryPost.ts
│  │  │  │  │     └─ useToggleLikeOrdinary.ts
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  ├─ postsList
│  │  │  │  ├─ api
│  │  │  │  │  └─ index.ts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ CuratorPostCard.tsx
│  │  │  │  │  ├─ ExhibitionPostCard.tsx
│  │  │  │  │  ├─ OrdinaryPostCard.tsx
│  │  │  │  │  ├─ PostHeader.tsx
│  │  │  │  │  └─ skeletons
│  │  │  │  │     ├─ CuratorPostCardSkeleton.tsx
│  │  │  │  │     ├─ ExhibitionPostCardSkeleton.tsx
│  │  │  │  │     ├─ ListSkeleton.tsx
│  │  │  │  │     └─ OrdinaryPostCardSkeleton.tsx
│  │  │  │  ├─ hooks
│  │  │  │  │  └─ useFetchPosts.ts
│  │  │  │  ├─ index.tsx
│  │  │  │  └─ types
│  │  │  │     └─ index.ts
│  │  │  └─ register
│  │  │     ├─ api
│  │  │     │  └─ api.ts
│  │  │     ├─ components
│  │  │     │  ├─ RegisterFooter.tsx
│  │  │     │  └─ RegisterForm.tsx
│  │  │     ├─ hooks
│  │  │     │  ├─ useEmailCheck.ts
│  │  │     │  └─ useRegister.ts
│  │  │     ├─ index.tsx
│  │  │     └─ types
│  │  │        └─ index.ts
│  │  ├─ router.tsx
│  │  ├─ store
│  │  │  └─ authStore.ts
│  │  ├─ stories
│  │  │  ├─ Button.stories.ts
│  │  │  ├─ Button.tsx
│  │  │  ├─ Configure.mdx
│  │  │  ├─ Header.stories.ts
│  │  │  ├─ Header.tsx
│  │  │  ├─ Page.stories.ts
│  │  │  ├─ Page.tsx
│  │  │  ├─ assets
│  │  │  │  ├─ accessibility.png
│  │  │  │  ├─ accessibility.svg
│  │  │  │  ├─ addon-library.png
│  │  │  │  ├─ assets.png
│  │  │  │  ├─ avif-test-image.avif
│  │  │  │  ├─ context.png
│  │  │  │  ├─ discord.svg
│  │  │  │  ├─ docs.png
│  │  │  │  ├─ figma-plugin.png
│  │  │  │  ├─ github.svg
│  │  │  │  ├─ share.png
│  │  │  │  ├─ styling.png
│  │  │  │  ├─ testing.png
│  │  │  │  ├─ theming.png
│  │  │  │  ├─ tutorials.svg
│  │  │  │  └─ youtube.svg
│  │  │  ├─ button.css
│  │  │  ├─ header.css
│  │  │  └─ page.css
│  │  ├─ types
│  │  │  └─ index.ts
│  │  ├─ utils
│  │  │  ├─ location
│  │  │  │  └─ Location.ts
│  │  │  └─ register
│  │  │     └─ Validate.tsx
│  │  └─ vite-env.d.ts
│  ├─ tailwind.config.js
│  ├─ tsconfig.app.json
│  ├─ tsconfig.app.tsbuildinfo
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  ├─ tsconfig.node.tsbuildinfo
│  └─ vite.config.ts
└─ server
   ├─ package.json
   ├─ pnpm-lock.yaml
   └─ server.js
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
```

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
			tmp3
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

<b style="font-size:18px">불필요한 초기 데이터를 최소화하여 페이지 로딩 속도를 향상</b><br/>

- 원인: First Contentful Paint (FCP) 값이 각 상황마다 2.3초(텍스트 검색 페이지) / 2.6초(게시물 페이지) / 5.4초(해시태그 페이지) 로 개선 필요.
- 고민 과정: 페이지의 주요 콘텐츠를 먼저 로드하고, 부차적인 정보는 나중에 로드하는 방식을 고려. 성능 저하를 막으면서도 사용자가 필요한 데이터를 빠르게 볼 수 있게 하려고 함.
- 해결 방법: Lazy loading을 적용해, 중요하지 않은 데이터는 사용자가 필요할 때 로드되도록 최적화.
- 결과: FCP 값이 2.1초 / 2.2초 / 2.2초 로 평균 27% 감소

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

<b style="font-size:18px">중복 API 호출 문제</b><br/>

- 원인: 비동기 작업 중복으로 인해 API 호출이 반복적으로 발생, 성능 저하 문제 발생.
- 고민 과정: API 요청을 캐싱하거나 특정 기간 동안 동일한 요청을 방지할 방법을 고민. Tanstack Query의 캐싱 기능을 활용해 반복 호출을 줄일 수 있는지 테스트.
- 해결 방법: Tanstack Query를 이용 API 호출을 최적화하고 캐싱을 적용하여 중복 호출을 방지.
- 결과: stale time 적용으로 API 호출 최소화.

<b style="font-size:18px">다중 API 호출 성능 문제</b><br/>

- **원인**: 여러 API 호출을 순차적으로 처리하다 보니, 호출 간 대기 시간이 길어지면서 전체 응답 시간이 지연됨.
- 고민 과정: 네트워크 요청을 병렬로 처리할 필요성을 인식. 순차적으로 처리하는 것보다 Promise를 활용하여 병렬로 API를 호출할 경우 처리 시간을 크게 단축할 수 있을 것으로 예상. API 호출의 동시성을 고려한 최적화를 고민함.
- **해결 방법**: Promise.all을 사용해 API 요청을 병렬로 처리하여 동시에 데이터가 수집되도록 최적화.
- **결과**: API 요청 속도가 현저히 개선되어 사용자에게 빠른 응답을 제공할 수 있었으며, 전반적인 성능이 향상됨.

## **6. 기술 의사 결정**

<b style="font-size:18px">Zustand</b><br/>

- Redux나 RTK보다 zustand를 선택한 이유
    1. Redux가 필요할 만큼 복잡한 상태 관리가 요구되지 않았고, 코드베이스를 더 단순하고 유지 보수가 쉬운 방식으로 유지하기 위해 Zustand를 선택
    2. 상태 관리가 빈번하게 이루어지는 UI에서는 성능 이슈를 최소화하기 위해 Zustand의 간단한 상태 구조가 더 유리하다고 판단
    3. 코드베이스를 더 깔끔하고 유지보수가 쉽게 만들기 위해 복잡한 구조를 피하고자 Zustand를 선택
    4. Redux는 상태를 유지하거나 저장하는 데 있어 별도의 미들웨어나 라이브러리를 사용해야 하지만, Zustand는 기본적으로 persist 기능을 제공


<b style="font-size:18px">Tanstack Query</b><br/>

- 상태 관리를 위해 useQuery를 사용하여 서버에서 데이터를 비동기적으로 가져오고 있으며, 캐싱과 staleTime 등을 통해 성능 최적화
</details>
