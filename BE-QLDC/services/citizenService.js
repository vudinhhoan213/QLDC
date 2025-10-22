const { Citizen } = require("../models");

module.exports = {
  async create(data) {
    return Citizen.create(data);
  },
  async getAll(filter = {}, options = {}) {
    const { limit = 50, page = 1, sort = "-createdAt" } = options;
    const docs = await Citizen.find(filter)
      .populate("household")
      .populate("user")
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Citizen.countDocuments(filter);
    return { docs, total, page, limit };
  },
  async getById(id) {
    return Citizen.findById(id).populate("household").populate("user");
  },
  async update(id, data) {
    return Citizen.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id) {
    return Citizen.findByIdAndDelete(id);
  },
  async getStats() {
    const total = await Citizen.countDocuments();
    return { total };
  },
};
