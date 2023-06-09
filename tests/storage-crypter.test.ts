import { describe, expect, it } from "vitest";

import { storageCrypter } from '~/storage-crypter';

describe('storageCrypter', () => {
  describe('storageCrypter', () => {
    it('should be defined', () => {
   const { clearStorage,removeItem,setItem,getItem,switchFromSession,switchFromLocal } = storageCrypter('cazzoPalle');
   expect(clearStorage).toBeDefined();
   expect(removeItem).toBeDefined();
   expect(setItem).toBeDefined();
    expect(getItem).toBeDefined();
    expect(switchFromSession).toBeDefined();
    expect(switchFromLocal).toBeDefined();
  })
  })
});
