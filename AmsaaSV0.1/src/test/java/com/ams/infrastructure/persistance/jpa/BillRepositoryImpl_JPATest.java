package com.ams.infrastructure.persistance.jpa;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.ams.domain.model.bill.Payment;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:com/ams/infrastructure/configuration/ApplicationContext.xml" })
@Transactional
@TransactionConfiguration(transactionManager = "txManager_Jpa",defaultRollback = true)
public class BillRepositoryImpl_JPATest
{
	@Autowired
	private BillRepositoryImpl_JPA	billRepo;

	@Test
	public void testCreate()
	{
		List<Payment> paymentList= billRepo.findPayments();


		System.out.println(" paymentList " + paymentList.size());
	}

}
