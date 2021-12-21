import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import { hash } from "rsvp";

export default class IndexRoute extends Route {
  @service timed;

  model() {
    return hash({
      projects: this.timed.getDashboardProjects(),
      support: {
        phone: "+41 61 500 31 30",
        email: "support@adfinis.com",
      },
      locations: [
        {
          title: "Basel",
          phone: "+41 61 500 31 31",
          address: {
            title: "Adfinis AG",
            streetAddress: "Güterstrasse 86",
            postalCode: "4053",
            locality: "Basel",
            country: "CH",
          },
        },
        {
          title: "Bern",
          phone: "+41 31 550 31 11",
          address: {
            title: "Adfinis AG",
            streetAddress: "Giessereiweg 5",
            postalCode: "3007",
            locality: "Bern",
            country: "CH",
          },
        },
        {
          title: "Zürich",
          phone: "+41 43 500 38 90",
          address: {
            title: "Adfinis AG",
            streetAddress: "Stampfenbachstrasse 40",
            postalCode: "8006",
            locality: "Zürich",
            country: "CH",
          },
        },
        {
          title: "Crissier",
          phone: "+41 31 550 31 11",
          address: {
            title: "Adfinis AG",
            streetAddress: "Rue de la Vernie 12",
            postalCode: "1032",
            locality: "Crissier",
            country: "CH",
          },
        },
        {
          title: "Netherlands",
          phone: "+316 249 98 260",
          address: {
            title: "Adfinis NV",
            streetAddress: "Hortensiastraat 10",
            postalCode: "7555CS",
            locality: "Hengelo",
            country: "NL",
          },
        },
        {
          title: "Australia",
          phone: "+61 7 3118 1742",
          address: {
            title: "Adfinis IT Australia Pty Ltd",
            streetAddress: "Building 6, 2404 Logan Road",
            postalCode: "4113",
            locality: "Eight Mile Plains",
            country: "AU",
          },
        },
      ],
      profiles: [
        {
          title: "LinkedIn",
          address: "https://www.linkedin.com/company/adfinis-com",
          icon: "linkedin",
        },
        {
          title: "Twitter",
          address: "https://twitter.com/adfinis",
          icon: "twitter",
        },
        {
          title: "GitHub",
          address: "https://github.com/adfinis-sygroup",
          icon: "github",
        },
      ],
    });
  }
}
