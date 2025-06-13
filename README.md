# Interview Question Solutions (Realwork Prep)

This repository contains solutions to various programming interview questions, implemented in TypeScript and tested using Bun.

## Problems Solved

This project currently includes solutions for the following problems:

### 1. Unused Alphabet Letters (`src/unusedLetters.ts`)

**Problem Description:** Given an input string, identify and return all letters of the English alphabet that are *not* present in that string. For example, "A slow yellow fox crawls under the proactive dog" should return "bjkmqz".

**Solution (`src/unusedLetters.ts`):**

- The `unusedLetters(str: string): string` function provides this functionality. It iterates through the alphabet and checks for the presence of each letter in the (case-insensitive) input string.
- An alternative, `unusedLettersAlt1(str: string): string`, uses a `Set` for potentially more efficient lookup of used letters.

### 2. Particle Animation (`src/animate.ts`)

**Problem Description:** Simulate the movement of particles in a 1D chamber. Particles are represented by 'L' (moving left) or 'R' (moving right) in an initial string (e.g., `"..R....L.."`). Given an initial state and a speed, produce a series of snapshots showing the chamber state ('X' for particles, '.' for empty) at each time unit until all particles have exited.

**Solution (`animate.ts`):**

- The `animate(initialPosition: string, speed: number): string[]` function implements this simulation.
- It parses initial particle positions and directions.
- It calculates particle positions at each discrete time step.
- It determines the maximum time required for all particles to exit.
- It returns an array of strings, each representing the chamber's state at a time unit.

I have a separate branch that uses a `Particle` interface instead of a `Map` that I also considered.
That one might be a bit cleaner and functions more like a physics simulator. The given solution feels
a little more efficient.

## Technologies Used

- [Bun](https://bun.sh)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/docs/installation) installed on your system.

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd realwork-prep
```

2. Install dependencies:

```bash
bun install
```

## Running Tests

The primary way to verify the solutions is by running the associated tests. This project uses Bun's built-in test runner.

To execute all tests:

```bash
bun test
```

**Note:** I've been preferring co-located tests these days vs a separate `__test__` folder. In this case it just made sense.

This will run test files (e.g., `*.test.ts`) located in the `src` directory or as configured in your project.
