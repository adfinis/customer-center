import { action } from "@ember/object";
import { cancel, next } from "@ember/runloop";
import Component from "@glimmer/component";

const COLORS = [
  "#ff0000",
  "#FC3800",
  "#F96E00",
  "#F6A400",
  "#F3D800",
  "#D5F000",
  "#9EED00",
  "#68EA00",
  "#33E700",
  "#00E500",
];

export default class StatusBatteryComponent extends Component {
  timer = null;

  get isEmpty() {
    return this.args.percentage < 0.1;
  }

  @action onInsertBody(element) {
    this.timer = next(() => {
      element.style.height = `${100 * this.args.percentage}%`;
      element.style.backgroundColor =
        this.args.percentage > 0.1
          ? COLORS[Math.round(this.args.percentage * 10) - 1]
          : COLORS[0];
    });
  }

  @action onDestroyBody(element) {
    cancel(this.timer);
  }
}
