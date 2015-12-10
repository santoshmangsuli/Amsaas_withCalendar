package com.ams.infrastructure.persistance.jpa;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceContextType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ams.domain.model.bill.Bill;
import com.ams.domain.model.bill.Payment;
import com.ams.domain.repository.PaymentRepository;

@Repository("PaymentRepository")
public class PaymentRepositoryImpl_JPA implements PaymentRepository
{

	@Autowired
	@PersistenceContext(type = PersistenceContextType.EXTENDED)
	private EntityManager	entityManager;

	@Override
	public Payment createPayment(Payment payment)
	{
		entityManager.persist(payment);
		return payment;
	}

	@Override
	public long updatePayment(Payment payment)
	{
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long deletePayment(long billNumber)
	{
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Payment findPayment(long paymentId)
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Payment> findPayments(long billNumber)
	{
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Bill> findBillsByPaymentStatus()
	{
		// TODO Auto-generated method stub
		return null;
	}

}
