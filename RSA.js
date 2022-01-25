const { areCoprimes, modularExponentiation, getPairOfPrimes } = require("./utils");


const getRSAKeyPair = () => {
    const [p,q] = getPairOfPrimes();
    const N = p * q;
    const pN = (p-1)*(q-1);
    const publicKey = getPublicKey(N,pN);
    const privateKey = getPrivateKey(publicKey, pN);

    return [publicKey, privateKey, N];
}


const getPublicKey = (N,pN) => {
    let publicKeyCandidates = []
    for(let i=2; i<pN; i++){
        if(areCoprimes(i,pN) && areCoprimes(i,N) && i%2 !== 0)
            publicKeyCandidates.push(i);
    }
    const randomIndex = Math.floor( Math.random()*publicKeyCandidates.length );
    return publicKeyCandidates[randomIndex];
}


const getPrivateKey = (publicKey,pN) => {
    let [a,b] = [publicKey, pN];

    if (a < b) [a,b] = [b, a];
    let s = 0, old_s = 1;
    let t = 1, old_t = 0;
    let r = b, old_r = a;
    while (r != 0) {
        let q = Math.floor(old_r/r);
        [r, old_r] = [old_r - q*r, r];
        [s, old_s] = [old_s - q*s, s];
        [t, old_t] = [old_t - q*t, t];
    }
    return old_t > 0? old_t : pN + old_t;
}


const encryptRSA = (msg, key, N) => {
    // encryptedMsg = msg ^ key  %  N 
    let encryptedMsg = "";
    for(let character of msg)
        encryptedMsg += String.fromCharCode( modularExponentiation(character.charCodeAt(), key, N) );
    return encryptedMsg;
}


const decryptRSA = (encryptedMsg, key, N) => {
    // decryptedMsg = encryptedMsg ^ key  %  N 
    let decryptedMsg = "";
    for(let character of encryptedMsg){
        decryptedMsg += String.fromCharCode( modularExponentiation(character.charCodeAt(), key, N) );
    }
    return decryptedMsg;
}




module.exports = {
    getRSAKeyPair,
    encryptRSA,
    decryptRSA,
}
