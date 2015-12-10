define(function (require) {
    "use strict";

    var viewResolver = require("ViewResolver"), 
    srvcViewTemplate = require('Text!./services.html'), 
    SrvcModelView = require('./serviceviewmodel'), 
    srvcRepo = require('repository/repository'), 
    PagedGridView = require("modules/common/model/pagedgridmodelremote"), 
    DataMapper = require("modules/common/model/datamapper"), 
    PageModel = require("modules/common/model/pagemodel");

    var srvcController = {

        srvcPagedGridView: ko.observable(''),

        init: function (path, param) {
            console.log("Initialize Service controller");
            var page = new PageModel(20);
            var dataMapper = new DataMapper(SrvcModelView);
            srvcRepo.setPath("services");
            var grid = new PagedGridView(srvcRepo, page, dataMapper, [ "5", "10", "15" ], "5");

            console.log("Initialize JSON-Grid controller");
            this.srvcPagedGridView = grid;
            this.srvcPagedGridView.init();

            viewResolver.renderModelView("services", this, srvcViewTemplate, "gridStyle");
        },

        addNewService: function () {
            var svcModelView = new SrvcModelView("");
            svcModelView.viewModel.isSelected(true);
            svcModelView.viewModel.isIdEditable(true);
            svcModelView.viewModel.isEditable(true);
            this.srvcPagedGridView.addNewRecord(svcModelView);

        },

        deleteService: function (data) {
            if (data) {
                console.log("Removing service plan:" + data);
                srvcController.srvcPagedGridView.removeRecord(data.dataModel.srvcCode());
            }
        },

        saveService: function (data) {
            console.log("saveService"+JSON.stringify(data));
            if (data !== "") {
            	console.log("data !== blank");
                if (data.viewModel.isIdEditable() === true) {
                    console.log("Persist to Repo");
                    data.viewModel.isIdEditable(false);
                    data.viewModel.isEditable(false);
                    srvcRepo.persist(data.dataModel).then(function (serverData) {
                        console.log(serverData);
                    });
                } else if (data === "") {
                	console.log("data === blank");

                } else {
                    console.log("Updating service plan");
                    data.viewModel.isEditable(false);
                    srvcRepo.update(data.dataModel).then(function (srvrData) {
                        console.log(srvrData);
                    }).fail(function (excptn) {
                        alert("Server Exception:" + excptn.responseText.message);
                    });
                }
            }

        }

    };

    return srvcController;
});