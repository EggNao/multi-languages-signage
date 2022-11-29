export type CountryType =
  | 'jp' // 日本
  | 'kr' // 韓国
  | 'au' // オーストラリア
  | 'ch' // 中国
  | 'id' // インドネシア
  | 'in' // インド
  | 'th' // タイ
  | 'tw' // 台湾
  | 'uk' // イギリス

export type GetTLDType = {
  [s: string]: number
}

export type LanguageType = 'japanese' | 'english'
