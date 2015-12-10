define(function(require) {
	var paymentModelView = function() {
		var self = this;
		self.paymntId = ko.observable("");
		self.paymntAmount = ko.observable("");
		self.paymntBalance = ko.observable("");
		self.paymntMethod = ko.observable("");
		self.paymntDate = ko.observable("");
	};
	return paymentModelView;
});
