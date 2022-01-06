// 3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97
// ,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179
// ,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269
// ,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367
// ,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461
// ,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571
// ,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661
// ,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773
// ,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883
// ,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997

const primes = [101,103,107,109,113,127,131,137,139,149,151,157,163,
    167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257]


const getPairOfPrimes = () => {
    let p1 = primes[ Math.floor( Math.random()*primes.length) ];
    let p2 = primes[ Math.floor( Math.random()*primes.length) ];

    while(p1 === p2)
        p2 = primes[Math.floor( Math.random()*primes.length )];

    return [p1,p2];
}


const areCoprimes = (numA, numB) => {
    return gcd(numA, numB) === 1;
}


const modularExponentiation = (msgCode,publicKey,N) => {
    // msgCode^publickKey % N    //  ^ means power, not xor
    let c = 1;

    for(let i=1; i<=publicKey; i++)
        c = msgCode*c % N;
    return c;
}



const gcd = (a,b) => {
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
    // console.log("Bezout coef: ", old_s, old_t);
    // console.log("GCD: ", old_r);
    // console.log("Quot by GCD: ", s, t);
    return old_r;
}



module.exports = {
    getPairOfPrimes,
    areCoprimes,
    modularExponentiation,
    gcd,
}
