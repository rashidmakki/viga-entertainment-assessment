const organizationService = require('../service/organization.service');

// Create Organization
const createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const organization = await organizationService.createOrganization({ name });
    return res.json(organization);
  } catch (error) {
    console.error('Error creating organization:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await organizationService.getAllOrganizations();
    return res.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Organization by ID
const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await organizationService.getOrganizationById(id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    return res.json(organization);
  } catch (error) {
    console.error('Error fetching organization by ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Organization
const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const organization = await organizationService.updateOrganization(id, { name });
    return res.json(organization);
  } catch (error) {
    console.error('Error updating organization:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Organization
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    await organizationService.deleteOrganization(id);
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting organization:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization
}
