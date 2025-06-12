import { describe, expect, it } from "bun:test";
import { unusedLetters } from ".";

describe("unused letters", () => {
  it("should return the unused letters", () => {
    expect(unusedLetters("A slow yellow fox crawls under the proactive dog")).toBe("bjkmqz");
    expect(unusedLetters("A quick brown fox jumps over the lazy dog")).toBe("");
  });
}); 