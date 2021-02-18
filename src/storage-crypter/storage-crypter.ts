import * as crypto from 'crypto-es'

export class StorageCrypter {
    //
    /// private
    //
    constructor (secretWord: string) {
        this._secretWord = secretWord
    }

    private _secretWord: string = '';

    /** This will set the pair key value inside the Session storage */
    public setItem (key: string, value: string, env: 'local' | 'session' = 'session'): void {
        env === 'session' ? sessionStorage.setItem(crypto.default.MD5(key).toString(), crypto.default.Rabbit.encrypt(value, this._secretWord, undefined).toString()) : localStorage.setItem(crypto.default.MD5(key).toString(), crypto.default.Rabbit.encrypt(value, this._secretWord, undefined).toString())
    }

    /** This will get the pair value from the Session storage with the given key */
    /** If the key isn't inside the Storage it'll turn an empty string */
    public getItem (key: string, env: 'local' | 'session' = 'session'): string {
        const keyEnc = crypto.default.MD5(key).toString()
        const keyValue = env === 'local' ? localStorage.getItem(keyEnc) : sessionStorage.getItem(keyEnc)
        if (keyValue) {
            return crypto.default.Rabbit.decrypt(keyValue, this._secretWord, undefined).toString(crypto.default.enc.Utf8)
        } else {
            return ''
        }
    }

    /** This will remove the pair key value from the Session Local with the given key */
    public removeItem (key: string, env: 'local' | 'session' = 'session'): void {
        const keyEnc = crypto.default.MD5(key).toString()
        env === 'local' ? localStorage.removeItem(keyEnc) : sessionStorage.removeItem(keyEnc)
    }
}
