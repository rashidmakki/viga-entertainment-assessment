const OrganizationModel = require('../model/organization');

const createOrganization = async (name) => {
  try {
    const organization = await OrganizationModel.create(name);
    return organization;
  } catch (error) {
    throw new Error('Error creating organization : '+ error.message);
  }
};

const getAllOrganizations = async () => {
  try {
    const organizations = await OrganizationModel.findAll();
    return organizations;
  } catch (error) {
    throw new Error('Error fetching organizations');
  }
};

const getOrganizationById = async (id) => {
  try {
    const organization = await OrganizationModel.findByPk(id);
    if (!organization) {
      throw new Error('Organization not found');
    }
    return organization;
  } catch (error) {
    throw new Error('Error fetching organization by ID');
  }
};


const updateOrganization = async (id, newName) => {
  try {
    const organization = await OrganizationModel.findByPk(id);
    if (!organization) {
      throw new Error('Organization not found');
    }
    organization.name = newName;
    await organization.save();
    return organization;
  } catch (error) {
    throw new Error('Error updating organization');
  }
};

const deleteOrganization = async (id) => {
  try {
    const organization = await OrganizationModel.findByPk(id);
    if (!organization) {
      throw new Error('Organization not found');
    }
    await organization.destroy();
  } catch (error) {
    throw new Error('Error deleting organization');
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};
