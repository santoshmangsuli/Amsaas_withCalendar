package com.ams.domain.repository;

import java.util.List;
import java.util.Set;

import com.ams.domain.model.bill.Bill;
import com.ams.domain.model.bill.Payment;

public interface PaymentRepository
{

	public Payment createPayment(Payment payment);

	public long updatePayment(Payment payment);

	public long deletePayment(long billNumber);

	public Payment findPayment(long paymentId);

	public Set<Payment> findPayments(long billNumber);

	public List<Bill> findBillsByPaymentStatus();

}
