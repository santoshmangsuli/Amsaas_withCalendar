define(function (require) {
    "use strict";

    var viewResolver = require("ViewResolver"), srvcViewTemplate = require('Text!../views/serviceplans.html'), SrvcPlanModelView = require('../model/serviceplanviewmodel'), srvcPlanRepo = require('repository/repository'), PagedGridView = require("modules/common/model/pagedgridmodelremote"), DataMapper = require("modules/common/model/datamapper"), PageModel = require("modules/common/model/pagemodel");

    var srvcPlanController = {

        srvcPlanPagedGridView: "",

        init: function (path, param) {
            console.log("Initialize ServicePlans controller");
            console.log("ServicePlan Resourec path:" + path);
            srvcPlanRepo.setPath(path);
            var page = new PageModel(20);
            var dataMapper = new DataMapper(SrvcPlanModelView);
            var grid = new PagedGridView(srvcPlanRepo, page, dataMapper, [ "5", "10", "15" ], "5");

            console.log("Initialize JSON-Grid controller");
            this.srvcPlanPagedGridView = grid;
            this.srvcPlanPagedGridView.init();

            viewResolver.renderModelView("serviceplans", this, srvcViewTemplate, "gridStyle");

        },

        addNewServicePlan: function () {
            var svcPlanModelView = new SrvcPlanModelView("");
            svcPlanModelView.viewModel.isSelected(true);
            svcPlanModelView.viewModel.isIdEditable(true);
            svcPlanModelView.viewModel.isEditable(true);
            this.srvcPlanPagedGridView.addNewRecord(svcPlanModelView);
        },

        deleteServicePlan: function (data) {
            if (data !== "") {
                console.log("Removing service plan:" + data);
                srvcPlanController.srvcPlanPagedGridView.removeRecord(data.dataModel.srvcPlanName());
            }
        },

        saveServicePlan: function (data) {

            if (data !== "") {
                if (data.viewModel.isIdEditable() === true) {
                    console.log("Persist to Repo");
                    data.viewModel.isIdEditable(false);
                    data.viewModel.isEditable(false);
                    srvcPlanRepo.persist(data.dataModel).then(function (serverData) {
                        var mappedSrvcList = $.map(serverData, function (item) {
                            return new SrvcModelView(item);
                        });
                    });
                } else if (data === "") {

                } else {
                    console.log("Updating service plan");
                    data.viewModel.isEditable(false);
                    srvcPlanRepo.update(data.dataModel).then(function (srvrData) {
                        console.log(srvrData);
                    });
                }
            }

        },

    };

    return srvcPlanController;
});