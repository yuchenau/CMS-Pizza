const express = require('express');
const router = express.Router();
const {
    getAllDrinkGenres,
    addDrinkGenre,
    updateDrinkGenre,
    deleteDrinkGenre,
    addDrink,
    deleteDrink
} = require('../controllers/drinkGenres');

router.get('/', getAllDrinkGenres);
router.post('/', addDrinkGenre);
router.put('/:id', updateDrinkGenre);
router.delete('/:id', deleteDrinkGenre);
router.post('/:id/drink/:drinkId', addDrink);
router.delete('/:id/drink/:drinkId', deleteDrink);

module.exports = router;