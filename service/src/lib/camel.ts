/**
 * snake_case → camelCase 键名转换
 * 仅转换对象自身的直接属性（不递归），并保留原始值类型
 */
export function toCamelCase<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase())
    result[camelKey] = obj[key]
  }
  return result as T
}

/** 批量转换数组 */
export function toCamelCaseList<T>(arr: Record<string, unknown>[]): T[] {
  return arr.map(item => toCamelCase<T>(item))
}
