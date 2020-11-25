import * as crypto from 'crypto-js';
import {SetItem} from '../interfaces/set-item';

export class StorageCrypter {
    //
    /// private
    //
    constructor(secretWord: string) {
        this._secretWord = secretWord;
    }

    private _secretWord: string = '';

    /** This will set the pair key value inside the Session storage */
    public setItem(key: string, value: string, env: 'local' | 'session' = 'session'): void {
        env === 'session' ? sessionStorage.setItem(crypto.MD5(key).toString(), crypto.Rabbit.encrypt(value, this._secretWord, undefined).toString()) : localStorage.setItem(crypto.MD5(key).toString(), crypto.Rabbit.encrypt(value, this._secretWord, undefined).toString());
    }

    /** This will get the pair value from the Session storage with the given key */
    /** If the key isn't inside the Storage it'll turn an empty string */
    public getItem(key: string, env: 'local' | 'session' = 'session'): string {
        const keyEnc = crypto.MD5(key).toString();
        const keyValue = env === 'local' ? localStorage.getItem(keyEnc) : sessionStorage.getItem(keyEnc);
        if (keyValue) {
            return crypto.Rabbit.decrypt(keyValue, this._secretWord, undefined).toString(crypto.enc.Utf8);
        } else {
            return '';
        }
    }

    /** This will remove the pair key value from the Session Local with the given key */
    public removeItem(key: string, env: 'local' | 'session' = 'session'): void {
        const keyEnc = crypto.MD5(key).toString();
        env === 'local' ? localStorage.removeItem(keyEnc) : sessionStorage.removeItem(keyEnc);
    }

    /** Foreach triplet key - value - opt if the opt is set it will set the pair key - value inside the local o session storage  */
    /** else if the opt is remove it will remove the items from local or session storage */
    public gestItems(tripletList: SetItem[]): void {
        tripletList.forEach(triplet => {
            switch (triplet.opt) {
                case 'set':
                    this.setItem(triplet.key, triplet.value || '', triplet.env ? triplet.env : 'session');
                    break;
                case 'remove':
                    this.removeItem(triplet.key, triplet.env ? triplet.env : 'session');
                    break;
            }
        });
    }
}
