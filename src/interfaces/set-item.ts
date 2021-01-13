export interface SetItem {
    opt: 'set' | 'remove';
    key: string;
    value: string;
    env: 'local' | 'session';
}
