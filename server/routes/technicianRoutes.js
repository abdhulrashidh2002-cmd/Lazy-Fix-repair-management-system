const express = require('express');
const router = express.Router();

const {
    createTechnician,
    getTechnicians,
getTechnicianById,}
    =require("../controllers/technicianController");

router.post('/create', createTechnician);
router.get('/all', getTechnicians);
router.get('/:id', getTechnicianById);

module.exports = router;