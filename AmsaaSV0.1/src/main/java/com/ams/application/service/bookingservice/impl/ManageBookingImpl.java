package com.ams.application.service.bookingservice.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ams.application.common.ServiceException;
import com.ams.application.service.billingandpaymentservice.ManageBill;
import com.ams.application.service.billingandpaymentservice.servicedata.BillDTO;
import com.ams.application.service.bookingservice.ManageBooking;
import com.ams.domain.model.bill.BillItem;
import com.ams.domain.model.booking.Booking;
import com.ams.domain.model.service.ServiceRate;
import com.ams.domain.repository.BookingRepository;
import com.ams.domain.repository.ServiceRepository;

@Service
@Transactional
public class ManageBookingImpl implements ManageBooking
{
	@Autowired
	private BookingRepository	bookingRepository;

	@Autowired
	private ManageBill			manageBillService;

	@Autowired
	private ServiceRepository	serviceRepository;

	public Long newBooking(Booking booking) throws ServiceException
	{

		System.out.println(" booking.getAllDay()" + booking.getAllDay());
		Date startDateTime = booking.getStartDateTime();
		Date endDateTime = booking.getEndDateTime();
		if (booking.getAllDay().equals("true"))
		{
			Calendar cal = Calendar.getInstance();
			cal.setTime(startDateTime);
			cal.set(Calendar.HOUR_OF_DAY, 8);
			cal.set(Calendar.MINUTE, 0);
			startDateTime = cal.getTime();
			booking.setStartDateTime(startDateTime);
			cal.setTime(endDateTime);
			cal.set(Calendar.HOUR_OF_DAY, 20);
			cal.set(Calendar.MINUTE, 0);
			endDateTime = cal.getTime();
			booking.setEndDateTime(endDateTime);
		}

		List<Booking> bookings = bookingRepository.findAllOverlapBookingsOfResource(booking.getBookedResource().getResourceId(),
																		startDateTime, endDateTime);
		System.out.println(" bookings " + bookings.size());
		if (bookings.size() > 0)
		{
			throw new ServiceException("bookings exist");
		}
		else
		{
			Long bookingId = bookingRepository.createBooking(booking);

			// createBillItemforBooking(booking);
			return bookingId;
		}
	}

	private void createBillItemforBooking(Booking booking)
	{
		serviceRepository.findById("");
		com.ams.domain.model.service.Service service = new com.ams.domain.model.service.Service();
		List<ServiceRate> srvcRateList = service.getSrvcRateList();
		Iterator<ServiceRate> srvcRateListItr = srvcRateList.iterator();
		ServiceRate serviceRate = null;

		while (srvcRateListItr.hasNext())
		{
			serviceRate = srvcRateListItr.next();
			if (serviceRate.getSrvcPlan().equals(""))
			{
				break;
			}
		}

		long diffTime = booking.getEndDateTime().getTime() - booking.getStartDateTime().getTime();
		long diffHours = diffTime / (60 * 60 * 1000) % 24;
		BigDecimal srvcCost = serviceRate.getSrvcChargeComponent().getChargeRate().getPrice().getAmount().multiply(new BigDecimal(diffHours));
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");

		BillDTO billDTO = new BillDTO();

		billDTO.setBillDate(formatter.format(booking.getEndDateTime()));
		billDTO.setBillDueDate(formatter.format(booking.getEndDateTime()));
		billDTO.setBillTotalAmount(srvcCost.doubleValue());
		billDTO.setBillTotalTax(0.0);
		BillItem billItem = new BillItem();
		billItem.setBillItemAmount(srvcCost);
		billItem.setBillItemNumber(1L);
		billItem.setBillItemQuantity(1L);
		billItem.setBillItemService(service);
		billItem.setBillItemTax(BigDecimal.ZERO);
		billDTO.getBillLineItems().add(billItem);
		manageBillService.createNewBill(billDTO);
	}

	public List<Booking> findAllBookingsOfResource(String resourceName, Date startDateTime, Date endDateTime)
	{
		// TODO Auto-generated method stub
		return bookingRepository.findAllBookingsOfResource(resourceName, startDateTime, endDateTime);
	}

	public Long updateBooking(Long bookingId, Date startDateTime, Date endDateTime)
	{
		// TODO Auto-generated method stub
		return null;
	}

	public Long cancelBooking(Long bookingId)
	{
		// TODO Auto-generated method stub
		return null;
	}

}
