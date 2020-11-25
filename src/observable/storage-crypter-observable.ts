import {StorageCrypter} from '../storage-crypter/storage-crypter';
import {Subject} from 'rxjs';
import {StorageEmitValue} from '../interfaces/storage-emit-value';
import {SetItem} from '../interfaces/set-item';

export class StorageCrypterObservable extends StorageCrypter {

    constructor(secretWord: string) {
        super(secretWord);
    }

    /** Everytime you consider setItems or removeitems you’ll emit an object,which is made like this {opt: 'set' | 'remove', oldValue: oldValue, newValue: newValue } */
    public storageSubject: Subject<StorageEmitValue | StorageEmitValue[]> = new Subject<StorageEmitValue | StorageEmitValue[]>();

    /** This will set the pair key value inside the Local storage and emit */
    public setItem(key: string, value: string, env: 'local' | 'session' = 'session'): void {
        const emitObj: StorageEmitValue = {opt: 'set', key, newValue: value};
        if (super.getItem(key)) {
            emitObj.oldValue = super.getItem(key);
        } else {
            emitObj.oldValue = '';
        }
        super.setItem(key, value, env);
        this.storageSubject.next(emitObj);
    }

    /** This will remove the pair key value from the Session Local with the given key and emit only if there is the value inside the Storage*/
    public removeItem(key: string, env: 'local' | 'session' = 'session'): void {
        if (super.getItem(key)) {
            const emitObj: StorageEmitValue = {opt: 'remove', key, oldValue: super.getItem(key), newValue: ''};
            super.removeItem(key, env);
            this.storageSubject.next(emitObj);
        }
    }

    /** This will set the pair key value inside the Local storage and emit */
    public gestItems(tripletList: SetItem[]): void {
        const emitObjList: StorageEmitValue[] = [] as StorageEmitValue[];
        tripletList.forEach(triplet => {
            switch (triplet.opt) {
                case 'set':
                    this.setItem(triplet.key, triplet.value || '', triplet.env ? triplet.env : 'session');
                    const emitObj: StorageEmitValue = {opt: 'set', key: triplet.key, newValue: triplet.value};
                    if (super.getItem(triplet.key)) {
                        emitObj.oldValue = super.getItem(triplet.key);
                    } else {
                        emitObj.oldValue = '';
                    }
                    emitObjList.push(emitObj);
                    break;
                case 'remove':
                    this.removeItem(triplet.key, triplet.env ? triplet.env : 'session');
                    emitObjList.push({
                        opt: 'remove',
                        key: triplet.key,
                        oldValue: super.getItem(triplet.key),
                        newValue: ''
                    })
                    break;
            }
        });
        this.storageSubject.next(emitObjList);
    }

}
