/**
 * 1-indexed for calculation
 */
type InitialPosition = number
/**
 * A positive or negative for speed with direction
 */
type Velocity = number
type ParticleMap = Map<InitialPosition, Velocity>

export function animate(initialPosition: string, speed: number): string[] {
  if (speed <= 0) {
    throw new Error('Speed should be a positive number')
  }

  const particles = parseInitialPosition(initialPosition, speed);
  const chamberLength = initialPosition.length;
  const result: string[] = [];

  // Calculate maximum time needed for all particles to exit
  const maxTime = calculateMaxExitTime(particles, chamberLength, speed);

  for (let time = 0; time <= maxTime; time++) {
    const currentState = generateStateAtTime(particles, chamberLength, time);
    result.push(currentState);

    // Early exit if chamber is empty
    if (currentState.match(/^\.+$/)) {
      break
    }
  }

  return result;
}

function parseInitialPosition(initialPosition: string, speed: number): ParticleMap {
  const particleMap = new Map<InitialPosition, Velocity>()

  // iterate through all the spots and convert them to particles
  for (let i = 0; i < initialPosition.length; i++) {
    const possibleParticle = initialPosition[i] as string
    if (possibleParticle === '.') {
      continue
    } else if (possibleParticle === 'R') {
      particleMap.set(i + 1, speed) // 1-indexed position, positive velocity
    } else if (possibleParticle === 'L') {
      particleMap.set(i + 1, -speed) // 1-indexed position, negative velocity
    } else {
      throw new Error('Invalid particle type')
    }
  }

  return particleMap
}

function calculateMaxExitTime(particles: ParticleMap, chamberLength: number, speed: number): number {
  if (particles.size === 0) return 0;

  // Worst case: particle at far end moving slowly
  // For right-moving: starts at position 1, needs chamberLength steps to exit
  // For left-moving: starts at position chamberLength, needs chamberLength steps to exit
  return Math.ceil(chamberLength / speed) + 1;
}

function generateStateAtTime(particles: ParticleMap, chamberLength: number, time: number): string {
  const positions = Array(chamberLength).fill('.');

  for (const [initialPosition, velocity] of particles) {
    const currentPosition = initialPosition + velocity * time;

    // Check if particle is still within chamber bounds
    if (currentPosition >= 1 && currentPosition <= chamberLength) {
      positions[currentPosition - 1] = 'X'; // Convert to 0-indexed for array access
    }
  }

  return positions.join('');
}

/**
 * My thoughts:
 * 
 * This feels like it could be recursive. The initial position + speed give me everything I need to calculate the next
 * position. so I could use a stop condition. the only problem is this wouldn't give me an array. I'd need a 3rd param for that
 * 
 * Simple solutions is to just have a result array and then keep pushing to that.
 * 
 * How do I want to store the data? str -> obj -> str?
 * 
 * Feels like it could prob be string in and string out...but a Map helps me think easier. I can refactor later
 * 
 * I have my particle type & parsing down, so next easiest is displaying it
 * 
 * Started off with a while loop which is cool, but I realized there is a clear stopping point with the
 * other solution. Going to bring that back over here
 */