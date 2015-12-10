define(function(require) {
	"use strict";
	var billViewTemplate = require('Text!../views/billmanager.html'),
	billDashBoardTemplate = require('Text!../views/billdashboard.html'),
	payModalTemplate = require('Text!../views/PayModal.html'),
	billModelView = require('../model/billModelView'),
	billItemModelView=require('../model/billItemModelView'),
	customerModelView=require('../model/customerModelView'),
	//srvcModelView = require('modules/servicemanager/servicecatalogue/serviceModelView'),
	srvcModelView = require('modules/servicemanager/servicecatalogue/serviceviewmodel'),
	billRepo = require('repository/billRepository'), 
	srvcRepo = require('repository/serviceRepository'), 
	viewResolver = require("ViewResolver"),
	BillPagedGridView = require("modules/common/model/pagedgridmodel"),
	servicePlanView = require('../model/servicePlanView');
	
	
	ko.bindingHandlers.modal = {
		    init: function (element, valueAccessor) {
		        $(element).modal({
		            show: false
		        });
		        
		        var value = valueAccessor();
		        if (typeof value === 'function') {
		            $(element).on('hide.bs.modal', function() {
		               value(false);
		            });
		        }
		        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
		           $(element).modal("destroy");
		        });
		        
		    },
		    update: function (element, valueAccessor) {
		        var value = valueAccessor();
		        if (ko.utils.unwrapObservable(value)) {
		            $(element).modal('show');
		        } else {
		            $(element).modal('hide');
		        }
		    }
		}
	
	var billController = {
			Bill:ko.observable(''),
			billPagedGridView : ko.observable(''),
			
			init : function(context) {
				console.log("init BILL-CONTROLLER!!"+context);
				billController.Bill(new billModelView());
				billController.Bill().init(new billItemModelView());
				srvcRepo.getAllServicePlanList().then(
						function(srvcPlanLst){
							var mappedSrvcList = $.map(srvcPlanLst, function(item) {								
								return new servicePlanView(item);
							});
							//console.log("mappedSrvcList "+ko.toJSON(mappedSrvcList));
							billController.Bill().servicePlanList(mappedSrvcList);
						});
				
				billRepo.getBillDetails().then(
						function(billData) {
							
							var mappedBillList = $.map(billData, function(item) {
								//console.log("item "+JSON.stringify(item));
								var billDateTemp = new Date(item.billDate);
								var billDueDateTemp = new Date(item.billDueDate);
								var billDataModel = {
											
										    showModal : function() {
										    	
										    	
										    	//payModalTemplate.getElementById("usrLastName").value = "usrLastName";
										    	
										    	$("#myModal").append(payModalTemplate);
										    	var testModal = {
										    					paymntAmount : item.billTotalAmount,
										    					paymntMethod : 'CASH',
										    					paymntDate : new Date(),
										    					paymntForBill : {billNumber : item.billNumber},
										    					payAmount : function(){
										    						console.log("calling payAmount"+ko.toJSON(item.billPayments[0]));
										    						billRepo.payBill(item.billPayments[0]);
										    					}};
										    	console.log(ko.toJSON(item));
										    	item.billPayments = [testModal];
										    	console.log(ko.toJSON(item));
										    	ko.applyBindings( item, document.getElementById("myModal"));
										    											    	
										    },
										persnFirstName : item.billedPerson.persnFirstName,
										persnLastName  : item.billedPerson.persnLastName,
										flatNumber : item.billedPerson.persnAddress.flatNumber,
										billDate : billDateTemp.getDate()+"/"+billDateTemp.getMonth()+"/"+billDateTemp.getFullYear(),
										billDueDate : billDueDateTemp.getDate()+"/"+billDueDateTemp.getMonth()+"/"+billDueDateTemp.getFullYear(),
										billPaymentStatus : item.billPaymentRegister.billPaymentStatus									

								};
								return billDataModel;
							});
							
							billController.billPagedGridView(new BillPagedGridView(
									mappedBillList, [ "1","5", "10", "15" ],
									"5"));
						});
							
				viewResolver.renderModelView("billCreateDiv",this, billViewTemplate,"gridStyle");
				viewResolver.renderModelView("billDashBoardDiv",this, billDashBoardTemplate,"gridStyle");

				console.log("init BILL-CONTROLLER ENDinG!!");
			}
	};

	return billController;
	
});