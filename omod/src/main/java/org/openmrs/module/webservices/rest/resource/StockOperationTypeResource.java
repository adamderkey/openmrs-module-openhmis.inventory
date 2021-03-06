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

import org.openmrs.module.openhmis.commons.api.entity.IMetadataDataService;
import org.openmrs.module.openhmis.inventory.api.IStockOperationTypeDataService;
import org.openmrs.module.openhmis.inventory.api.model.StockOperationTypeBase;
import org.openmrs.module.openhmis.inventory.web.ModuleRestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.RefRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;

@Resource(name = ModuleRestConstants.OPERATION_TYPE_RESOURCE, supportedClass=StockOperationTypeBase.class, supportedOpenmrsVersions={"1.9"})
public class StockOperationTypeResource extends BaseRestMetadataResource<StockOperationTypeBase> {
	@Override
	public StockOperationTypeBase newDelegate() {
		return null;
	}

	@Override
	public Class<? extends IMetadataDataService<StockOperationTypeBase>> getServiceClass() {
		return IStockOperationTypeDataService.class;
	}

	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
		DelegatingResourceDescription description = super.getRepresentationDescription(rep);

		if (!(rep instanceof RefRepresentation)) {
			description.addProperty("hasSource", Representation.DEFAULT);
			description.addProperty("hasDestination", Representation.DEFAULT);
			description.addProperty("hasPatient", Representation.DEFAULT);
			description.addProperty("patientRequired", Representation.DEFAULT);
			description.addProperty("availableWhenReserved", Representation.DEFAULT);
			description.addProperty("user", Representation.DEFAULT);
			description.addProperty("role", Representation.DEFAULT);
			description.addProperty("attributeTypes", Representation.REF);
		}

		return description;
	}
}
