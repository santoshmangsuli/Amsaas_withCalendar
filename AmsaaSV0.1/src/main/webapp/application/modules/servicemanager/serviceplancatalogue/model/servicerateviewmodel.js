define(function (require) {

    ko.validation.registerExtenders();

    // var srvcModel =
    // require("modules/servicemanager/components/apartmentservicemanager/model/serviceviewmodel");

    var modelView = function (srvcRateDTO) {
        var self = this;
        if (srvcRateDTO !== "") {
            self.dataModel = {
                srvcPlanName: ko.observable(srvcRateDTO.srvcPlanName),
                service: ko.observable(srvcRateDTO.service).extend({
                    required: true
                }),
                chargeName: ko.observable(srvcRateDTO.chargeName),
                chargeType: ko.observable(srvcRateDTO.chargeType),
                chargeAmount: ko.observable(srvcRateDTO.chargeAmount),
                chargeCurrency: ko.observable(srvcRateDTO.chargeCurrency),
                chargeUnit: ko.observable(srvcRateDTO.chargeUnit),
                chargeFrequency: ko.observable(srvcRateDTO.chargeFrequency),
                percentBased: ko.observable(srvcRateDTO.percentBased)
            };
        } else if (srvcRateDTO === "") {

            self.dataModel = {
                srvcPlanName: ko.observable(""),
                service: ko.observable(""),
                chargeName: ko.observable(""),
                chargeType: ko.observable(""),
                chargeAmount: ko.observable(""),
                chargeCurrency: ko.observable(""),
                chargeUnit: ko.observable(""),
                chargeFrequency: ko.observable(""),
                percentBased: ko.observable("")
            };
        }

        self.viewModel = {
            isIdEditable: ko.observable(false),
            isEditable: ko.observable(false),
            isSelected: ko.observable(false)
        };

    };

    return modelView;

});