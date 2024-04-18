import { service } from ".";

export default {
  getAllProjects: () => service.get("/project/all"),
  getCreditionals: (data) => service.post("/project/phone", data),
  getRegionsByProvinceId: (data) => service.post("/project/regions", data),
  getDistrictsByRegionId: (data) => service.post("/project/district", data),
  createOrder: (data) =>
    service.post("/order", data, {
      Headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
