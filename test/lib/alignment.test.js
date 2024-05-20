import * as chrt from "chrt";
import chrtLabel from "~/chrtLabel";

const defaultOffset = [() => 0, () => 0];

describe("Testing alignment", () => {
  const mockElement = document.createElement("div");
  const chart = chrt.Chrt().node(mockElement);

  it("Default alignment", () => {
    const chartLabel = new chrtLabel("test");
    expect(chartLabel.align()()).toEqual("start");
    expect(chartLabel.valign()()).toEqual("text-after-edge");
  });

  it("Setting alignment", () => {
    const chartLabel = new chrtLabel("test");

    chartLabel.align("end");
    chartLabel.valign("bottom");

    expect(chartLabel.align()()).toEqual("end");
    expect(chartLabel.valign()()).toEqual("bottom");
  });

  it("Verify dominant-baseline", () => {
    const chartLabel = new chrtLabel("test");
    chartLabel.anchor({
      x: 340,
      width: 5,
      y: 91.11111111111111,
      height: 5,
      relativePosition: [0, -1],
      directions: {
        x: 1,
        y: 1,
      },
      alignment: {
        horizontal: () => "middle",
        vertical: () => "top",
      },
    });
    chart.add(chartLabel);
    expect(
      chartLabel.g.querySelector("text").getAttribute("text-anchor"),
    ).toEqual("middle");
    expect(
      chartLabel.g.querySelector("text").getAttribute("dominant-baseline"),
    ).toEqual("text-after-edge");
  });
});
