export interface StorageEmitValue{
    opt: 'set' | 'remove',
    oldValue?: string,
    newValue?: string,
    key?: string
}
