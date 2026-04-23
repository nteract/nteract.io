import { describe, expect, it } from "vitest";

import {
  EMISSION_GATES,
  FIELDS,
  NEVER_SENT,
  OPT_OUT_PATHS,
  RETENTION,
} from "@/lib/telemetry-data";

describe("telemetry-data", () => {
  it("lists the six heartbeat fields", () => {
    expect(FIELDS).toHaveLength(6);
    expect(FIELDS.map((f) => f.name).sort()).toEqual(
      ["arch", "channel", "install_id", "platform", "source", "version"].sort(),
    );
  });

  it("describes what is never sent", () => {
    expect(NEVER_SENT.length).toBeGreaterThan(0);
    expect(NEVER_SENT.join(" ").toLowerCase()).toContain("ip address");
  });

  it("lists emission gates including the new consent gate", () => {
    const names = EMISSION_GATES.map((g) => g.name);
    expect(names).toContain("Consent not recorded");
    expect(names).toContain("Dev mode");
    expect(names).toContain("Throttled");
  });

  it("declares retention periods", () => {
    expect(RETENTION.rawPingDays).toBe(400);
    expect(RETENTION.aggregatesKept).toMatch(/indefinit/i);
  });

  it("lists three in-app opt-out paths plus an env-var escape hatch", () => {
    expect(OPT_OUT_PATHS.inApp).toHaveLength(3);
    expect(OPT_OUT_PATHS.envVar).toMatch(/NTERACT_TELEMETRY_DISABLE/);
  });
});
