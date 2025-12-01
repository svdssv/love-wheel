
import { IntimacyLevel, ItemType, WheelItem } from './types';

// --- Color Palettes ---

const SWEET_COLORS = [
  '#FF9A9E', '#FECFEF', '#FFB7B2', '#FFDAC1', 
  '#E2F0CB', '#B5EAD7', '#C7CEEA', '#F6EAC2',
  '#FFC3A0', '#D5AAFF', '#85E3FF', '#BFFCC6'
];

const FLIRTY_COLORS = [
  '#A18CD1', '#FBC2EB', '#8FD3F4', '#84FAB0', 
  '#FCCB90', '#D57EEB', '#E0C3FC', '#8EC5FC',
  '#FA709A', '#FEE140', '#96E6A1', '#D4FC79'
];

// Darker, richer colors for HOT mode
const HOT_COLORS = [
  '#8B0000', '#B22222', '#DC143C', '#FF0000', 
  '#FF4500', '#C71585', '#800080', '#4B0082',
  '#2F4F4F', '#A52A2A', '#D2691E', '#800000'
];

// --- Content Pools ---

const ITEM_POOLS: Record<IntimacyLevel, { text: string; type: ItemType }[]> = {
  [IntimacyLevel.Sweet]: [
    { text: '为对方吹头发', type: ItemType.Reward },
    { text: '深情对视30秒', type: ItemType.Punishment },
    { text: '公主抱深蹲3个', type: ItemType.Punishment },
    { text: '夸赞对方3个优点', type: ItemType.Reward },
    { text: '给对方买杯奶茶', type: ItemType.Reward },
    { text: '模仿对方的表情', type: ItemType.Punishment },
    { text: '为对方按摩肩膀', type: ItemType.Reward },
    { text: '拍一张搞怪合照', type: ItemType.Punishment },
    { text: '清空购物车(200元)', type: ItemType.Reward },
    { text: '做一个丑脸逗笑', type: ItemType.Punishment },
    { text: '为对方剪指甲', type: ItemType.Reward },
    { text: '背对方绕一圈', type: ItemType.Punishment },
    { text: '喂对方吃零食', type: ItemType.Reward },
    { text: '唱一首情歌', type: ItemType.Punishment },
    { text: '帮对方洗袜子', type: ItemType.Punishment },
    { text: '拥抱一分钟', type: ItemType.Reward },
    { text: '说“我爱你”5次', type: ItemType.Punishment },
    { text: '给对方梳头', type: ItemType.Reward },
    { text: '做顿爱心早餐', type: ItemType.Reward },
    { text: '模仿小猫叫', type: ItemType.Punishment },
    { text: '刮鼻子五下', type: ItemType.Punishment },
    { text: '手写一封情书', type: ItemType.Reward },
    { text: '帮对方捶背', type: ItemType.Reward },
    { text: '壁纸换合照一周', type: ItemType.Punishment },
    { text: '一起敷面膜', type: ItemType.Reward },
    { text: '讲一个笑话', type: ItemType.Punishment },
    { text: '亲吻额头', type: ItemType.Reward },
    { text: '答应一个愿望', type: ItemType.Reward },
    { text: '帮对方洗头', type: ItemType.Reward },
    { text: '模仿大猩猩', type: ItemType.Punishment },
    { text: '陪看恐怖片', type: ItemType.Reward },
    { text: '大声喊我爱你', type: ItemType.Punishment },
    { text: '喝一杯柠檬汁', type: ItemType.Punishment },
    { text: '给对方掏耳朵', type: ItemType.Reward },
    { text: '穿对方的衣服', type: ItemType.Punishment },
    { text: '跳一支舞', type: ItemType.Punishment },
    { text: '喂对方吃饭', type: ItemType.Reward },
    { text: '学撒娇30秒', type: ItemType.Punishment },
    { text: '讲个冷笑话', type: ItemType.Punishment },
    { text: '陪对方散步', type: ItemType.Reward },
    { text: '一起做饭', type: ItemType.Reward },
    { text: '给对方涂指甲油', type: ItemType.Reward },
    { text: '为对方刮胡子', type: ItemType.Reward },
    { text: '对视不许笑', type: ItemType.Punishment },
    { text: '发朋友圈夸对方', type: ItemType.Punishment },
    { text: '帮对方系鞋带', type: ItemType.Punishment },
    { text: '允许查看手机1分', type: ItemType.Punishment },
    { text: '给对方剥虾/水果', type: ItemType.Reward },
    { text: '膝枕十分钟', type: ItemType.Reward },
    { text: '任由对方捏脸', type: ItemType.Punishment },
  ],
  [IntimacyLevel.Flirty]: [
    { text: '种一个草莓(吻痕)', type: ItemType.Reward },
    { text: '咬耳朵说情话', type: ItemType.Reward },
    { text: '用嘴喂食水果', type: ItemType.Punishment },
    { text: '蒙眼猜身体部位', type: ItemType.Punishment },
    { text: '全身精油按摩', type: ItemType.Reward },
    { text: '跳一段性感舞蹈', type: ItemType.Punishment },
    { text: '法式热吻1分钟', type: ItemType.Reward },
    { text: '真心话大冒险', type: ItemType.Punishment },
    { text: '轻咬对方嘴唇', type: ItemType.Reward },
    { text: '十指紧扣对视', type: ItemType.Punishment },
    { text: '在脖颈处哈气', type: ItemType.Reward },
    { text: '大腿夹住对方手', type: ItemType.Punishment },
    { text: '亲吻喉结/锁骨', type: ItemType.Reward },
    { text: '用舌头写字', type: ItemType.Punishment },
    { text: '脱掉一件衣物', type: ItemType.Punishment },
    { text: '发出诱惑声音', type: ItemType.Punishment },
    { text: '轻抚对方大腿', type: ItemType.Reward },
    { text: '面对面坐大腿', type: ItemType.Punishment },
    { text: '用鼻子蹭对方', type: ItemType.Reward },
    { text: '互相涂唇膏', type: ItemType.Reward },
    { text: '从背后拥抱', type: ItemType.Reward },
    { text: '咬手指诱惑', type: ItemType.Punishment },
    { text: '闻对方的味道', type: ItemType.Reward },
    { text: '壁咚深吻', type: ItemType.Punishment },
    { text: '解开两颗扣子', type: ItemType.Punishment },
    { text: '用嘴解扣子', type: ItemType.Reward },
    { text: '亲吻大腿内侧', type: ItemType.Reward },
    { text: '轻咬耳垂', type: ItemType.Reward },
    { text: '被对方画口红', type: ItemType.Punishment },
    { text: '只穿内衣十分钟', type: ItemType.Punishment },
    { text: '用身体暖手', type: ItemType.Reward },
    { text: '抚摸对方腹肌/胸', type: ItemType.Reward },
    { text: '坐在对方腰上', type: ItemType.Reward },
    { text: '蒙眼被喂食', type: ItemType.Punishment },
    { text: '舔对方的手指', type: ItemType.Punishment },
    { text: '用胸蹭对方', type: ItemType.Reward },
    { text: '屁股写字', type: ItemType.Punishment },
    { text: '互相脱一件', type: ItemType.Reward },
    { text: '咬对方下巴', type: ItemType.Reward },
    { text: '手伸进衣服里', type: ItemType.Punishment },
    { text: '用腿夹住对方', type: ItemType.Punishment },
    { text: '互相喂酒', type: ItemType.Reward },
    { text: '隔着衣服亲吻', type: ItemType.Punishment },
    { text: '互相咬耳朵', type: ItemType.Punishment },
    { text: '用脚趾碰对方', type: ItemType.Punishment },
    { text: '亲吻后颈', type: ItemType.Reward },
    { text: '互相揉胸口', type: ItemType.Punishment },
  ],
  [IntimacyLevel.Hot]: [
    { text: '蒙眼触觉探索', type: ItemType.Reward },
    { text: '用冰块划过全身', type: ItemType.Punishment },
    { text: '双手被丝带绑住', type: ItemType.Punishment },
    { text: '全身涂满乳液', type: ItemType.Reward },
    { text: '听从指令10分钟', type: ItemType.Punishment },
    { text: '穿对方喜欢的衣服', type: ItemType.Reward },
    { text: '亲吻敏感部位', type: ItemType.Reward },
    { text: '用羽毛挑逗全身', type: ItemType.Reward },
    { text: '角色扮演(主人/仆)', type: ItemType.Punishment },
    { text: '浴室共浴', type: ItemType.Reward },
    { text: '用嘴脱对方袜子', type: ItemType.Punishment },
    { text: '轻打屁股5下', type: ItemType.Punishment },
    { text: '在耳边喘息1分钟', type: ItemType.Reward },
    { text: '用领带蒙眼', type: ItemType.Punishment },
    { text: '在背上写字(口红)', type: ItemType.Reward },
    { text: '只能穿衬衫', type: ItemType.Punishment },
    { text: '互相探索身体', type: ItemType.Reward },
    { text: '必须喊“主人”', type: ItemType.Punishment },
    { text: '坐在对方脸上', type: ItemType.Punishment },
    { text: '互相按摩放松', type: ItemType.Reward },
    { text: '用脚帮对方按摩', type: ItemType.Punishment },
    { text: '只能用嘴服务', type: ItemType.Punishment },
    { text: '喂对方吃冰淇淋', type: ItemType.Reward },
    { text: '在镜子前拥吻', type: ItemType.Reward },
    { text: '拍摄一段舞蹈', type: ItemType.Punishment },
    { text: '使用震动按摩仪', type: ItemType.Reward },
    { text: '在落地窗前拥抱', type: ItemType.Reward },
    { text: '夹子夹耳垂', type: ItemType.Punishment },
    { text: '厨房做饭时拥抱', type: ItemType.Reward },
    { text: '客厅沙发热吻', type: ItemType.Reward },
    { text: '互相咬肩膀', type: ItemType.Punishment },
    { text: '深吻直到缺氧', type: ItemType.Reward },
    { text: '互相剃须/修眉', type: ItemType.Punishment },
    { text: '车内听歌拥抱', type: ItemType.Reward },
    { text: '站立式拥吻', type: ItemType.Reward },
    { text: '抱着对方走一圈', type: ItemType.Punishment },
    { text: '必须看着眼睛说话', type: ItemType.Reward },
    { text: '不许发出声音', type: ItemType.Punishment },
    { text: '一直叫对方名字', type: ItemType.Reward },
    { text: '挑逗直到对方求饶', type: ItemType.Punishment },
    { text: '用嘴喂对方喝酒', type: ItemType.Reward },
    { text: '在锁骨种草莓', type: ItemType.Reward },
    { text: '尝试一个新姿势', type: ItemType.Punishment },
    { text: '用手铐铐住(玩具)', type: ItemType.Punishment },
    { text: '在对方身上画画', type: ItemType.Reward },
    { text: '互相涂抹精油', type: ItemType.Reward },
    { text: '咬住对方的领带', type: ItemType.Punishment },
    { text: '在脖子上留下印记', type: ItemType.Reward },
    { text: '不仅限于亲吻', type: ItemType.Reward },
    { text: '为对方穿上衣服', type: ItemType.Punishment },
  ]
};

