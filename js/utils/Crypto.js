// 检测客户端浏览器是否支持
// const window = globalThis
// const crypto = window.crypto || window.msCrypto; // for IE 11

if (crypto.subtle){
    //...
} else {
    console.log("Unable to create window.crypto object");
}

// 伪随机数生成器
const array = new Uint32Array(10);
crypto.getRandomValues(array);

// 单向散列函数
// 又称为单向哈希函数、杂凑函数，可以把任意长度的输入消息，转变成固定长度的输出(散列值)。单向，指的是无法根据散列值，反推输入的消息。常见的有SHA-256、SHA-512等
// const digest = crypto.subtle.digest(algorithm, data);
const text = 'An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.';
async function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    console.log(data,'data')
    return await crypto.subtle.digest('SHA-256', data);
}

const digestBuffer = await digestMessage(text);
console.log(digestBuffer.byteLength); // 32

// 消息认证码
// 消息认证码可以用来确保消息的完整性，并提供认证，需要配合共享密钥和特定算法来实现，最终会输出固定长度的MAC值。
// HMAC是一种使用单向散列函数来构造消息认证码的方法，开头的H就是Hash的意思，在Web Crypto API中可以通过crypto.subtle.sign()和verify()方法实现

const signature = crypto.subtle.sign(algorithm, key, data);

const result = crypto.subtle.verify(algorithm, key, mac, data);
// 说明：
// 通过传入"HMAC"字符串或者{ "name": "HMAC" }，来使用HMAC；key为共享密钥，可以事先生成或导入；mac为散列值；data为ArrayBuffer或ArrayBuffer视图对象

const text = "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function getMac(message, key){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return await crypto.subtle.sign("HMAC", key, data);
}

async function verifyMac(message, key, mac){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return await crypto.subtle.verify("HMAC", key, mac, data);
}

async function generateKey() {
    return await crypto.subtle.generateKey(
        {
            name: "HMAC",
            hash: { name: "SHA-256" } //可以是 "SHA-1", "SHA-256", "SHA-384", 或 "SHA-512"
        },
        true, // 是否可提取，比如用于导入导出
        ["sign", "verify"] // 用途
    );
}

const key = await generateKey();
const mac = await getMac(text, key);
console.log(mac.byteLength); // 32

const result = await verifyMac(text, key, mac);
console.log(result); // true


// 对称加密
// const result = crypto.subtle.encrypt(algorithm, key, data);
// const result = crypto.subtle.decrypt(algorithm, key, data);

const text = "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";
let iv;

async function encryptMessage(message, key){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    iv = crypto.getRandomValues(new Uint8Array(12));// 推荐12字节
    return await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv,
            tagLength: 128, //可选，默认128，还可以是32, 64, 96, 104, 112, 120
        },
        key,
        data
    );
}

async function decryptMessage(cipherText, iv, key){
    const result = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv,
            tagLength: 128
        },
        key,
        cipherText
    );
    const decoder = new TextDecoder();
    return decoder.decode(result);
}

async function generateKey() {
    return await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256, //可以是128, 192, 256, 但Chrome当前不支持192
        },
        true,
        ["encrypt", "decrypt"]
    );
}

const key = await generateKey();
const cipherText = await encryptMessage(text, key);
const plainText = await decryptMessage(cipherText, iv, key);
console.log(plainText); // An obscure body in the


// 非对称加密

// 又称公钥加密，使用前需要生成一对公私密钥对，用公钥加密的消息，只能用私钥解密。
// 它解决了密钥配送的问题，通常会配合对称加密一起使用，常用的如RSA。我们依旧可以通过crypto.subtle.encrypt()和decrypt()方法实现

// const result = crypto.subtle.encrypt(algorithm, publicKey, data);
//
// const result = crypto.subtle.decrypt(algorithm, privateKey, data);


const text = "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function encryptMessage(message, publicKey){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return await crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        data
    );
}

async function decryptMessage(cipherText, privateKey){
    const result = await crypto.subtle.decrypt(
        {
            name: "RSA-OAEP"
        },
        privateKey,
        cipherText
    );
    const decoder = new TextDecoder();
    return decoder.decode(result);
}

async function generateKeyPair() {
    return await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048, //密钥长度，可以是1024, 2048, 4096，建议2048以上
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 公共指数e，一般用65537
            hash: "SHA-256", //可以是"SHA-1", "SHA-256", "SHA-384", "SHA-512"
        },
        true,
        ["encrypt", "decrypt"]
    );
}

const keyPair = await generateKeyPair();
const cipherText = await encryptMessage(text, keyPair.publicKey);
const plainText = await decryptMessage(cipherText, keyPair.privateKey);
console.log(plainText); // An obscure body in the S-K System, your majesty.


//数字签名

// const signature = crypto.subtle.sign(algorithm, privateKey, data);
//
// const result = crypto.subtle.verify(algorithm, publicKey, signature, data);

const text = "An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.";

async function signMessage(message, privateKey){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return await crypto.subtle.sign(
        {
            name: "RSA-PSS",
            saltLength: 32,
        },
        privateKey,
        data
    );
}

async function verifyMessage(message, signature, publicKey){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return await crypto.subtle.verify(
        {
            name: "RSA-PSS",
            saltLength: 32,
        },
        publicKey,
        signature,
        data
    );
}

async function generateKeyPair() {
    return await crypto.subtle.generateKey(
        {
            name: "RSA-PSS",
            modulusLength: 2048, //密钥长度，可以是1024, 2048, 4096，建议2048以上
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 公共指数e，一般用65537
            hash: "SHA-256", //可以是"SHA-1", "SHA-256", "SHA-384", "SHA-512"
        },
        true,
        ["sign", "verify"]
    );
}

const keyPair = await generateKeyPair();
const signature = await signMessage(text, keyPair.privateKey);
const result = await verifyMessage(text, signature, keyPair.publicKey);
console.log(result); // true
