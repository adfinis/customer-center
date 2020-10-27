import Service, { inject as service } from "@ember/service";

export default class TimedService extends Service {
  @service store;

  async getAllProjects() {
    return await this.store.query("subscription-project", {
      include: "billing_type,customer,orders",
      ordering: "name",
    });
  }

  async getDashboardProjects() {
    const projects = await this.store.findAll("subscription-project");

    return projects
      .toArray()
      .sort((a, b) => a.totalTime - b.totalTime)
      .slice(0, 4);
  }

  async getOwnProjects() {
    return await this.store.query("subscription-project", {
      ordering: "name",
    });
  }

  async getUnconfirmedOrders() {
    return await this.store.query("subscription-order", {
      include: "project,project.customer",
      ordering: "-ordered",
      acknowledged: 0,
    });
  }

  async getProjectDetails(project) {
    return await this.store.findRecord("subscription-project", project, {
      include: "billing_type,customer",
    });
  }

  async getProjectReports(project, page = 1) {
    return await this.store.query("report", {
      project,
      include: "user",
      ordering: "-date",
      page: {
        number: page,
        size: 5,
      },
    });
  }

  async getProjectOrders(project, page = 1) {
    return await this.store.query("subscription-order", {
      ordering: "-ordered",
      project,
      page: {
        number: page,
        size: 5,
      },
    });
  }

  async getReloadPackages(billing_type) {
    const packages = await this.store.findAll("subscription-package", {
      billing_type,
    });

    const REGEX_PRICE = /^Fr\./;

    packages.forEach((item) => {
      let { price } = item;

      if (REGEX_PRICE.test(price)) {
        const price_string = price.replace("Fr.", "").replace(",", "");
        price = parseFloat(price_string);
      }

      item.set("price", price);
    });

    return packages;
  }

  async placeSubscriptionOrder(project, duration) {
    const order = this.store.createRecord("subscription-order", {
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
