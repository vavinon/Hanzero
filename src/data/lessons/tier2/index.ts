/**
 * src/data/lessons/tier2/index.ts
 * Master Export & Loader for Tier 2 Traveler Quest Curriculum (Units 11–25).
 * Adheres strictly to AGENTS.md §4.2: Pure TypeScript, Strict Typing, Zero 'any'.
 */

import unit11 from './unit11_scan_pay.json';
import unit12 from './unit12_delivery_courier.json';
import unit13 from './unit13_hsr_travel.json';
import unit14 from './unit14_renting_utilities.json';
import unit15 from './unit15_advanced_dining.json';
import unit16 from './unit16_shopping_returns.json';
import unit17 from './unit17_advanced_clinic.json';
import unit18 from './unit18_bank_telecom.json';
import unit19 from './unit19_festivals_visits.json';
import unit20 from './unit20_emergencies.json';
import unit21 from './unit21_entertainment.json';
import unit22 from './unit22_fitness.json';
import unit23 from './unit23_workplace.json';
import unit24 from './unit24_opinions.json';
import unit25 from './unit25_grand_boss_odyssey.json';
import { UnitLessonData, Lesson } from '../../../types/lesson';

export interface HsrStation {
  unitId: string;
  unitNumber: number;
  stationNameZh: string;
  stationNamePinyin: string;
  stationNameTh: string;
  metropolisId: 'beijing' | 'xian' | 'chengdu' | 'shanghai';
  metropolisNameZh: string;
  metropolisNameTh: string;
  taglineTh: string;
  isHub: boolean;
  lessons: Lesson[];
}

export interface MetropolisHub {
  id: 'beijing' | 'xian' | 'chengdu' | 'shanghai';
  nameZh: string;
  namePinyin: string;
  nameTh: string;
  taglineTh: string;
  badgeIcon: string;
  stationUnitNumbers: number[];
  color: string;
}

export const tier2Units: UnitLessonData[] = [
  unit11 as unknown as UnitLessonData,
  unit12 as unknown as UnitLessonData,
  unit13 as unknown as UnitLessonData,
  unit14 as unknown as UnitLessonData,
  unit15 as unknown as UnitLessonData,
  unit16 as unknown as UnitLessonData,
  unit17 as unknown as UnitLessonData,
  unit18 as unknown as UnitLessonData,
  unit19 as unknown as UnitLessonData,
  unit20 as unknown as UnitLessonData,
  unit21 as unknown as UnitLessonData,
  unit22 as unknown as UnitLessonData,
  unit23 as unknown as UnitLessonData,
  unit24 as unknown as UnitLessonData,
  unit25 as unknown as UnitLessonData,
];

export const METROPOLIS_HUBS: MetropolisHub[] = [
  {
    id: 'beijing',
    nameZh: '北京',
    namePinyin: 'Běijīng',
    nameTh: 'ปักกิ่ง',
    taglineTh: 'ก้าวแรกชีวิตดิจิทัล & เมืองหลวงร่วมสมัย',
    badgeIcon: '🏮',
    stationUnitNumbers: [11, 12, 13, 14],
    color: '#D97706', // Warm Ochre
  },
  {
    id: 'xian',
    nameZh: '西安',
    namePinyin: 'Xī\'ān',
    nameTh: 'ซีอาน',
    taglineTh: 'รากเหง้าประวัติศาสตร์ & วิถีชีวิตท้องถิ่น',
    badgeIcon: '🏺',
    stationUnitNumbers: [15, 16, 17, 18],
    color: '#B45309', // Terracotta
  },
  {
    id: 'chengdu',
    nameZh: '成都',
    namePinyin: 'Chéngdū',
    nameTh: 'เฉิงตู',
    taglineTh: 'เสน่ห์เสฉวน สโลว์ไลฟ์ & รับมือเหตุฉุกเฉิน',
    badgeIcon: '🐼',
    stationUnitNumbers: [19, 20, 21, 22],
    color: '#059669', // Emerald Jade
  },
  {
    id: 'shanghai',
    nameZh: '上海',
    namePinyin: 'Shànghǎi',
    nameTh: 'เซี่ยงไฮ้',
    taglineTh: 'มหานครเศรษฐกิจ & แบ็กแพ็กข้าม 4 มหานคร',
    badgeIcon: '🏙️',
    stationUnitNumbers: [23, 24, 25],
    color: '#2563EB', // High-Speed Cyan-Blue
  },
];

