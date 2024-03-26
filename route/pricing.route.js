const express = require('express');
const router = express.Router();
const {createPricing, getAllPricings, getPricingById, updatePricing, deletePricing, calculatePrice} = require('../controller/pricing.controller');

router.route('/').post(createPricing).get(getAllPricings)
router.route('/calculatePrice').post(calculatePrice)
router.route('/:id').get(getPricingById).put(updatePricing).delete(deletePricing)

module.exports = router;
