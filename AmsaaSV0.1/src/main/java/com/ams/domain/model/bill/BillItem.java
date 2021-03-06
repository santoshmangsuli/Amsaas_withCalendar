package com.ams.domain.model.bill;

import static javax.persistence.AccessType.PROPERTY;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Access;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.ams.domain.model.service.Service;

@Entity
@Access(PROPERTY)
@Table(name = "T_BILLITEM")
public class BillItem implements Serializable
{
	/**
	 * 
	 */
	private static final long	serialVersionUID	= 1L;
	private Long				billItemNumber;
	private Bill				bill;
	private BigDecimal			billItemTax		= new BigDecimal(0);
	private BigDecimal			billItemAmount		= new BigDecimal(0);
	private long				billItemQuantity	= 0;
	private Service			billItemService;

	public BillItem()
	{}

	public BillItem(long itemQty, Service service)
	{
		this.setBillItemQuantity(itemQty);
		this.setBillItemService(service);
		this.calculateBillItemAmount();

	}

	public BillItem(Service service)
	{
		this.setBillItemService(service);
		this.calculateBillItemTax();
		this.calculateBillItemAmount();
	}

	private BigDecimal calculateBillItemTax()
	{

		return this.billItemTax;

	}

	private BigDecimal calculateBillItemAmount()
	{
		if ((this.billItemService != null))
		{
			this.billItemAmount = this.billItemService.getSrvcRateList().get(0).
												getSrvcChargeComponent().getChargeRate().
												getPrice().getAmount().multiply(new BigDecimal(billItemQuantity)).
												add(calculateBillItemTax());
		}
		return billItemAmount;

	}

	@Id
	@GeneratedValue
	public Long getBillItemNumber()
	{
		return billItemNumber;
	}

	public void setBillItemNumber(Long id)
	{
		this.billItemNumber = id;
	}

	@ManyToOne(optional = false)
	@JoinColumn(name = "BillNumber")
	@JsonIgnore
	public Bill getBill()
	{
		return bill;
	}

	public void setBill(Bill param)
	{
		this.bill = param;
	}

	public void setBillItemTax(BigDecimal billItemTax)
	{
		this.billItemTax = billItemTax;
	}

	public BigDecimal getBillItemTax()
	{
		return billItemTax;
	}

	public void setBillItemAmount(BigDecimal billItemAmount)
	{
		this.billItemAmount = billItemAmount;
	}

	public BigDecimal getBillItemAmount()
	{
		return billItemAmount;
	}

	public long getBillItemQuantity()
	{
		return billItemQuantity;
	}

	public void setBillItemQuantity(long billItemQuantity)
	{
		this.billItemQuantity = billItemQuantity;
	}

	@ManyToOne(optional = false,targetEntity = Service.class)
	@JoinColumn(name = "Service_Code")
	public Service getBillItemService()
	{
		return billItemService;
	}

	public void setBillItemService(Service param)
	{
		this.billItemService = param;
	}

}
