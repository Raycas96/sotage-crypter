import {StorageCrypter} from '../storage-crypter/storage-crypter';
import {Subject} from 'rxjs';

export class StorageCrypterObservable extends StorageCrypter {

    constructor(secretWord: string) {
        super(secretWord);
    }

    /** Everytime you consider setItems or removeitems you’ll emit an object,which is made like this {opt: 'set' | 'remove' } */
    public storageSubject: Subject<{ opt: string }> = new Subject<{ opt: string }>();

    /** This will set the pair key value inside the Local storage */
    public setItem(key: string, value: string, env: 'local' | 'session' = 'session') {
        super.setItem(key, value, env);
        this.storageSubject.next({opt: 'set'});
    }

    /** This will remove the pair key value from the Session Local with the given key and emit only if there is the value inside the Storage*/
    public removeItem(key: string, env: "local" | "session" = 'session') {
        if (super.getItem(key)) {
            super.removeItem(key, env);
            this.storageSubject.next({opt: 'remove'});
        }
    }

}
