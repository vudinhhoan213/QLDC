const express = require('express');
const { editRequestController } = require('../controllers');
const { authenticate, isLeader, isCitizen } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, isLeader, editRequestController.getAll);
router.get('/:id', authenticate, editRequestController.getById);
router.post('/', authenticate, isCitizen, editRequestController.create);
router.patch('/:id', authenticate, isLeader, editRequestController.update);
router.delete('/:id', authenticate, isLeader, editRequestController.delete);

// Special actions
router.post('/:id/approve', authenticate, isLeader, editRequestController.approve);
router.post('/:id/reject', authenticate, isLeader, editRequestController.reject);

module.exports = router;

