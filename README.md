# Prime Finder Challenge
```
//////    //////   /////   ////////   /////      /////  /////  /////    /////   /////   /////    
//   //   //   //   //    //  //  //  //         //      //    //  //   //  //  //      //  //
//   //   //   //   //    //  //  //  //         //      //    //  //   //   /  //      //  //
/////     /////     //    //      //  /////      /////   //    //  //   //   /  /////   /////
//        // //     //    //      //  //         //      //    //  //   //   /  //      // //
//        //  //    //    //      //  //         //      //    //  //   //   /  //      //  //
//        //   //  /////  //      //  /////      //     /////  //  //   /////   /////   //   //

        ,-.
        / \  `.  __..-,O
       :   \ --''_..-'.'
       |    . .-' `. '.
       :     .     .`.'
        \     `.  /  ..
         \      `.   ' .
          `,       `.   \
         ,|,`.        `-.\
        '.||  ``-...__..-`
         |  |
         |__|
         /||\
        //||\\
       // || \\
    __//__||__\\__
   '--------------'
                              

```

**Table of Contents**  
1. [Overview](#overview)  
2. [How to Build](#how-to-build)  
3. [How to Run Tests](#how-to-run-tests)  
4. [Design Choices & Rationale](#design-choices--rationale)  
5. [Future Enhancements](#future-enhancements)

---

## Overview

This project implements an API to retrieve the *n-th prime number* using **0-based indexing** (where the 0th prime is 2). The code **does not** rely on the Sieve of Eratosthenes; instead, it uses a **trial-division** approach, complete with **6k ± 1** optimizations and a small bootstrap of primes. The result is a codebase that’s more **readable** and **modular** than a single large sieve, while still being able to handle moderately large prime queries.

Additionally, there is a **fun ASCII art** feature in the test output showing whether your tests have passed or failed.

---

## How to Build

1. **Clone** or **download** the repository:
   `git clone <your-fork-url>.git`
   `cd <your-repository-folder>`

2.	Install Dependencies
    `npm install`
  

## How to Run Tests

1. `npm run test`

## Design Choices & Rationale

### Non-Eratosthenes Method
- The instructions allowed for alternative prime-finding algorithms.
- I chose a trial-division approach using:
- A 6k ± 1 technique to skip multiples of 2 and 3.
- A small “bootstrap” prime list to speed up checks for larger primes.
- This approach is more memory-friendly than a naive sieve for large ranges, while keeping the code straightforward.

### Modular, Readable Code
-	Functions are kept small and descriptive (isPrimeWithSmallPrimes, getPrimeForSmallIndex, etc.).
-	Loops avoid endless while(true) or for(...; true; ...) when possible, in favor of clearer loop conditions.
-	I like to write code similar to how we write in real life and avoid nesting as much as possible. I learned this from some ruby writing style I read years ago but for the life of me I cannot find it.
    
Example

  ```js
  const isJoshARightFit = superComplexFunction(knowledge, openness, charm, passion);
  if (!isJoshARightFit) return;

  sendJoshOffer();
  sendJoshLaptop();
  sendJoshCoolHoodieAndStickers();
  handleStartDate();
  // ...more logic 
  ```

### Trade-Offs
-	Performance: Pure trial division is slower for very large values of n, compared to advanced methods like the segmented sieve.
-	Ease of Understanding: This code is simpler to follow than typical sieving. I am not a mathematician but I can understand this.

### Future Enhancements
- My first enhancement would be to utilize Typescript. I would have if the instructions did not already specify javascript as an option to use.
- Performance: We would need to implement a better performant algorithm (most likely Eratosthenes's algorithm) in order to handle larger number. The true challenge there IMO is to make it readable. As readability is one of the most important components of writing good code.
- It would be nice to see how long each test case took to complete and also a graph which includes them all.

### Notes
- Radar Asci art borrowed from https://ascii.co.uk/art/radar
- A combination of research of Eratosthenes's algorithm and similar algorithm's and assistance with ai to create the math logic. I restructured much of it to make it readable and easy to update.