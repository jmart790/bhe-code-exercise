function getPrimeForSmallIndex(zeroBasedIndex) {
  if (zeroBasedIndex < 0) throw new Error("Index cannot be negative.");
  if (zeroBasedIndex === 0) return 2;
  if (zeroBasedIndex === 1) return 3;
  return null;
}

/**
 * Generates all primes up to 50k using a mini 6k±1 trial-division approach.
 * This is still not a Sieve of Eratosthenes, just skipping multiples of 2 and 3.
 * 
 * We do this once to bootstrap set of primes to test large candidates quickly.
 */
function generateSmallPrimesUpTo50000() {
  const smallPrimes = [2, 3];

  for (let sixStepIndex = 1; 6 * sixStepIndex + 1 <= 50000; sixStepIndex++) {
    const candidateA = 6 * sixStepIndex - 1;
    const isCandidateAPrime = isPrimeCandidateBasic(candidateA, smallPrimes);
    if (isCandidateAPrime) smallPrimes.push(candidateA);
    
    const candidateB = 6 * sixStepIndex + 1;
    const isCandidateBPrime = isPrimeCandidateBasic(candidateB, smallPrimes);
    if (isCandidateBPrime) smallPrimes.push(candidateB);
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
 * @param {function} isPrimeWithSmallPrimes - A helper to check primality against smallPrimes.
 * @returns {number} - The actual prime at position zeroBasedIndex (0-based).
 */
function findPrimeUsingSixStepLoop(smallPrimes, zeroBasedIndex, currentPrimeCount, isPrimeWithSmallPrimes) {
  
  for (let sixStepIndex = 1; currentPrimeCount < zeroBasedIndex + 1; sixStepIndex++) {
    const candidateA = 6 * sixStepIndex - 1;
    const isCandidateAWithSmallPrimes = isPrimeWithSmallPrimes(candidateA, smallPrimes);

    if (isCandidateAWithSmallPrimes) {
      currentPrimeCount++;
      if (currentPrimeCount === zeroBasedIndex + 1) 
        return candidateA;
    }

    const candidateB = 6 * sixStepIndex + 1;
    const isCandidateBWithSmallPrimes = isPrimeWithSmallPrimes(candidateB, smallPrimes);

    if (isCandidateBWithSmallPrimes) {
      currentPrimeCount++;
      if (currentPrimeCount === zeroBasedIndex + 1) 
        return candidateB;
    }
  }
}

/**
 * Checks if 'candidateNumber' is prime by only dividing
 * by the small prime list (up to 50k) we generated.
 *
 * If none of those primes (<= sqrt(candidateNumber)) divides 'candidateNumber',
 * it is prime.
 */
function isPrimeWithSmallPrimes(candidateNumber, smallPrimes) {
  if (candidateNumber < 2) return false;
  const sqrtCandidate = Math.sqrt(candidateNumber);

  for (const prime of smallPrimes) {
    if (prime > sqrtCandidate) break;
    if (candidateNumber % prime === 0) {
      return false; 
    }
  }

  return true;
}

/**
 * A "basic" trial division check for generating the small prime list itself.
 */
function isPrimeCandidateBasic(candidateNumber, knownSmallPrimes) {
  const sqrtCandidate = Math.sqrt(candidateNumber);

  for (const prime of knownSmallPrimes) {
    if (prime > sqrtCandidate) break;
    if (candidateNumber % prime === 0) {
      return false;
    }
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

  const nthPrime = findPrimeUsingSixStepLoop(smallPrimes, zeroBasedIndex, primeCountSoFar, isPrimeWithSmallPrimes);

  return nthPrime;
}

module.exports = {
  NthPrime: findNthPrime,
};