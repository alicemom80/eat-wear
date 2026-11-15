// 단어 데이터: [그림 파일 이름, 영어, 한글, (읽을 소리: 영어와 다를 때만)]
// 출처: 앱/먹고입어요/기획서.md 3장 (테마와 단어), 5장 (테마별 게임 배정)
// games: [게임 id, 단계 1·2·3] 배정. mission: 놀이 끝에 보여 주는 화면 밖 미션.
// 주제 하나에 단어 5의 배수를 넣는 것이 원칙이다. 지금은 주제 6개 × 20개 = 120개 (묶음 4개씩, 묶음마다 5개).
window.A = window.A || {};

// 모든 주제가 같은 게임 8개를 같은 순서로 쓴다 (카드는 맨 위, 묻고 답하기는 맨 아래 가로 한 줄)
const ALL_GAMES = [
  ['card', 1], ['pick', 1], ['balloon', 1], ['match', 1],
  ['ox', 2], ['scratch', 2], ['maze', 3], ['qa', 3],
];

// 복수형 단어: "These are ..." 로 말한다 (기획서 4-4장)
const PLURAL_IDS = new Set([
  'grapes', 'chopsticks', 'beans', 'jeans', 'shorts', 'socks', 'sneakers',
  'boots', 'clothes', 'glasses', 'gloves', 'balletshoes', 'cherries',
]);

// 관사(a/an)를 붙이지 않는 단어: 색깔("This is red.")과 셀 수 없는 말("This is milk.")
const COLOR_IDS = new Set([
  'redcircle', 'orangecircle', 'yellowcircle', 'greencircle', 'bluecircle',
  'purplecircle', 'pinkcircle', 'browncircle', 'blackcircle', 'whitecircle',
]);
const NO_ART_IDS = new Set([
  ...COLOR_IDS,
  'broccoli', 'corn', 'garlic', 'ginger', 'salad', 'lettuce',             // 채소
  'chocolate', 'popcorn', 'honey', 'cheese', 'bread', 'icecream', 'shavedice',   // 간식
  'rice', 'soup', 'bacon', 'curryrice', 'spaghetti', 'milk', 'juice', 'tea', 'hotdrink', 'sushi',  // 식사·음료
]);

const FOOD_MISSION = '오늘 먹은 음식 하나를 영어로 말해 보기';
const CLOTHES_MISSION = '오늘 입은 옷 이름을 영어로 말해 보기';

A.THEMES = [
  { id: 'wear', ko: '옷·신발', en: 'Clothes & Shoes', icon: '👕', cover: 'tshirt', color: '#c9dcff',
    games: ALL_GAMES,
    mission: CLOTHES_MISSION,
    words: [
      ['tshirt', 'shirt', '티셔츠'], ['jeans', 'jeans', '청바지'], ['dress', 'dress', '원피스'], ['shorts', 'shorts', '반바지'], ['socks', 'socks', '양말'],
      ['sneakers', 'sneakers', '운동화'], ['boots', 'boots', '부츠'], ['shoe', 'shoe', '구두'], ['sandal', 'sandal', '샌들'], ['cap', 'cap', '야구모자'],
      ['umbrella', 'umbrella', '우산'], ['clothes', 'clothes', '옷'], ['glasses', 'glasses', '안경'], ['gloves', 'gloves', '장갑'], ['scarf', 'scarf', '목도리'],
      ['backpack', 'backpack', '책가방'], ['coat', 'coat', '외투'], ['swimsuit', 'swimsuit', '수영복'], ['balletshoes', 'ballet shoes', '발레화'], ['bag', 'bag', '핸드백'],
    ] },
];

// 5개씩 묶음으로 나누기 (맨 끝 묶음은 5개보다 적을 수 있음)
A.GROUP_SIZE = 5;
A.THEMES.forEach(t => {
  t.words = t.words.map(([id, en, ko, say]) => ({
    id, en, ko, say: say || en,
    art: NO_ART_IDS.has(id) ? '' : (/^[aeiou]/i.test(en) ? 'an' : 'a'),
    plural: PLURAL_IDS.has(id),
  }));
  t.groups = [];
  for (let i = 0; i < t.words.length; i += A.GROUP_SIZE) {
    t.groups.push(t.words.slice(i, i + A.GROUP_SIZE));
  }
});
