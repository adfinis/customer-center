import Service, { inject as service } from "@ember/service";

export default class TimedService extends Service {
  @service store;

  //  ____                _
  // |  _ \ ___  __ _  __| |
  // | |_) / _ \/ _` |/ _` |
  // |  _ <  __/ (_| | (_| |
  // |_| \_\___|\__,_|\__,_|
  //

  async getAllProjects() {
    return await this.store.findAll("timed-subscription-project", {
      include: "billing_type,customer,orders",
      ordering: "name",
    });
  }

  async getDashboardProjects() {
    const projects = await this.store.findAll("timed-subscription-project");

    return projects
      .toArray()
      .sort((a, b) => {
        return a.totalTime - b.totalTime;
      })
      .slice(0, 2);
  }

  async getOwnProjects() {
    return await this.store.query("timed-subscription-project", {
      ordering: "name",
    });
  }

  async getUnconfirmedOrders() {
    return await this.store.query("timed-subscription-order", {
      include: "project,project.customer",
      ordering: "-ordered",
      acknowledged: 0,
    });
  }

  async getProjectDetails(project) {
    return await this.store.findRecord("timed-subscription-project", project, {
      include: "billing_type,customer",
    });
  }

  async getProjectReports(project, page = 1) {
    return await this.store.query("timed-report", {
      project,
      include: "user",
      ordering: "-date",
      page: {
        number: page,
        size: 20,
      },
    });
  }

  async getProjectOrders(project) {
    return await this.store.query("timed-subscription-order", {
      ordering: "-ordered",
      project,
    });
  }

  async getReloadPackages(billing_type) {
    const packages = await this.store.findAll("timed-subscription-package", {
      billing_type,
    });

    const REGEX_PRICE = /^Fr\./;

    packages.forEach((item) => {
      let price = item.get("price");

      if (REGEX_PRICE.test(price)) {
        const price_string = price.replace("Fr.", "").replace(",", "");
        price = parseFloat(price_string);
      }

      item.set("price", price);
    });

    return packages;
  }

  // __        __    _ _
  // \ \      / / __(_) |_ ___
  //  \ \ /\ / / '__| | __/ _ \
  //   \ V  V /| |  | | ||  __/
  //    \_/\_/ |_|  |_|\__\___|
  //

  async placeSubscriptionOrder(project, duration) {
    const order = this.store.createRecord("timed-subscription-order", {
      duration,
      project,
    });

    await order.save();

    return order;
  }

  async acceptSubscriptionOrder(order) {
    order.set("acknowledged", true);
    await order.confirm();
    order.unloadRecord();
  }

  async denySubscriptionOrder(order) {
    await order.destroyRecord();
  }
}
