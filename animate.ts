interface Particle {
  initialPos: number; // 1-indexed position
  velocity: number;   // positive for right, negative for left
}

function parseParticles(initialPosition: string, speed: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < initialPosition.length; i++) {
    const char = initialPosition[i];
    if (char === 'R') {
      particles.push({ initialPos: i + 1, velocity: speed });
    } else if (char === 'L') {
      particles.push({ initialPos: i + 1, velocity: -speed });
    }
  }
  return particles;
}

function calculateExitTime(particle: Particle, chamberLength: number): number {
  if (particle.velocity > 0) {
    // Moving right: exits when position > chamberLength
    // position = initialPos + velocity * t > chamberLength
    // t > (chamberLength - initialPos) / velocity
    return Math.floor((chamberLength - particle.initialPos) / particle.velocity) + 1;
  } else {
    // Moving left: exits when position < 1  
    // position = initialPos + velocity * t < 1
    // t > (initialPos - 1) / abs(velocity)
    return Math.floor((particle.initialPos - 1) / Math.abs(particle.velocity)) + 1;
  }
}

function generateStateAtTime(particles: Particle[], time: number, chamberLength: number): string {
  const positions = new Array(chamberLength).fill('.');

  for (const particle of particles) {
    const currentPos = particle.initialPos + particle.velocity * time;
    // Check if particle is still in bounds (1-indexed positions)
    if (currentPos >= 1 && currentPos <= chamberLength) {
      positions[currentPos - 1] = 'X'; // Convert to 0-indexed for array
    }
  }

  return positions.join('');
}

export function animate(initialPosition: string, speed: number): string[] {
  if (speed <= 0) {
    throw new Error('Speed must be positive');
  }

  const particles = parseParticles(initialPosition, speed);
  const chamberLength = initialPosition.length;

  // Calculate when the last particle will have exited
  const maxExitTime = particles.length > 0
    ? Math.max(...particles.map(p => calculateExitTime(p, chamberLength)))
    : 0;

  // Generate all states from time 0 to maxExitTime (inclusive)
  const result: string[] = [];
  for (let time = 0; time <= maxExitTime; time++) {
    result.push(generateStateAtTime(particles, time, chamberLength));
  }

  return result;
}