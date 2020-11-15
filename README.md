# Storage Crypter

Storage Crypter is a js library for encrypt and decrypt local and session storage made with crypto-js.

## Installation

Use the package manager npm to install storage-crypter.

```bash
npm i storage-crypter
```

## Usage

```python
import {StorageCrypter} from 'storage-crypter';
/** Initialize the class with your secret key */
public store = new StorageCrypter(secretKey);

/** This will set the pair key value inside the Session storage */
this.store.setItem(key, value);


/** This will remove the pair key value from the Session storage with the given key */
this.store.removeItem(key);

/** This will get the pair value from the Session storage with the given key */
this.store.getItem(key);


/** This will set the pair key value inside the Local storage */
this.store.setItem(key, value, 'local');

/** This will remove the pair key value from the Session Local with the given key */
this.store.removeItem(key, 'local');

/** This will get the pair value from the Local storage with the given key */
this.store.getItem(key, 'local');
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[ISC]
