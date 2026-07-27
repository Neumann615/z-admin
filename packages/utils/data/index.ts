/**
 * 数据操作工具函数
 * 提供常用的数据处理、转换、验证等功能
 */

/**
 * 生成唯一ID
 * @param prefix ID前缀，默认为空
 * @param length ID长度（不含前缀），默认为16
 * @returns 唯一ID字符串
 */
export function generateId(prefix: string = '', length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }

  return prefix ? `${prefix}_${result}` : result
}

/**
 * 数组分组
 * @param array 要分组的数组
 * @param key 分组键（可以是字符串键名或函数）
 * @returns 分组后的对象
 */
export function groupBy<T>(array: T[], key: string | ((item: T) => string | number)): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : (item as any)[key]
    const keyStr = String(groupKey)

    if (!result[keyStr]) {
      result[keyStr] = []
    }
    result[keyStr].push(item)

    return result
  }, {} as Record<string, T[]>)
}

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的新对象
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T
  }

  if (typeof obj === 'object') {
    const cloned = {} as T
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        (cloned as any)[key] = deepClone((obj as any)[key])
      }
    }
    return cloned
  }

  return obj
}

/**
 * 对象合并（深合并）
 * @param target 目标对象
 * @param sources 源对象（可多个）
 * @returns 合并后的对象
 */
export function merge<T extends object>(target: T, ...sources: Record<string, any>[]): T {
  const result = deepClone(target)

  for (const source of sources) {
    if (!source || typeof source !== 'object')
      continue

    for (const key in source) {
      if (Object.hasOwn(source, key)) {
        const targetValue = (result as any)[key]
        const sourceValue = (source as any)[key]

        if (typeof targetValue === 'object' && typeof sourceValue === 'object' && targetValue !== null && sourceValue !== null) {
          (result as any)[key] = merge(targetValue, sourceValue)
        }
        else {
          (result as any)[key] = sourceValue
        }
      }
    }
  }

  return result
}

/**
 * 数组去重
 * @param array 要去重的数组
 * @param key 可选的去重键（用于对象数组）
 * @returns 去重后的数组
 */
export function unique<T>(array: T[], key?: string): T[] {
  if (!array || !Array.isArray(array)) {
    return []
  }

  if (key) {
    const seen = new Set()
    return array.filter((item) => {
      const itemKey = String((item as any)[key])
      if (seen.has(itemKey))
        return false
      seen.add(itemKey)
      return true
    })
  }

  return [...new Set(array)]
}

/**
 * 数组扁平化
 * @param array 要扁平化的数组
 * @param depth 扁平化深度，默认为无限深度
 * @returns 扁平化后的数组
 */
export function flatten<T>(array: any[], depth: number = Infinity): T[] {
  if (!Array.isArray(array)) {
    return []
  }

  return array.reduce((result, item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatten(item, depth - 1))
    }
    else {
      result.push(item)
    }
    return result
  }, [] as T[])
}

/**
 * 根据条件查找数组元素
 * @param array 目标数组
 * @param predicate 条件函数
 * @returns 找到的元素，未找到返回undefined
 */
export function find<T>(array: T[], predicate: (item: T, index: number) => boolean): T | undefined {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      return array[i]
    }
  }
  return undefined
}

/**
 * 对象属性筛选
 * @param obj 目标对象
 * @param keys 要保留的属性键数组
 * @returns 只包含指定属性的新对象
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }

  return result
}

/**
 * 对象属性排除
 * @param obj 目标对象
 * @param keys 要排除的属性键数组
 * @returns 排除指定属性后的新对象
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj } as Omit<T, K>

  for (const key of keys) {
    delete (result as any)[key]
  }

  return result
}

/**
 * 数组排序（支持多字段）
 * @param array 要排序的数组
 * @param key 排序字段（支持嵌套属性如 'a.b.c'）
 * @param order 排序顺序，'asc' 升序，'desc' 降序，默认为 'asc'
 * @returns 排序后的数组
 */
export function sortBy<T>(array: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] {
  const getValue = (obj: T, path: string): any => {
    return path.split('.').reduce((current, key) => (current && current[key]) ?? null, obj as any)
  }

  return [...array].sort((a, b) => {
    const valueA = getValue(a, key)
    const valueB = getValue(b, key)

    if (valueA === valueB)
      return 0

    const modifier = order === 'desc' ? -1 : 1

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * modifier
    }

    return (valueA > valueB ? 1 : -1) * modifier
  })
}
