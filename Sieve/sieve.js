/**
 * Retrieves small primes quickly.
 * Uses an array lookup instead of multiple `if` statements.
 */
function getPrimeForSmallIndex(zeroBasedIndex) {
  if (zeroBasedIndex < 0) throw new Error("Index cannot be negative.");
  const predefinedPrimes = [2, 3, 5, 7]; 
  return predefinedPrimes[zeroBasedIndex] ?? null;
}

/**
 * Generates small primes up to 50,000 using trial division.
 */
function generateSmallPrimesUpTo50000() {
  const smallPrimes = [2, 3];

  for (let sixStepIndex = 1; 6 * sixStepIndex + 1 <= 50000; sixStepIndex++) {
    const candidateA = 6 * sixStepIndex - 1;
    const candidateB = 6 * sixStepIndex + 1;

    [candidateA, candidateB].forEach(candidate => {
      if (isNumberPrime(candidate, smallPrimes)) 
        smallPrimes.push(candidate);
    });
  }

  return smallPrimes;
}

/**
 * Searches for the (zeroBasedIndex+1)-th prime using a 6k±1 stepping,
 * trial-dividing only by the given smallPrimes.
 * 
 * @param {number[]} smallPrimes - An array of small primes used for trial division.
 * @param {number} zeroBasedIndex - The prime index we want (0-based).
 * @param {number} currentPrimeCount - How many primes we've already counted so far.
 * @param {function} isNumberPrime - A helper to check primality against smallPrimes.
 * @returns {number} - The actual prime at position zeroBasedIndex (0-based).
 */
function findPrimeUsingSixStepLoop(smallPrimes, zeroBasedIndex, currentPrimeCount, isNumberPrime) {

  console.log({ smallPrimes, zeroBasedIndex, currentPrimeCount, isNumberPrime, smallPrimesCount: smallPrimes.length });
  
  for (let sixStepIndex = 1; currentPrimeCount < zeroBasedIndex + 1; sixStepIndex++) {
    const candidateA = 6 * sixStepIndex - 1;
    const isCandidateAWithSmallPrimes = isNumberPrime(candidateA, smallPrimes);

    if (isCandidateAWithSmallPrimes) {
      currentPrimeCount++;
      if (currentPrimeCount === zeroBasedIndex + 1) 
        return candidateA;
    }

    const candidateB = 6 * sixStepIndex + 1;
    const isCandidateBWithSmallPrimes = isNumberPrime(candidateB, smallPrimes);

    if (isCandidateBWithSmallPrimes) {
      currentPrimeCount++;
      if (currentPrimeCount === zeroBasedIndex + 1) 
        return candidateB;
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
function findNthPrime(zeroBasedIndex) {
  const smallIndexResult = getPrimeForSmallIndex(zeroBasedIndex);
  if (smallIndexResult !== null) return smallIndexResult; 
  
  const smallPrimes = generateSmallPrimesUpTo50000();

  let primeCountSoFar = 2; // we've already counted [2, 3].

  if (zeroBasedIndex === 2) return 5; // 2nd prime
  if (zeroBasedIndex === 3) return 7; // 3rd prime

  const nthPrime = findPrimeUsingSixStepLoop(smallPrimes, zeroBasedIndex, primeCountSoFar, isNumberPrime);

  return nthPrime;
}

module.exports = {
  NthPrime: findNthPrime,
};