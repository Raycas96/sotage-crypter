import {StorageCrypter} from '../storage-crypter/storage-crypter';
import {Subject} from 'rxjs';
import {StorageEmitValue} from '../interfaces/storage-emit-value';

export class StorageCrypterObservable extends StorageCrypter {

    constructor(secretWord: string) {
        super(secretWord);
    }

    /** Everytime you consider setItems or removeitems you’ll emit an object,which is made like this {opt: 'set' | 'remove', oldValue: oldValue, newValue: newValue } */
    public storageSubject: Subject<StorageEmitValue> = new Subject<StorageEmitValue>();

    /** This will set the pair key value inside the Local storage and emit */
    public setItem(key: string, value: string, env: 'local' | 'session' = 'session') {
        const emitObj: StorageEmitValue = {opt: 'set'};
        if (super.getItem(key)) {
            emitObj.oldValue = super.getItem(key);
        } else {
            emitObj.oldValue = '';
        }
        emitObj.key = key;
        emitObj.newValue = value;
        super.setItem(key, value, env);
        this.storageSubject.next(emitObj);
    }

    /** This will remove the pair key value from the Session Local with the given key and emit only if there is the value inside the Storage*/
    public removeItem(key: string, env: 'local' | 'session' = 'session') {
        if (super.getItem(key)) {
            const emitObj: StorageEmitValue = {opt: 'remove', key, oldValue: super.getItem(key)};
            super.removeItem(key, env);
            this.storageSubject.next(emitObj);
        }
    }

}
