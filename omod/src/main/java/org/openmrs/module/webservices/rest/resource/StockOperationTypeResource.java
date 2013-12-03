/*
 * The contents of this file are subject to the OpenMRS Public License
 * Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
package org.openmrs.module.webservices.rest.resource;

import org.openmrs.annotation.Handler;
import org.openmrs.module.openhmis.commons.api.entity.IMetadataDataService;
import org.openmrs.module.openhmis.inventory.api.IStockOperationTypeDataService;
import org.openmrs.module.openhmis.inventory.api.model.IStockOperationType;
import org.openmrs.module.openhmis.inventory.web.ModuleRestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;

@Resource(name = ModuleRestConstants.OPERATION_TYPE_RESOURCE, supportedClass=IStockOperationType.class, supportedOpenmrsVersions={"1.9"})
@Handler(supports = { IStockOperationType.class }, order = 0)
public class StockOperationTypeResource extends BaseRestMetadataResource<IStockOperationType> {
	@Override
	public IStockOperationType newDelegate() {
		return null;
	}

	@Override
	public Class<? extends IMetadataDataService<IStockOperationType>> getServiceClass() {
		return IStockOperationTypeDataService.class;
	}

	@Override
	protected DelegatingResourceDescription getDefaultRepresentationDescription() {
		DelegatingResourceDescription description =  super.getDefaultRepresentationDescription();

		// TODO: Update for Stock Opertion Type fields
		description.addProperty("quantityType", Representation.DEFAULT);
		description.addProperty("sourceRequired", Representation.DEFAULT);
		description.addProperty("destinationRequired", Representation.DEFAULT);
		description.addProperty("authorized", Representation.DEFAULT);

		return description;
	}

	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
		DelegatingResourceDescription description = super.getRepresentationDescription(rep);

		if (rep instanceof FullRepresentation) {
			description.addProperty("attributeTypes", Representation.REF);
		}

		return description;
	}
}