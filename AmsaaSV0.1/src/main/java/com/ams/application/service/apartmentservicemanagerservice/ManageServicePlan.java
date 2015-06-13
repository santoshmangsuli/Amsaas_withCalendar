package com.ams.application.service.apartmentservicemanagerservice;

import java.util.Date;
import java.util.List;

import com.ams.application.service.apartmentservicemanagerservice.servicedata.ServicePlanDTO;
import com.ams.domain.model.service.InvalidServiceRatePlanException;
import com.ams.domain.model.service.ServicePlan;

public interface ManageServicePlan
{
	String registerServicePlan(String srvcPlanName);

	String registerServicePlan(ServicePlan servicePlan);

	String updateServicePlanDetails(String srvcPlanName, Date srvcPlanCreationDate);

	String updateServicePlanDetails(ServicePlan servicePlan);

	void removeServicePlan(String srvcPlanName);

	List<ServicePlan> getAllServicePlans();

	ServicePlan getServicePlanDetails(String srvcPlanName);

	void addServiceRateComponent(ServicePlanDTO spd);

	void updateServiceRateComponentDetails(ServicePlanDTO spd);

	void removeServiceRateComponent(String srvcPlanName, String srvcCode) throws InvalidServiceRatePlanException;

}
