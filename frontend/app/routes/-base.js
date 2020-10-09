import Route from "@ember/routing/route";

const classList = document.documentElement.classList;

export default class BaseRoute extends Route {
  setupController(controller, model, transition) {
    if (transition) {
      const page = transition.to.name.replace(".", "-");
      classList.add(`page-${page}`);
    }

    if (typeof controller.setup === "function") {
      controller.setup(model, transition);
    } else {
      super.setupController(...arguments);
    }
  }

  resetController(controller, isExiting, transition) {
    if (transition) {
      const page = transition.from.name.replace(".", "-");
      classList.remove(`page-${page}`);
    } else {
      // If we cannot know which page to remove we remove them all.
      Array.from(classList.values())
        .filter((className) => className.startsWith("page-"))
        .forEach((className) => classList.remove(className));
    }

    if (typeof controller.reset === "function") {
      controller.reset(isExiting, transition);
    } else {
      super.resetController(...arguments);
    }
  }
}
