const { Household } = require('../models');

module.exports = {
  async create(data) {
    return Household.create(data);
  },
  async getAll(filter = {}, options = {}) {
    const { limit = 50, page = 1, sort = '-createdAt' } = options;
    const docs = await Household.find(filter)
      .populate('head')
      .populate('members')
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await Household.countDocuments(filter);
    return { docs, total, page, limit };
  },
  async getById(id) {
    return Household.findById(id).populate('head').populate('members');
  },
  async update(id, data) {
    return Household.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id) {
    return Household.findByIdAndDelete(id);
  },
};

