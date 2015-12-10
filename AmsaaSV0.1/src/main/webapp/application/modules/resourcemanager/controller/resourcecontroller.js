define(function(require) {
	"use strict";

	var resourceViewTemplate = require('Text!../views/resourcemanager.html'), 
	
	
	ResourceModelView = require('../model/resourceModelView'), 
	resourceRepo = require('repository/resourceRepository'), 
	bookingRepo = require('repository/bookingRepository'), 
	viewResolver = require("ViewResolver"), 
	PagedGridView = require("modules/common/model/pagedgridmodel");

	var resourceController = {
		resourcePagedGridView : ko.observable(''),
		calendar : ko.observable(''),
		resource : ko.observable(''),
		ResourceList : ko.observableArray([ "" ]),
		evtList : ko.observableArray([ "" ]),
		addNewUser : function() {
		},
		addNewResource: function () {
            var resourceModelView = new ResourceModelView("");
            resourceModelView.viewModel.isSelected=true;
            resourceModelView.viewModel.isIdEditable=true;
            resourceModelView.viewModel.isEditable=true;
            resourceModelView.dataModel.resourceId='';
            resourceModelView.dataModel.resourceName='';
            resourceModelView.dataModel.description='';
            //resourceRepo.persistResource(resourceModelView);
            console.log("add "+JSON.stringify(resourceModelView));
            this.resourcePagedGridView().addNewRecord(resourceModelView);
            //console.log("init -CONTROLLER!!");
        },
        saveResource: function (data) {
        	console.log("saveResource!!"+JSON.stringify(data));
            if (data !== "") {
                if (data.viewModel.isIdEditable === true) {
                    console.log("Persist to Repo"+JSON.stringify(data));
                    data.viewModel.isEditable=false;
                    data.viewModel.isSelected=false;
                    resourceRepo.persistResource(data.dataModel);
                } else if (data === "") {

                } else {
                    console.log("Updating service plan");
                    data.viewModel.isEditable(false);
                    resourceRepo.updateResource(data.dataModel).then(function (srvrData) {
                        console.log(srvrData);
                    });
                }
            }
        },
        removeResource: function (data) {
            if (data !== "") {
                console.log("Removing resource :" + data);
                this.resourcePagedGridView().removeRecord(data.dataModel.resourceId);
                resourceRepo.removeResource(data.dataModel);
            }
        },
		init : function() {
			console.log("init -CONTROLLER!!");
			resourceRepo.getAllResourceList().then(function(data) {
				resourceController.ResourceList(data);
				var resourceList = $.map(data, function(item) {
					var res = new ResourceModelView(item);
					return res;
				});
				resourceController.resourcePagedGridView(new PagedGridView(
						resourceList, [ "1", "5","10", "15" ], "5"));
				resourceController.resourcePagedGridView().moveToFirstPage();

			});
			resourceController.resource.subscribe(function(val) {
				if (val) {
					resourceController.selectedResourceBookings(val);
				}
			});

			viewResolver.renderModelView("resourcemanager", this,
					resourceViewTemplate, "calendarStyle");
			resourceController.cal([ "" ]);
		},

		selectedResourceBookings : function(resSel) {

			console.log("res ;" + ko.toJSON(resSel));
			bookingRepo.getAllBookingsList(resSel.resourceName).then(
					function(data) {

						var evtList = $.map(data, function(item) {

							var evt = {
								title : "Title#:"
										+ item.bookingTitle.toString(),
								start : new Date(item.startDateTime),
								end : new Date(item.endDateTime),
								allDay : (item.allDay == 'true')
							};
							console.log("evt " + ko.toJSON(evt));
							return evt;
						});
						console.log("evtList: " + ko.toJSON(evtList));

						resourceController.cal(evtList);
					}).fail(function() {
				alert("Failed:");
			});
		},

		cal : function(evtList) {
			$('#resCal').empty();
			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			// console.log(new Date(y, m, d-2));
			resourceController.calendar = $('#resCal').fullCalendar(
					{

						header : {
							left : 'prev,next today',
							center : 'title',
							right : 'month,agendaWeek,agendaDay'
						},
						selectable : true,
						editable : true,
						selectHelper : true,
						select : function(start, end, allDay) {

							var title = prompt('Event Title:');
							if (title) {
								var eventnew = {
									title : title,
									start : start,
									end : end,
									allDay : allDay
								};

								var booking = {
									bookingTitle : title,
									bookingPerson : {
										persnId : '16'
									},
									bookedResource : {
										resourceId : resourceController
												.resource().resourceId
									},
									startDateTime : start,
									endDateTime : end,
									allDay : allDay
								};
								bookingRepo.persistEvent(booking).then(
										function(data) {
											resourceController.calendar
													.fullCalendar(
															'renderEvent',
															eventnew, false // make
													// the
													// event
													// "stick"
													);
										}).fail(function(e) {
									alert("Error @ server side!!");
								});
							}
							// calendar.fullCalendar('unselect');

						},

						events : evtList,
						/*
						Called on click of a calendar event
						 */
					eventClick : function(event, element) {
						var $dialogContent = $("#event_edit_container");
						$dialogContent.dialog().show();
						// event.title = "CLICKED!";
						open("application/modules/resourcemanager/views/Popup.html");
						var title = prompt('Event Title:');
						var start = prompt('Start Date:');
						if (title || start) {
							event.title = title;
							alert(event.start);
							event.start=start;
							resourceController.calendar.fullCalendar(
									'updateEvent', event);

						}

					}
						
					});

		}
	};

	return resourceController;

});