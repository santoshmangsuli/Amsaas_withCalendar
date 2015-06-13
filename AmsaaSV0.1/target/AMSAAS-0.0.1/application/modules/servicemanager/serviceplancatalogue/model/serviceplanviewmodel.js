define(function (require) {

    ko.validation.registerExtenders(); 

    //var srvcRateModel=require('./servicerateviewmodel'),DataMapper = require("modules/common/model/datamapper");

    var modelView = function (data) {
        var self = this;

        if (data !== "") {
            self.dataModel = {
                srvcPlanName: ko.observable(data.srvcPlanName).extend({
                    required: true
                }),
                srvcPlanCreatDate: ko.observable(data.srvcPlanCreatDate).extend({
                    required: true
                }),
                serviceRateSet: ko.observableArray(data.serviceRateSet).extend({
                    required: true
                })
            };
        } else if (data === "") {

            self.dataModel = {
                srvcPlanName: ko.observable().extend({
                    required: true
                }),
                srvcPlanCreatDate: ko.observable().extend({
                    required: true
                }),
                serviceRateSet: ko.observableArray().extend({
                    required: true
                })

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