/**
 * 文件处理工具函数
 * 提供文件大小格式化、Base64 转换、文件类型判断等功能
 */

/**
 * 文件大小单位换算
 * @param bytes 文件大小（字节）
 * @param decimals 小数位数，默认为 2
 * @returns 格式化后的文件大小字符串
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0)
    return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Number.parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`
}

/**
 * 将文件转换为 Base64 字符串
 * @param file File 对象
 * @returns Promise 解析为 Base64 字符串
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 将 Base64 字符串转换为 Blob 对象
 * @param base64 Base64 字符串
 * @returns Blob 对象
 */
export function base64ToBlob(base64: string): Blob {
  const parts = base64.split(',')
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream'
  const byteString = atob(parts[1])
  const byteArray = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i)
  }

  return new Blob([byteArray], { type: mime })
}

/**
 * 将 Base64 字符串转换为 File 对象
 * @param base64 Base64 字符串
 * @param filename 文件名
 * @returns File 对象
 */
export function base64ToFile(base64: string, filename: string): File {
  const blob = base64ToBlob(base64)
  return new File([blob], filename, { type: blob.type })
}

/**
 * 获取文件扩展名
 * @param filename 文件名
 * @returns 扩展名（不含点），如果没有扩展名返回空字符串
 */
export function getFileExtension(filename: string): string {
  if (!filename)
    return ''

  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === 0)
    return ''

  return filename.slice(lastDotIndex + 1).toLowerCase()
}

/**
 * 获取文件的 MIME 类型
 * @param filename 文件名或扩展名
 * @returns MIME 类型，如果无法识别返回 'application/octet-stream'
 */
export function getMimeType(filename: string): string {
  const ext = getFileExtension(filename) || filename.toLowerCase()

  const mimeTypes: Record<string, string> = {
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'xml': 'application/xml',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
  }

  return mimeTypes[ext] || 'application/octet-stream'
}

/**
 * 判断文件是否为图片类型
 * @param filename 文件名或 File 对象
 * @returns true 表示是图片
 */
export function isImage(filename: string | File): boolean {
  const name = typeof filename === 'string' ? filename : filename.name
  const ext = getFileExtension(name)

  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'ico'].includes(ext)
}

/**
 * 判断文件是否为视频类型
 * @param filename 文件名或 File 对象
 * @returns true 表示是视频
 */
export function isVideo(filename: string | File): boolean {
  const name = typeof filename === 'string' ? filename : filename.name
  const ext = getFileExtension(name)

  return ['mp4', 'webm', 'avi', 'mov', 'flv', 'wmv'].includes(ext)
}

/**
 * 判断文件是否为音频类型
 * @param filename 文件名或 File 对象
 * @returns true 表示是音频
 */
export function isAudio(filename: string | File): boolean {
  const name = typeof filename === 'string' ? filename : filename.name
  const ext = getFileExtension(name)

  return ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(ext)
}

/**
 * 判断文件是否为文档类型
 * @param filename 文件名或 File 对象
 * @returns true 表示是文档
 */
export function isDocument(filename: string | File): boolean {
  const name = typeof filename === 'string' ? filename : filename.name
  const ext = getFileExtension(name)

  return ['txt', 'html', 'css', 'js', 'json', 'xml', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)
}

/**
 * 判断文件是否为压缩包类型
 * @param filename 文件名或 File 对象
 * @returns true 表示是压缩包
 */
export function isArchive(filename: string | File): boolean {
  const name = typeof filename === 'string' ? filename : filename.name
  const ext = getFileExtension(name)

  return ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(ext)
}

/**
 * 生成下载链接并触发下载
 * @param blob Blob 对象
 * @param filename 文件名
 * @returns 下载链接 URL
 */
export function createDownloadUrl(blob: Blob, filename: string): string {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  return url
}

/**
 * 下载 Base64 图片
 * @param base64 Base64 图片字符串
 * @param filename 文件名
 */
export function downloadBase64Image(base64: string, filename: string): void {
  const blob = base64ToBlob(base64)
  createDownloadUrl(blob, filename)
}

/**
 * 限制文件大小
 * @param file File 对象
 * @param maxSize 最大大小（字节）
 * @returns true 表示文件大小符合要求
 */
export function isFileSizeValid(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

/**
 * 限制文件类型
 * @param file File 对象
 * @param allowedTypes 允许的文件类型数组（可以是扩展名或 MIME 类型）
 * @returns true 表示文件类型符合要求
 */
export function isFileTypeValid(file: File, allowedTypes: string[]): boolean {
  const filename = file.name
  const ext = getFileExtension(filename)
  const mimeType = file.type

  return allowedTypes.some((type) => {
    const lowerType = type.toLowerCase()
    return lowerType === ext || lowerType === mimeType || lowerType === '*'
  })
}
