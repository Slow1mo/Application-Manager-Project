import BaseHttpService from "./base-http.service";
import queryString from "query-string";

export default class ApplicationsService extends BaseHttpService {
  fetchApplications({ status, search }) {
    const queryObj = {};

    if (status.length) {
      queryObj.status = status;
    }

    if (search.length) {
      queryObj.search = search;
    }

    const queryStr = queryString.stringify(queryObj);
    return this.get("applications" + (queryStr ? `?${queryStr}` : ""));
  }

  async deleteApplication(id) {
    await this.delete(`applications/${id}`);
  }

  updateApplicationStatus(id, status) {
    return this.patch(`applications/${id}/status`, { status });
  }

  createApplication(title, description, status) {
    return this.post(`applications`, { title, description, status });
  }
}
