package com.ams.interfaces.web.spring_mvc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ams.application.common.ServiceException;
import com.ams.application.service.apartmentservicemanagerservice.ManageService;
import com.ams.application.service.apartmentservicemanagerservice.ManageServicePlan;
import com.ams.domain.model.service.Service;
import com.ams.domain.model.service.ServicePlan;
import com.ams.domain.repository.Page;

@Controller
public class ServiceController
{
	@Autowired
	private ManageService		manageService;

	@Autowired
	private ManageServicePlan	manageServicePlan;

	@RequestMapping("serviceplans")
	@ResponseBody
	public List<ServicePlan> getServicePlanList()
	{
		List<ServicePlan> srvcPlanList = manageServicePlan.getAllServicePlans();
		System.out.println("ServicePlan List size : " + srvcPlanList);
		return srvcPlanList;
	}

	@RequestMapping("services")
	@ResponseBody
	public List<Service> getServiceList()
	{
		List<Service> srvcList = manageService.getAllServices();
		System.out.println("srvcList size : " + srvcList);
		return srvcList;
	}

	@RequestMapping("service/{srvcCode}")
	@ResponseBody
	public Service getServiceDetail(@PathVariable String srvcCode)
	{
		return manageService.getService(srvcCode);

	}

	@RequestMapping(value = "services/page/{index}&{offset}",method = RequestMethod.GET)
	@ResponseBody
	public Page<Service> getServiceListNextPage(@PathVariable final int index, @PathVariable final int offset)
	{
		return (this.manageService.getServicesNextPage(index, offset));

	}

	@RequestMapping(value = "service",method = RequestMethod.POST)
	@ResponseBody
	public List<Service> saveService(@RequestBody final Service service) throws ServiceException
	{
		try
		{
			System.out.println(service.getSrvcCode());
			manageService.registerService(service);
			return this.getServiceList();
		} catch (Exception e)
		{
			throw new ServiceException(e.toString());
		}

	}

	@RequestMapping(value = "service",method = RequestMethod.PUT)
	@ResponseBody
	public List<Service> updateServiceDetail(@RequestBody final Service service)
	{
		System.out.println(service.getSrvcCode());
		manageService.updateServiceDetails(service);
		return this.getServiceList();

	}

	@RequestMapping(value = "service/{srvcCode}",method = RequestMethod.DELETE)
	@ResponseBody
	public List<Service> deleteService(@PathVariable final String srvcCode)
	{
		System.out.println(srvcCode);
		manageService.deleteService(srvcCode);
		return this.getServiceList();

	}

}
