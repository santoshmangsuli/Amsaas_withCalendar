package com.ams.interfaces.web.spring_mvc.controller;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ams.application.common.ServiceException;
import com.ams.application.service.billingandpaymentservice.ManageBill;
import com.ams.application.service.billingandpaymentservice.servicedata.BillDTO;
import com.ams.domain.model.bill.Bill;
import com.ams.domain.model.bill.Payment;

@Controller
public class BillManagerController
{
	@Autowired
	private ManageBill	billingService;

	private BillDTO	billSrvcData	= new BillDTO();

	public BillDTO getBillSrvcData()
	{
		return billSrvcData;
	}

	public void setBillSrvcData(BillDTO billSrvcData)
	{
		this.billSrvcData = billSrvcData;
	}

	@RequestMapping(value = "addBillItems",method = RequestMethod.PUT)
	@ResponseBody
	public String addBillItems(@RequestBody final BillDTO billSrvcData)
	{
		try
		{
			System.out.println(billSrvcData.getCustomerId());
			System.out.println(billSrvcData.getBillDate());
			billingService.addBillItems(billSrvcData);

		} catch (Exception e)
		{
			e.printStackTrace();
		}

		return "success";
	}

	@RequestMapping(value = "Bill",method = RequestMethod.POST)
	@ResponseBody
	public String submitBill(@RequestBody final BillDTO billDTO)
	{
		try
		{
			System.out.println(" BillDueDate " + billDTO.getCustomerId());
			billingService.createNewBill(billDTO);

		} catch (Exception e)
		{
			e.printStackTrace();
		}

		return "success";
	}

	@RequestMapping("BillDetails")
	@ResponseBody
	public List<Bill> getBillDetails() throws ServiceException
	{

		return billingService.getUnpaidBills();

	}

	@RequestMapping(value = "/Payment",method = RequestMethod.POST)
	@ResponseBody
	public String payBill(@RequestBody final Payment pymnt)
	{
		System.out.println("calling payBill");
		billingService.payBill(pymnt);
		return "SUCCESS";
	}

	
	@RequestMapping("Payments")
	@ResponseBody
	public List<Payment> getPayments() throws ServiceException
	{
		System.out.println("calling Payments");
		List<Payment> payList = billingService.getPaymentsbyDateRange();
		System.out.println("Payments Size "+payList.size());
		return payList;

	}


}
