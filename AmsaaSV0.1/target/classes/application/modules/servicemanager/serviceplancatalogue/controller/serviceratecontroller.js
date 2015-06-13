define(function (require) {
    "use strict";

    var viewResolver = require("ViewResolver"), SrvcRateModelView = require('../model/servicerateviewmodel'), SrvcModelView = require('../model/servicerateviewmodel'), srvcViewTemplate = require('Text!../views/servicerates.html'), Repo = require('repository/repository'), PagedGridView = require("modules/common/model/pagedgridmodelremote"), DataMapper = require("modules/common/model/datamapper"), PageModel = require("modules/common/model/pagemodel");

    var srvcRateController = {

        srvcPlanName: '',

        srvcRatePagedGridView: "",

        srvcList: ko.observable(),

        currencyList: ko.observable(),

        unitsList: ko.observable(),

        chargeTypeList: ko.observable(),

        frequencyList: ko.observable(),

        init: function (path, srvcPlanName) {
            console.log("SERVICE RATE CONTROLLER INITIALISED");
            this.srvcPlanName = srvcPlanName;

            Repo.setPath("services");
            Repo.findAll().then(function (srvcData) {
                srvcRateController.srvcList(srvcData);
                console.log("Service List:" + ko.toJSON(srvcRateController.srvcList()));
            });

            Repo.setPath("unitsnmeasure");
            epo.findAll()
            then(function (unitsData) {
                srvcRateController.currencyList(unitsData.currencies);
                console.log("Currency list:" + srvcRateController.currencyList());
                srvcRateController.unitsList(unitsData.units);
                console.log("Units list:" + srvcRateController.unitsList());
                srvcRateController.chargeTypeList(unitsData.chargeTypes);
                console.log("ChargeTypes list:" + srvcRateController.chargeTypeList());
                srvcRateController.frequencyList(unitsData.frequencies);
            });

            var page = new PageModel(20);
            var dataMapper = new DataMapper(SrvcRateModelView);
            Repo.setPath(path);
            this.srvcRatePagedGridView = new PagedGridView(Repo, page, dataMapper, [ "5", "10", "15" ], "5");
            this.srvcRatePagedGridView.init();

            viewResolver.renderModelView(srvcPlanName, this, srvcViewTemplate, "gridStyle");
        },

        addServiceRate: function () {
            var srvcRate = new SrvcRateModelView("");
            srvcRate.dataModel.srvcPlanName(this.srvcPlanName);
            srvcRate.dataModel.service("");
            srvcRate.viewModel.isSelected(true);
            srvcRate.viewModel.isIdEditable(true);
            srvcRate.viewModel.isEditable(true);
            this.srvcRatePagedGridView.addNewRecord(srvcRate);
        },

        deleteServiceRate: function (data) {
            if (data !== "") {
                if (data.viewModel.isIdEditable() === true) {
                    srvcRateController.srvcRatePagedGridView.removeRecord(data);
                } else {
                    console.log("Service code:" + data.dataModel.service().srvcCode);
                    console.log("Charge Type:" + data.dataModel.chargeType());

                    Repo.removeById(data.dataModel.service().srvcCode + "/" + data.dataModel.chargeType()).then(function (srvrData) {
                        if (srvrData) {
                            srvcRateController.srvcRatePagedGridView.removeRecord(data);
                        }
                    }).fail(function (excptn) {
                        alert("Server Exception:" + excptn);
                    });
                }
            }
        },

        saveServiceRate: function (data) {
            if (data !== "") {
                if (data.viewModel.isIdEditable() === true) {
                    console.log("Persist to Repo");
                    data.viewModel.isIdEditable(false);
                    data.viewModel.isEditable(false);
                    Repo.persist(data.dataModel).then(function (serverData) {
                        console.log(serverData);
                    }).fail(function (exptn) {
                        srvcRateController.srvcRatePagedGridView.removeRecord(data);
                        alert("Server Error:" + exptn);
                    });
                } else if (data === "") {

                } else {
                    console.log("Updating service plan");
                    data.viewModel.isEditable(false);
                    Repo.update(data.dataModel).then(function (srvrData) {
                        console.log(srvrData);
                    });
                }
            }

        }

    };

    return srvcRateController;
});