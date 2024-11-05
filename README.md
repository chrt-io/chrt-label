# chrt-label

Component for creating and managing labels in chrt charts. Labels can be added automatically to chart elements (using `chrtLabels`) or manually positioned at specific coordinates (using `chrtLabel`). The module provides two main components:

- `chrtLabels`: Automatically generates and positions labels for multiple data points
- `chrtLabel`: Creates individual labels with specific positioning

### Observable Examples and Documentation:

- [Introducing Chrt - Observable](https://observablehq.com/@chrt/introducing-chrt?collection=@chrt/chrt)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-label` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-label chrt-core
```

`chrt-label` can be used as part of the `chrt` package:

```bash
npm install chrt
```

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

```js
import Chrt from "chrt-core";
import { chrtLabel, chrtLabels } from "chrt-label";

// Add automatic labels to points
Chrt().add(
  chrt
    .chrtPoints()
    .data(data)
    .add(chrtLabels().value((d) => d.value)),
);

// Add a single manual label
Chrt().add(chrt.columns().add(chrtLabel("United States").left("1970").top(14)));
```

## API Reference

### chrtLabels

#### Creation and Data

#### `chrtLabels()`

Creates a new labels component that automatically generates labels for chart elements.

```js
// Basic labels
chrtLabels().value((d) => d.value);

// Filtered labels
chrtLabels()
  .filter((d) => d.value > 100)
  .value((d) => d.value);
```

#### `.value([accessor])`

Sets the text content for labels using a data accessor function.

```js
// Use simple value
chrtLabels().value((d) => d.value);

// Format value
chrtLabels().value((d) => `$${d.value.toFixed(2)}`);
```

#### Positioning and Alignment

#### `.align([value])` / `.valign([value])`

Sets horizontal and vertical alignment of labels.

```js
chrtLabels()
  .align("start") // "start", "middle", "end"
  .valign("middle"); // "top", "middle", "bottom"
```

#### `.offset([x, y])`

Sets the offset of labels from their anchor points.

```js
// Fixed offset
chrtLabels().offset(5, 0);

// Dynamic offset
chrtLabels().offset((d, i) => [i * 2, 0]);
```

#### Filtering Methods

#### `.filter([condition])` / `.show([condition])`

Controls which labels are displayed.

```js
// Show labels for specific values
chrtLabels().filter((d) => d.value > 100);

// Show labels based on index
chrtLabels().filter((d, i) => i % 2 === 0);
```

#### `.firstLabel()` / `.lastLabel()`

Shows only first or last label.

```js
// Show only first label
chrtLabels().firstLabel();

// Show only last label
chrtLabels().lastLabel();
```

#### Styling

#### `.color([value])` / `.fill([value])`

Sets the color of labels.

```js
// Single color
chrtLabels().color("#333333");

// Color based on data
chrtLabels().color((d) => (d.value > 100 ? "red" : "blue"));
```

### chrtLabel

#### Creation and Text

#### `chrtLabel(text)`

Creates a single label with specified text.

```js
// Create label with text
chrtLabel("United States").left("1970").top(14);
```

#### `.value(text)` / `.text(text)`

Sets or updates the label text.

```js
chrtLabel().value("Label Text").color("#333");
```

#### Positioning

#### `.position([x, y])` / `.left(value)` / `.top(value)`

Sets the position of the label.

```js
// Using position
chrtLabel("Text").position({ x: 100, y: 50 });

// Using left/top
chrtLabel("Text").left("1970").top(14);
```

#### Styling and Alignment

#### `.align([value])` / `.valign([value])`

Sets text alignment.

```js
chrtLabel("Text")
  .align("start") // "start", "middle", "end"
  .valign("middle"); // "top", "middle", "bottom"
```

#### `.color([value])` / `.fill([value])`

Sets the color of the label.

```js
chrtLabel("Text").color("#ffffff").align("start");
```

### Examples

#### Automatic Labels on Points

```js
Chrt().add(
  chrt
    .dotPlot()
    .data(data)
    .add(
      chrtLabels()
        .filter((d) => d.category === "A")
        .value((d) => d.value.toFixed(1))
        .offset(5, 0)
        .align("start")
        .valign("middle")
        .color("#999"),
    ),
);
```

#### Mixed Manual and Automatic Labels

```js
Chrt().add(
  chrt
    .columns()
    .data(data)
    .add(
      chrtLabels()
        .value((d) => d.value)
        .offset(0, -5),
    )
    .add(
      chrtLabel("Maximum")
        .left(maxX)
        .top(maxY)
        .align("middle")
        .valign("bottom"),
    ),
);
```
