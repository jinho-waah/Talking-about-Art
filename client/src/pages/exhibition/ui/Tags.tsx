//  free        0
//  takePhoto   1
//  orient      5~30
//  era         31~50
//  genre       51~100
//  artMovement 101~
export const free: Record<string, number> = { 무료: 0 };

export const takePhoto: Record<string, number> = { "사진촬영 가능": 1 };

export const permanent: Record<string, number> = { 상설: 2 };

export const orient: Record<string, number> = {
  동양: 5,
  서양: 6,
};

export const era: Record<string, number> = {
  원시미술: 31,
  고대미술: 32,
  중세미술: 33,
  근세미술: 34,
  근대미술: 35,
  현대미술: 36,
  고미술: 37,
};

export const genre: Record<string, number> = {
  추상: 51,
  회화: 52,
  조각: 53,
  "미디어 아트": 54,
  사진: 55,
  설치미술: 56,
  퍼포먼스: 57,
  공예: 58,
  영상: 59,
  판화: 60,
  문화재: 61,
};

export const artMovement: Record<string, number> = {
  이집트: 101,
  "고대 그리스": 102,
  "고대 로마": 103,
  비잔틴: 104,
  로마네스크: 105,
  고딕: 106,
  르네상스: 107,
  바로크: 108,
  로코코: 109,
  신고전주의: 110,
  낭만주의: 111,
  자연주의: 112,
  사실주의: 113,
  인상주의: 114,
  후기인상주의: 115,
  신인상주의: 116,
  상징주의: 117,
  야수파: 118,
  입체파: 119,
  추상미술: 120,
  신조형주의: 121,
  표현주의: 122,
  미래파: 123,
  다다이즘: 124,
  초현실주의: 125,
  초상표현주의: 126,
  모노크롬: 127,
  "엥포르멜(비정형미술)": 128,
  "아웃사이더 아트": 129,
  팝아트: 130,
  누보레알리슴: 131,
  "키네틱 아트": 132,
  옵아트: 133,
  미니멀리즘: 134,
  개념미술: 135,
  플렉서스: 136,
  대지미술: 137,
  실험미술: 138,
  사이버파트: 139,
};
