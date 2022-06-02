export function findOrThrow<T>(
    collection: T[],
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
): T {
    const result = collection.find(predicate)
    if (!result) throw new Error('Result not found')

    return result
}
