import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ExoplanetChart } from "./exoplanet-chart";

afterEach(cleanup);

it("retains all notebook measurements and combines method, period, and name filters", () => {
  render(<ExoplanetChart />);
  expect(screen.getByRole("status")).toHaveTextContent("5,927 of 5,927");
  fireEvent.change(screen.getByLabelText("Discovery method"), { target: { value: "Imaging" } });
  expect(screen.getByRole("status")).toHaveTextContent("22 of 5,927");
  fireEvent.change(screen.getByLabelText("Find a planet"), { target: { value: "HR 8799" } });
  expect(screen.getByRole("status")).toHaveTextContent("3 of 5,927");
  expect(screen.getByRole("list", { name: "Matching planets" })).toHaveTextContent("HR 8799 b");
  fireEvent.change(screen.getByLabelText("Planetary year"), { target: { value: "1" } });
  expect(screen.getByRole("status")).toHaveTextContent("0 of 5,927");
  fireEvent.click(screen.getByRole("button", { name: "Reset view" }));
  expect(screen.getByRole("status")).toHaveTextContent("5,927 of 5,927");
  expect(screen.getByLabelText("Find a planet")).toHaveValue("");
});
