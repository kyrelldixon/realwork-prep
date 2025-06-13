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

  let positions: string[] = []

  // 1. parse the initial string to get the initial position, speed, and direction.
  // we can just do velocity and use positive & negative for direction
  // I have to loop through the string once to get all the positions for sure.
  const particleMap = parseInitialPosition(initialPosition, speed)

  // 2. calculate the next position in the string
  // this could just be velocity * time. that would make it easier to calculate
  // the positions for any time period and allows time traveling
  // do we create new particles each time we update or no? i feel this makes things easier at the
  // cost of space complexity, but I'm fine with that for v1

  let time = 0
  // We could let it run infinitely since it will always break as long as speed >= 1
  // but this feels safer and basically does the same thing.
  const maxRuns = initialPosition.length
  while (time <= maxRuns) {
    const newParticles = updateParticles(particleMap, maxRuns, time)
    // if all the particles are dots, we're done
    positions.push(newParticles)
    time++

    if (newParticles.match(/^\.+$/)) {
      break
    }
  }

  // 3. create a new string with updated positions and add to the array

  // When do we stop?
  // when the position of all particles is > the size of the initial string
  // or the position of all particles is < 0 (the beginning)
  return positions
}

function parseInitialPosition(initialPosition: string, speed: number): ParticleMap {
  const particleMap = new Map<InitialPosition, Velocity>()

  // iterate through all the spots and convert them to particles
  for (let i = 0; i < initialPosition.length; i++) {
    const possibleParticle = initialPosition[i] as string
    if (possibleParticle === '.') {
      continue
    } else if (possibleParticle === 'R') {
      particleMap.set(i + 1, speed)
    } else if (possibleParticle === 'L') {
      particleMap.set(i + 1, -speed)
    } else {
      throw new Error('Invalid particle type')
    }
  }

  return particleMap
}

function updateParticles(particleMap: ParticleMap, initialLength: number, time: number): string {
  let particles = Array.from({ length: initialLength }, () => '.')

  for (const [initialPosition, velocity] of particleMap) {
    const newPosition = initialPosition + velocity * time

    if (newPosition > initialLength || newPosition < 0) {
      continue
    } else {
      // Subtract to get back to 0-indexed
      particles[newPosition - 1] = 'X'
    }
  }

  return particles.join('')
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
 */