/**
 * Retrieves small primes quickly.
 * Uses an array lookup instead of multiple `if` statements.
 */
function getPrimeForSmallIndex(primeIndex) {
  if (primeIndex < 0) throw new Error("Index cannot be negative.");
  const predefinedPrimes = [2, 3, 5, 7]; 
  return predefinedPrimes[primeIndex] ?? null;
}

/**
 * Generates small primes up to 50,000 using trial division.
 */
function generateSmallPrimesUpTo50000() {
  const smallPrimes = [2, 3];

  for (let index = 1; 6 * index + 1 <= 50000; index++) {
    const candidateA = 6 * index - 1;
    const candidateB = 6 * index + 1;

    [candidateA, candidateB].forEach(candidate => {
      if (isNumberPrime(candidate, smallPrimes)) 
        smallPrimes.push(candidate);
    });
  }

  return smallPrimes;
}

/**
 * Finds the n-th prime using a 6k ± 1 stepping approach.
 * 
 * @param {number[]} smallPrimes - An array of small primes used for trial division.
 * @param {number} primeIndex - The prime index we want (0-based).
 * @param {number} currentPrimeCount - How many primes we've already counted so far.
 * @returns {number} - The actual prime at position primeIndex (0-based).
 */
function findPrimeUsingSixStepLoop(smallPrimes, primeIndex, currentPrimeCount) {
  for (let index = 1; currentPrimeCount <= primeIndex; index++) {
    const candidateA = 6 * index - 1;
    const candidateB = 6 * index + 1;

    for (const candidate of [candidateA, candidateB]) {
      if (isNumberPrime(candidate, smallPrimes)) {
        currentPrimeCount++;
        if (currentPrimeCount === primeIndex + 1) return candidate;
      }
    }
  }
}

/**
 * Checks if a number is prime using trial division.
 */
function isNumberPrime(candidate, primeList) {
  if (candidate < 2) return false;
  const sqrtCandidate = Math.sqrt(candidate);

  for (const prime of primeList) {
    if (prime > sqrtCandidate) break;
    if (candidate % prime === 0) return false;
  }

  return true;
}

/**
 * Returns the n-th prime (0-based) using a combination of:
 *   1) Small primes up to 50,000 for quick divisibility checks (no Sieve used).
 *   2) A 6k±1 approach to skip multiples of 2 and 3.
 *   3) Trial division by only those small primes.
 *
 * Example usage:
 *   NthPrime(0) => 2
 *   NthPrime(1) => 3
 *   ...
 *   // NthPrime(100000000) => 2038074751 (theoretically, but extremely slow in JS).
 */
function findNthPrime(primeIndex) {
  const smallIndexResult = getPrimeForSmallIndex(primeIndex);
  if (smallIndexResult !== null) return smallIndexResult; 
  
  const smallPrimes = generateSmallPrimesUpTo50000();
  let currentPrimeCount = 2; // we've already counted [2, 3].

  return findPrimeUsingSixStepLoop(smallPrimes, primeIndex, currentPrimeCount);
}

module.exports = {
  NthPrime: findNthPrime,
};