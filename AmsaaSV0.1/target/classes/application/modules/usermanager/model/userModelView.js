define(function(require) {
	var userModelView = function(data){
		
		if(data != null) {
		this.dataModel = {
				persnId : ko.observable(data.persnId),
				persnFlatNum : ko.observable(data.persnAddress.flatNumber),
				persnFirstName : ko.observable(data.persnFirstName),
				persnLastName : ko.observable(data.persnLastName),
				
				persnPhoneNum : ko.observable(data.persnDetail.landLineNumber),
				persnMobileNum : ko.observable(data.persnDetail.mobileNumber),
				persnEmailId : ko.observable(data.persnDetail.emailId),
				apartmentName: ko.observable(data.persnDetail.apartmentName),
				street: ko.observable(data.persnDetail.street),
				landMark: ko.observable(data.persnDetail.landMark),
				city: ko.observable(data.persnDetail.city)
				
			};
		
		this.viewModel={
				isIdEditable : ko.observable(false),
				isEditable : ko.observable(false),
				isSelected : ko.observable(false)
		};
		}else{
			this.dataModel = {
					persnFlatNum : ko.observable().extend({ required: {message : "Please enter Flat no"} }),
					persnFirstName : ko.observable().extend({ required: {message : "Please enter First Name"} }),
					persnLastName : ko.observable().extend({ required: {message : "Please enter Last Name"} }),
					persnPhoneNum : ko.observable().extend({ required: {message : "Please enter Landline No"} }),
					persnMobileNum : ko.observable().extend({ required: {message : "Please enter Mobile No"} }),
					persnEmailId : ko.observable().extend({ 
						required: {message : "Please enter email id"} 
					}),
					apartmentName : ko.observable().extend({
		                  required: true
		            }),
					street : ko.observable(),
					landMark : ko.observable(),
					city : ko.observable().extend({ required: {message : "Please enter City"} })
				};
		}
	};
	return userModelView;
});
