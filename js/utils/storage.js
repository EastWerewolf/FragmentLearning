
var proxyStorage = {
    /**
     * 返回 Storage 代理
     * @returns Proxy
     * @example
     * proxyStorage.getStorageProxy(localStorage, '_')
     */
    getStorageProxy: (storage, prefix) => {
        if (!storage)
            return false;
        const getKey = (prop) => `${prefix}.${String(prop)}`;
        return new Proxy(new Object(), {
            /**
             * 设置 storage
             * @returns boolean
             * @example
             * const storageProxy = proxyStorage.getStorageProxy(localStorage, '_');
             * storageProxy.a = 1;
             */
            set(target, prop, value) {
                target[prop] = value;
                storage.setItem(getKey(prop), JSON.stringify(value));
                return true;
            },
            /**
             * 获取 storage
             * @returns boolean
             * @example
             * const storageProxy = proxyStorage.getStorageProxy(localStorage, '_');
             * console.log(storageProxy.a);
             */
            get(_, prop) {
                return JSON.parse(storage.getItem(getKey(prop)) || '');
            },
            /**
             * 删除 storage
             * @returns boolean
             * @example
             * const storageProxy = proxyStorage.getStorageProxy(localStorage, '_');
             * delete storageProxy.a;
             */
            deleteProperty(_, prop) {
                storage.removeItem(getKey(prop));
                return true;
            },
            /**
             * 清空 storage
             * @returns boolean
             * @example
             * const storageProxy = proxyStorage.getStorageProxy(localStorage, '_');
             * Object.preventExtensions(storageProxy);
             */
            preventExtensions(target) {
                Object.preventExtensions(target);
                storage.clear();
                return true;
            },
            /**
             * 查询 storage
             * @returns boolean
             * @example
             * const storageProxy = proxyStorage.getStorageProxy(localStorage, '_');
             * 'a' in storageProxy;
             */
            has(target, prop) {
                try {
                    return !!storage.key(prop);
                } catch (error) {
                    return false;
                }
            }
        });
    },
};

var proxyStorageTest = proxyStorage.getStorageProxy(localStorage, '_');
