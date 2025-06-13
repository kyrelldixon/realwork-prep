import { describe, expect, it } from "bun:test";
import { animate } from "./animate";

describe("animate", () => {
  it("should animate", () => {
    expect(animate("..R....", 2)).toEqual(["..X....", "....X..", "......X", "......."]);
    expect(animate("R....", 1)).toEqual(["X....", ".X...", "..X..", "...X.", "....X", "....."])
    expect(animate("......L", 2)).toEqual(["......X", "....X..", "..X....", "X......", "......."]);
    expect(animate("RR..LRL", 3)).toEqual(["XX..XXX", ".X.XX..", "X.....X", "......."]);
    expect(animate("LRLR.LRLR", 2)).toEqual(["XXXX.XXXX", "X..X.X..X", ".X.X.X.X.", ".X.....X.", "........."]);
    expect(animate("RLRLRLRLRL", 10)).toEqual(["XXXXXXXXXX", ".........."]);
  });
}); 