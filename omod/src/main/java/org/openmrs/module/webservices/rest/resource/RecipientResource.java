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
import org.openmrs.module.openhmis.inventory.api.IRecipientDataService;
import org.openmrs.module.openhmis.inventory.api.model.Recipient;
import org.openmrs.module.openhmis.inventory.web.ModuleRestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;

@Resource(name = ModuleRestConstants.RECIPIENT_RESOURCE, supportedClass=Recipient.class, supportedOpenmrsVersions={"1.9"})
@Handler(supports = { Recipient.class }, order = 0)
public class RecipientResource extends BaseRestMetadataResource<Recipient> {

    @Override
    public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
        DelegatingResourceDescription description = super.getRepresentationDescription(rep);
        description.addProperty("description", Representation.REF);

        return description;
    }

    @Override
    public Recipient newDelegate() {
        return new Recipient();
    }

    @Override
    public Class<? extends IMetadataDataService<Recipient>> getServiceClass() {
        return IRecipientDataService.class;
    }

}
