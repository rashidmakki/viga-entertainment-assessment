const pricingService = require('../service/pricing.service');

// Create Pricing
const createPricing = async (req, res) => {
  try {
    const pricingData = req.body;
    const newPricing = await pricingService.createPricing(pricingData);
    return res.json(newPricing);
  } catch (error) {
    console.error('Error creating pricing:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Pricings
const getAllPricings = async (req, res) => {
  try {
    const pricings = await pricingService.getAllPricings();
    return res.json(pricings);
  } catch (error) {
    console.error('Error fetching pricings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Pricing by ID
const getPricingById = async (req, res) => {
  try {
    const { id } = req.params;
    const pricing = await pricingService.getPricingById(id);
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }
    return res.json(pricing);
  } catch (error) {
    console.error('Error fetching pricing by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Pricing
const updatePricing = async (req, res) => {
  try {
    const { id } = req.params;
    const pricingData = req.body;

    const updatedPricing = await pricingService.updatePricing(id, pricingData);
    return res.json(updatedPricing);
  } catch (error) {
    console.error('Error updating pricing:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Pricing
const deletePricing = async (req, res) => {
  try {
    const { id } = req.params;
    await pricingService.deletePricing(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting pricing:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//calculate Price
const calculatePrice = async (req, res) => {
  try {
    const totalCalculatedPrice = await pricingService.calculatePrice(req);
    return res.json({ total_price: totalCalculatedPrice });
  } catch (error) {
    console.error('Error calculating price:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createPricing,
  getAllPricings,
  getPricingById,
  updatePricing,
  deletePricing,
  calculatePrice
}
