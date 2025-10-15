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