const STATION_METRO_NAMES: Record<number, { zh: string; pinyin: string; th: string }> = {
  11: { zh: '北京南站', pinyin: 'Běijīngnán Zhàn', th: 'สถานีปักกิ่งใต้' },
  12: { zh: '三里屯站', pinyin: 'Sānlǐtún Zhàn', th: 'สถานีซานหลี่ถุน' },
  13: { zh: '清河高铁站', pinyin: 'Qīnghé Gāotiě Zhàn', th: 'สถานีรถไฟความเร็วสูงชิงเหอ' },
  14: { zh: '望京科技站', pinyin: 'Wàngjīng Kējì Zhàn', th: 'สถานีเทคโนโลยีวั่งจิง' },
  15: { zh: '西安北站', pinyin: 'Xī\'ānběi Zhàn', th: 'สถานีซีอานเหนือ' },
  16: { zh: '回民街口站', pinyin: 'Huímínjiē Kǒu Zhàn', th: 'สถานีชุมชนอาหารหุยหมิน' },
  17: { zh: '大雁塔医疗站', pinyin: 'Dàyàntǎ Yīliáo Zhàn', th: 'สถานีการแพทย์เจดีย์ห่านป่าใหญ่' },
  18: { zh: '钟楼政务站', pinyin: 'Zhōnglóu Zhèngwù Zhàn', th: 'สถานีหอระฆังบริการรัฐ' },
  19: { zh: '成都东站', pinyin: 'Chéngdūdōng Zhàn', th: 'สถานีเฉิงตูตะวันออก' },
  20: { zh: '春熙路应急站', pinyin: 'Chūnxīlù Yìngjí Zhàn', th: 'สถานีชุนซีลู่ฉุกเฉิน' },
  21: { zh: '宽窄巷子站', pinyin: 'Kuānzhǎi Xiàngzi Zhàn', th: 'สถานีตรอกกว้างแคบ' },
  22: { zh: '锦里活力站', pinyin: 'Jǐnlǐ Huólì Zhàn', th: 'สถานีจิ่นหลี่สันทนาการ' },
  23: { zh: '上海虹桥站', pinyin: 'Shànghǎi Hóngqiáo Zhàn', th: 'สถานีเซี่ยงไฮ้หงเฉียว' },
  24: { zh: '陆家嘴金融站', pinyin: 'Lùjiāzuǐ Jīnróng Zhàn', th: 'สถานีการเงินลู่เจียจุ่ย' },
  25: { zh: '外滩终点站', pinyin: 'Wàitān Zhōngdiǎn Zhàn', th: 'สถานีเดอะบันด์แกรนด์แคปสโตน' },
};

/**
 * Returns all 15 HSR Metro Stations mapped with curriculum units.
 */
export function getHsrStations(): HsrStation[] {
  return tier2Units.map((unit) => {
    const hub = METROPOLIS_HUBS.find((h) => h.stationUnitNumbers.includes(unit.unit_number)) || METROPOLIS_HUBS[0];
    const metroMeta = STATION_METRO_NAMES[unit.unit_number] || {
      zh: `${unit.title.zh}站`,
      pinyin: `${unit.unit_id} Zhàn`,
      th: `สถานี ${unit.title.th}`,
    };

    return {
      unitId: unit.unit_id,
      unitNumber: unit.unit_number,
      stationNameZh: metroMeta.zh,
      stationNamePinyin: metroMeta.pinyin,
      stationNameTh: metroMeta.th,
      metropolisId: hub.id,
      metropolisNameZh: hub.nameZh,
      metropolisNameTh: hub.nameTh,
      taglineTh: unit.title.th,
      isHub: [11, 15, 19, 23, 25].includes(unit.unit_number),
      lessons: unit.lessons,
    };
  });
}

/**
 * Retrieves a Tier 2 unit by its unit_id (e.g. 'tier2_u11').
 */
export function getTier2Unit(unitId: string): UnitLessonData | undefined {
  return tier2Units.find((u) => u.unit_id === unitId);
}

/**
 * Returns all 15 Tier 2 units.
 */
export function getAllTier2Units(): UnitLessonData[] {
  return tier2Units;
}
