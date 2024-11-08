import chrtObject, { utils, cssDisplay } from "chrt-object";
const { isNull } = utils;
import chrtLabel from "./chrtLabel";
import {
  align,
  valign,
  filterLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  offset,
  color,
  relativePosition,
  alignment,
} from "./lib";
import { DEFAULT_FILL_COLOR } from "./constants";

function chrtLabels() {
  chrtObject.call(this);
  // console.log("HI WE ARE LABELS", this);
  this.type = "labels";
  this.labels = [];
  // this.g = null;
  this.labelsFilter = () => true;
  this._alignment = null;
  this.attr("fill", DEFAULT_FILL_COLOR);

  this._offsets = [() => 0, () => 0];

  this.value = (field) => {
    return this.attr("textField", field);
  };

  // this.position = (position) => {
  //   return this.attr('position', position);
  // }

  this.draw = () => {
    const parentData = this.parentNode.data();
    const data = parentData.length
      ? parentData
      : this.parentNode.parentNode._data || [];

    const isBars = ~this.parentNode?.class().indexOf("chrt-bars");
    const isColumns = ~this.parentNode?.class().indexOf("chrt-columns");

    // remove old labels
    if (this.labels?.length) {
      const dataLabelsDelta = this.labels.length - data.length;
      if (dataLabelsDelta > 0) {
        Array.from(
          { length: dataLabelsDelta },
          (_, i) => i + data.length,
        ).forEach((d) => {
          this.labels[d]?.node().remove();
          this.labels[d] = null;
        });
        this.labels = this.labels.filter((d) => d);
      }
    }
    data.forEach((label, i) => {
      if (this.labelsFilter && !this.labelsFilter(label, i, data)) {
        return;
      }
      // const offsets = {
      //   top: () => 0,
      //   left: () => 0,
      // };

      if (!this.labels[i]) {
        this.labels[i] = chrtLabel();
        // console.log('adding label',i,'with value',textField,'to',this.parentNode)
        this.parentNode.add(this.labels[i]);
      }

      // console.log('now we I have', this.labels.length, 'labels')

      const textFieldAccessor = this.attr("textField")(label, i, this.labels);
      const textField = !isNull(textFieldAccessor)
        ? textFieldAccessor
        : label[this.parentNode.fields.y];

      const classNames = this.class();
      if (classNames.length) {
        this.labels[i].class(classNames.join(" "));
      }
      // console.log("ANCHORPOINTS", label.anchorPoints);
      this.labels[i].value(textField).datum(label);
      this.labels[i]
        .anchor(
          label.anchorPoints
            ? Object.assign({}, label.anchorPoints, {
                alignment: label.anchorPoints?.alignment
                  ? {
                      horizontal: () =>
                        label.anchorPoints?.alignment?.horizontal ?? "middle",
                      vertical: () =>
                        label.anchorPoints?.alignment?.vertical ?? "top",
                    }
                  : null,
                relativePosition:
                  this._rposition || label.anchorPoints.relativePosition,
              })
            : null,
        )
        .offset(
          this._offsets[1](label, i, this.labels) ?? 0, // + offsets.left(),
          this._offsets[0](label, i, this.labels) ?? 0, // + offsets.top(),
        )
        .color(this.color()(label, i, this.labels));

      if (this._alignment) {
        this.labels[i]
          .align(this._alignment?.horizontal || "middle")
          .valign(this._alignment?.vertical || "top");
      }

      this.labels[i].attr(this.attr("display")(label, i, data));
      // console.log("this._alignment", this._alignment);
      this.labels[i].draw();
    });

    return this;
  };
}

chrtLabels.prototype = Object.create(chrtObject.prototype);
chrtLabels.prototype.constructor = chrtLabels;
chrtLabels.parent = chrtObject.prototype;

chrtLabels.prototype = Object.assign(chrtLabels.prototype, {
  align,
  valign,
  relativePosition,
  filter: filterLabels,
  show: filterLabels,
  hide: hideLabels,
  filterLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  offset,
  offsets: offset,
  color,
  fill: color,
});

export default function () {
  return new chrtLabels();
}
