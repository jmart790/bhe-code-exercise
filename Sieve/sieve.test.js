const Sieve = require("./sieve");
const { asciiStart, asciiSuccess, asciiFailure } = require("../SuperSecretFolder/asciiArt");

let testFailed = false;

describe("Sieve", () => {
  beforeAll(() => {
    console.log(asciiStart());
  });

  afterAll(() => {
    if (testFailed) {
      console.log(asciiFailure());
    } else {
      console.log(asciiSuccess());
    }
  });

  test("valid results", () => {
    try {
      expect(Sieve.NthPrime(0)).toBe(2);
      expect(Sieve.NthPrime(19)).toBe(71);
      expect(Sieve.NthPrime(99)).toBe(541);
      expect(Sieve.NthPrime(500)).toBe(3581);
      expect(Sieve.NthPrime(986)).toBe(7793);
      expect(Sieve.NthPrime(2000)).toBe(17393);
      expect(Sieve.NthPrime(1000000)).toBe(15485867);
      expect(Sieve.NthPrime(10000000)).toBe(179424691);
      // expect(Sieve.NthPrime(100000000)).toBe(2038074751); // Uncomment if you want to wait an hour :)

      // Small indices
      expect(Sieve.NthPrime(1)).toBe(3);   // 1st prime
      expect(Sieve.NthPrime(2)).toBe(5);   // 2nd prime
      expect(Sieve.NthPrime(3)).toBe(7);   // 3rd prime
      expect(Sieve.NthPrime(4)).toBe(11);  // 4th prime
      
      // Some random checks
      expect(Sieve.NthPrime(10)).toBe(31); // 10th prime
      expect(Sieve.NthPrime(24)).toBe(97); // 25th prime
      
      // Negative checks.
      expect(() => Sieve.NthPrime(-1)).toThrow("Index cannot be negative.");
      expect(() => Sieve.NthPrime(-5)).toThrow("Index cannot be negative.");

    } catch (error) {
      testFailed = true;
      throw error; // Rethrow so Jest sees the test as failed
    }
  });
});