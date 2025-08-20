import { format, register} from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

/**
 * 입력된 날짜(Date 또는 문자열)를 현재 시각 기준으로 "얼마 전" 형식으로 변환
 *
 * @param {Date|string|number} date - 변환할 날짜 (Date 객체, 문자열, 타임스탬프 가능)
 * @param {string} lang - 사용할 언어 (기본: 'en_US', 한국어는 'ko')
 * @returns {string} - 예: "3분 전", "2일 전"
 */
export function formatAgo(date, lang = 'en_US') {
    return format(date, lang);
}

/**
 * 숫자를 한국식 단위(천 단위 콤마, compact 표기)로 포맷팅하는 NumberFormat 객체
 *
 * notation: "compact" → 숫자를 단축 표기 (예: 1천, 1만, 1억)
 * compactDisplay: "short" → 짧은 표기 사용
 *
 * 사용 예:
 * formatter.format(532)       // "532"
 * formatter.format(12345)     // "1.2만"
 * formatter.format(123456789) // "1.2억"
 */
const getFormatter = (lang = "ko-KR") =>
    new Intl.NumberFormat(lang, {
        notation: "compact",
        compactDisplay: "short",
    });

export const formatterKo = getFormatter("ko-KR");
export const formatterEn = getFormatter("en-US");

export const parseDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match[1] ? match[1].padStart(2, '0') : null;
    const minutes = match[2] ? match[2].padStart(2, '0') : '00';
    const seconds = match[3] ? match[3].padStart(2, '0') : '00';

    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};