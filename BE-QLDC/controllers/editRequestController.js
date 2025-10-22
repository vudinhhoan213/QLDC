const editRequestService = require('../services/editRequestService');

module.exports = {
  async create(req, res, next) {
    try {
      const payload = { ...req.body, requestedBy: req.user && req.user._id };
      const doc = await editRequestService.create(payload);
      res.status(201).json(doc);
    } catch (err) { next(err); }
  },
  async getAll(req, res, next) {
    try {
      const { page, limit, sort, ...filter } = req.query;
      const data = await editRequestService.getAll(filter, { page: Number(page) || 1, limit: Number(limit) || 50, sort });
      res.json(data);
    } catch (err) { next(err); }
  },
  async getById(req, res, next) {
    try {
      const doc = await editRequestService.getById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) { next(err); }
  },
  async update(req, res, next) {
    try {
      const doc = await editRequestService.update(req.params.id, req.body);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json(doc);
    } catch (err) { next(err); }
  },
  async delete(req, res, next) {
    try {
      const doc = await editRequestService.delete(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
  },

  // Example with role check: only Tổ trưởng can approve
  async approve(req, res, next) {
    try {
      if (!req.user || req.user.role !== 'TO_TRUONG') {
        return res.status(403).json({ message: 'Forbidden: requires TO_TRUONG role' });
      }
      const result = await editRequestService.approveEditRequest({ id: req.params.id, reviewerUserId: req.user._id });
      res.json(result);
    } catch (err) { next(err); }
  },

  async reject(req, res, next) {
    try {
      if (!req.user || req.user.role !== 'TO_TRUONG') {
        return res.status(403).json({ message: 'Forbidden: requires TO_TRUONG role' });
      }
      const { reason } = req.body;
      const result = await editRequestService.rejectEditRequest({ id: req.params.id, reviewerUserId: req.user._id, rejectionReason: reason });
      res.json(result);
    } catch (err) { next(err); }
  },
};

