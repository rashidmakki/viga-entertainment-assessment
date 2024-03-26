const PricingModel = require('../model/pricing');
const itemService = require('../service/item.service');

const createPricing = async (pricingData) => {
  try {
    const pricing = await PricingModel.create(pricingData);
    return pricing;
  } catch (error) {
    throw new Error('Error creating pricing: ' + error.message);
  }
};

const getAllPricings = async () => {
  try {
    const pricings = await PricingModel.findAll();
    return pricings;
  } catch (error) {
    throw new Error('Error fetching pricings: ' + error.message);
  }
};

const getPricingById = async (pricingId) => {
  try {
    const pricing = await PricingModel.findByPk(pricingId);
    if (!pricing) {
      throw new Error('Pricing not found');
    }
    return pricing;
  } catch (error) {
    throw new Error('Error fetching pricing by ID: ' + error.message);
  }
};

const findPricingByCondition = async(condiition)=> {
  try {
    const pricing = await PricingModel.findOne({
      where:condiition
    });
    if (!pricing) {
      throw new Error('Pricing not found');
    }
    return pricing;
  } catch (error) {
    throw new Error('Error fetching pricing by Condition');
  }
}

const updatePricing = async (pricingId, pricingData) => {
  try {
    const pricing = await PricingModel.findByPk(pricingId);
    if (!pricing) {
      throw new Error('Pricing not found');
    }
    await pricing.update(pricingData);
    return pricing;
  } catch (error) {
    throw new Error('Error updating pricing: ' + error.message);
  }
};

const deletePricing = async (pricingId) => {
  try {
    const pricing = await PricingModel.findByPk(pricingId);
    if (!pricing) {
      throw new Error('Pricing not found');
    }
    await pricing.destroy();
  } catch (error) {
    throw new Error('Error deleting pricing: ' + error.message);
  }
};

const calculatePrice = async (req) => {
  try {
    const { organization_id, zone, total_distance, item_type } = req.body;
    
    // Retrieve item information from the database based on item type
    const item = await itemService.findItemByCondition({ type: item_type});
    
    // Retrieve pricing information from the database
    const pricing = await findPricingByCondition({ organization_id, zone, item_id:item.id});

    if (!pricing) {
      return res.status(404).json({ error: 'Pricing information not found' });
    }

    // Calculate total price
    let totalPrice = pricing.fix_price; // Base price

    if (total_distance > pricing.base_distance_in_km) {
      const additionalDistance = total_distance - pricing.base_distance_in_km;
      totalPrice += additionalDistance * pricing.km_price;
    }

    return totalPrice;

  } catch (error) {
    console.error('Error calculating price:', error);
  }
};


module.exports = {
  createPricing,
  getAllPricings,
  getPricingById,
  updatePricing,
  deletePricing,
  findPricingByCondition,
  calculatePrice
};
