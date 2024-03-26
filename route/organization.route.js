const express = require('express');
const organizationRouter = express.Router();
const { createOrganization, getAllOrganizations, getOrganizationById, updateOrganization, deleteOrganization } = require('../controller/organization.controller');

organizationRouter.route('/').post(createOrganization).get(getAllOrganizations)
organizationRouter.route('/:id').get(getOrganizationById).put(updateOrganization).delete(deleteOrganization)

module.exports = organizationRouter;
