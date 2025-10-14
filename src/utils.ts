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