// --- Theme Config ---

export const LEVEL_CONFIG = {
  [IntimacyLevel.Sweet]: {
    label: '甜蜜',
    icon: '🍬',
    description: 'Warm & Cozy',
    bgGradient: 'bg-gradient-to-br from-pink-50 to-blue-50',
    blobColors: ['bg-pink-300', 'bg-blue-300', 'bg-purple-300'],
    textColor: 'text-gray-800',
    subTextColor: 'text-gray-500',
    accentColor: 'text-pink-500',
    panelClass: 'glass-panel',
    tabActive: 'bg-white text-pink-500 shadow-md',
    tabInactive: 'text-gray-500 hover:bg-white/50',
    actionBtn: 'bg-white/50 hover:bg-white text-pink-500',
    mainBtn: 'bg-gradient-to-r from-pink-400 to-rose-400'
  },
  [IntimacyLevel.Flirty]: {
    label: '暧昧',
    icon: '💋',
    description: 'Playful & Teasing',
    bgGradient: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50',
    blobColors: ['bg-purple-300', 'bg-pink-300', 'bg-indigo-300'],
    textColor: 'text-gray-900',
    subTextColor: 'text-gray-600',
    accentColor: 'text-purple-600',
    panelClass: 'glass-panel',
    tabActive: 'bg-white text-purple-600 shadow-md',
    tabInactive: 'text-gray-500 hover:bg-white/50',
    actionBtn: 'bg-white/50 hover:bg-white text-purple-600',
    mainBtn: 'bg-gradient-to-r from-purple-500 to-indigo-500'
  },
  [IntimacyLevel.Hot]: {
    label: '激情',
    icon: '🔥',
    description: 'Deep & Intense',
    bgGradient: 'bg-gradient-to-br from-gray-900 via-red-950 to-black',
    blobColors: ['bg-red-600', 'bg-orange-600', 'bg-yellow-600'],
    textColor: 'text-white',
    subTextColor: 'text-gray-400',
    accentColor: 'text-red-500',
    panelClass: 'glass-panel-dark',
    tabActive: 'bg-red-600 text-white shadow-md shadow-red-900/50',
    tabInactive: 'text-gray-400 hover:bg-white/10',
    actionBtn: 'bg-white/10 hover:bg-white/20 text-red-500',
    mainBtn: 'bg-gradient-to-r from-red-600 to-orange-600'
  }
};

// --- Helpers ---

export const getRandomSelection = (level: IntimacyLevel): WheelItem[] => {
  const pool = ITEM_POOLS[level];
  // Shuffle array
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  // Pick 12 items
  const selected = shuffled.slice(0, 12);
  
  // Assign colors based on level
  let colors: string[];
  switch(level) {
    case IntimacyLevel.Hot: colors = HOT_COLORS; break;
    case IntimacyLevel.Flirty: colors = FLIRTY_COLORS; break;
    default: colors = SWEET_COLORS;
  }

  return selected.map((item, index) => ({
    id: Math.random().toString(36).substr(2, 9),
    text: item.text,
    type: item.type,
    color: colors[index % colors.length]
  }));
};
