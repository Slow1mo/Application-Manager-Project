import { observable, action } from "mobx";

export default class ApplicationsStore {
  @observable applications = [];
  @observable filters = { status: "", search: "" };

  constructor(applicationsService) {
    this.applicationsService = applicationsService;
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchApplications();
  }

  @action
  resetApplications() {
    this.applications = [];
  }

  @action
  async fetchApplications() {
    const result = await this.applicationsService.fetchApplications(
      this.filters
    );

    if (result) {
      this.applications = result.data;
    }
  }

  @action
  async createApplication(title, description, status) {
    const result = await this.applicationsService.createApplication(
      title,
      description,
      status
    );

    if (result) {
      console.log(result);
      this.applications.push(result.data);
    }
  }

  @action
  async deleteApplication(id) {
    const idx = this.applications.findIndex(
      (application) => application.id === id
    );
    await this.applicationsService.deleteApplication(id);
    this.applications.splice(idx, 1);
  }

  @action
  async updateApplicationStatus(id, status) {
    const application = this.applications.find(
      (application) => application.id === id
    );
    await this.applicationsService.updateApplicationStatus(id, status);
    application.status = status;
  }
}
