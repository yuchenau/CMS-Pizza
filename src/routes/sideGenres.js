const express = require('express');
const router = express.Router();
const {
    getAllSideGenres,
    addSideGenre,
    updateSideGenre,
    deleteSideGenre,
    addSide,
    deleteSide
} = require('../controllers/sideGenres');

router.get('/', getAllSideGenres);
router.post('/', addSideGenre);
router.put('/:id', updateSideGenre);
router.delete('/:id', deleteSideGenre);
router.post('/:id/side/:sideId', addSide);
router.delete('/:id/side/:sideId', deleteSide);

module.exports = router;