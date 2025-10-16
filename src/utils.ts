import type { BackendDateType } from "./types"

// 格式化数字
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ',')
}

// 格式化大小
export function formatSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const size = bytes / Math.pow(1024, i)
    return `${size.toFixed(2)} ${units[i]}`
}


const sdkVersions: Record<number, string> = {
    [10]: "5.0 alpha",
    [11]: "5.0 beta",
    [12]: "5.0.0",
    [13]: "5.0.1",
    [14]: "5.0.2",
    [15]: "5.0.3",
    [16]: "5.0.4",
    [17]: "5.0.5",
    [18]: "5.1.0",
    [19]: "5.1.1",
    [20]: "6.0.0",
}

const main_device_codes: Record<string, string> = {
    "0": "手机",
    "4": "平板"
}

export function formatMainDeviceCode(code: string): string {
    if (main_device_codes[code]) {
        return main_device_codes[code]
    }
    return `unknown(${code})`
}


export function formatSDKVersion(
    version: number,
) {
    if (sdkVersions[version]) {
        return `${sdkVersions[version]}(${version})`
    }
    return `unknown(${version})`
}

export function formatDate(date: Date | BackendDateType): string {
    // use -
    return new Date(date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

export function formatDatetime(date: Date | BackendDateType): string {
    // use -
    return new Date(date).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

let countryCodes: Record<string, string> = {}

let countries_codes: string[][] = [
    ['CN', '中国'],
    ['US', '美国'],
    ['JP', '日本'],
    ['KR', '韩国'],
    ['TW', '台湾'],
    ['HK', '香港'],
    ['MO', '澳门'],
    ['GB', '英国'],
    ['FR', '法国'],
    ['DE', '德国'],
    ['IT', '意大利'],
    ['ES', '西班牙'],
    ['PT', '葡萄牙'],
    ['RU', '俄罗斯'],
    ['AU', '澳大利亚'],
    ['NZ', '新西兰'],
    ['CA', '加拿大'],
    ['MX', '墨西哥'],
    ['BR', '巴西'],
    ['AR', '阿根廷'],
    ['CL', '智利'],
    ['CO', '哥伦比亚'],
    ['PE', '秘鲁'],
    ['UY', '乌拉圭'],
    ['VE', '委内瑞拉'],
    ['EC', '厄瓜多尔'],
    ['GT', '危地马拉'],
    ['HN', '洪都拉斯'],
    ['NI', '尼加拉瓜'],
    ['PA', '巴拿马'],
    ['SV', '萨尔瓦多'],
    ['BO', '玻利维亚'],
    ['PY', '巴拉圭'],
    ['DO', '多米尼加共和国'],
    ['CU', '古巴'],
    ['JM', '牙买加'],
    ['HT', '海地'],
    ['BS', '巴哈马'],
    ['AG', '安提瓜和巴布达'],
    ['BB', '巴巴多斯'],
    ['BZ', '伯利兹'],
    ['CR', '哥斯达黎加'],
]

export function formatCountryCode(code: string, unknown?: boolean): string {
    // upper
    code = code.toUpperCase()
    if (countryCodes[code]) {
        return `${countryCodes[code]}`
    } else if (unknown) {
        return `unknown(${code})` 
    } else {
        return code
    }
}

export function sortByCountryCode(a: string, b: string): number {
    const aCode = a.toUpperCase()
    const bCode = b.toUpperCase()
    // use countries_codes
    if (aCode == bCode) {
        return 0
    }
    let aidx = countries_codes.findIndex((item) => item[0] == aCode)
    let bidx = countries_codes.findIndex((item) => item[0] == bCode)
    if (aidx == -1) {
        aidx = countries_codes.length
    }
    if (bidx == -1) {
        bidx = countries_codes.length
    }
    return aidx - bidx
}

(() => {
    for (const [code, name] of countries_codes) {
        if (code == undefined || name == undefined) continue;
        if (countryCodes[code]) {
            console.warn(`countryCodes[${code}] already exists`)
        }
        countryCodes[code] = name
    }
})()