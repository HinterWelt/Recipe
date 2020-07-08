import http from "../http-common";

class RvDataService {
  getAll() {
    return http.get("/rv");
  }

  get(id) {
    return http.get(`/rv/${id}`);
  }

  create(data) {
    return http.post("/rv", data);
  }

  update(id, data) {
    return http.put(`/rv/${id}`, data);
  }

  delete(id) {
    return http.delete(`/rv/${id}`);
  }

  deleteAll() {
    return http.delete(`/rv`);
  }

  findByTitle(title) {
    return http.get(`/rv/name/?Name=${title}`);
  }
}

export default new RvDataService();