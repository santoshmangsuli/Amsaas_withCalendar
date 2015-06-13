/**
 *
 * Author :Raghavendra Badiger
 *
 * Description :The grid controlls the remote json data and represents the same
 * in paged format
 *
 */

define(function (require) {

    "use strict";

    var pagedGridModelRemote = function (dataRepository, pageModel, dataMapper, recPerPageOptions, defaultRecPerPageOption) {

        var self = this;

        self.page = pageModel;

        self.dataMapper = dataMapper;

        self.dataRepository = dataRepository;

        self.gridLocalDataRepo = ko.observableArray([]);

        self.pagedRecordsList = ko.observableArray([]);

        self.recsPerPageOptions = recPerPageOptions;

        self.chosenRecsPerPageOption = ko.observable(defaultRecPerPageOption);

        self.nextPageStartIndex = parseInt(self.chosenRecsPerPageOption());

        self.prevPageStartIndex = 0;

        self.currentPageNo = ko.observable("1");

        self.noOfPages = ko.computed(function () {
            var noOfPages = Math.ceil(self.gridLocalDataRepo().length / self.chosenRecsPerPageOption());
            return noOfPages;
        });

        self.chosenRecsPerPageOption.subscribe(function () {
            self.moveToFirstPage();
            // self.currentPageNo("1");
        });

        self.init = function () {
            console.log("Grid Initiated "+self.page);
            
            dataRepository.findNextPageData(self.page).then(function (srvrBulkData) {
                self.gridLocalDataRepo(self.dataMapper.getMappedList(srvrBulkData.pageDataList));
                console.log(ko.toJSON(self.gridLocalDataRepo()));
                self.moveToFirstPage();
            }).fail(function (data) {
                //alert("Server Error:" + ko.toJSON(data));
            });
        };

        self.moveToNextPage = function () {
            console.log("Move to next page");
            if (self.nextPageStartIndex < self.gridLocalDataRepo().length) {
                self.updateIndexToNext();
            } else if (self.nextPageStartIndex >= self.gridLocalDataRepo().length) {
                self.page.updateToNext();
                dataRepository.findNextPageData(self.page).then(function (srvrBulkData) {
                    if (srvrBulkData.pageDataList.length > 0) {
                        self.gridLocalDataRepo(self.dataMapper.getMappedList(srvrBulkData.pageDataList));
                        console.log("Size of Repo:" + self.gridLocalDataRepo().length);
                        console.log("First element of Repo:" + self.gridLocalDataRepo()[0].dataModel.srvcPlanName());
                        self.moveToFirstPage();
                    } else {
                        self.page.updateToPrev();
                        self.currentPageNo(self.noOfPages());
                    }

                });
            }
        };

        self.moveToPrevPage = function () {
            console.log("Moving to Prev page");
            if (self.prevPageStartIndex >= 0) {
                if (self.page.currentIndex > 0 && parseInt(self.currentPageNo()) === 1) {
                    self.page.updateToPrev();
                    dataRepository.findNextPageData(self.page).then(function (srvrBulkData) {
                        if (srvrBulkData.pageDataList.length > 0) {
                            self.gridLocalDataRepo(self.dataMapper.getMappedList(srvrBulkData.pageDataList));
                            console.log("Size of Repo:" + self.gridLocalDataRepo().length);
                            console.log("First element of Repo:" + self.gridLocalDataRepo()[0].dataModel.srvcPlanName());
                            self.moveToLastPage();
                        }

                    });
                } else {
                    self.updateIndexToPrev();
                }
            }
        };

        self.moveToPage = function (pageNo) {
            console.log("Page No:" + pageNo);
            self.prevPageStartIndex = (self.chosenRecsPerPageOption() * (pageNo - 1));
            console.log("Start Index:" + self.prevPageStartIndex);
            self.nextPageStartIndex = self.prevPageStartIndex + parseInt(self.chosenRecsPerPageOption());
            console.log("End Index:" + self.nextPageStartIndex);
            self.pagedRecordsList(self.gridLocalDataRepo.slice(self.prevPageStartIndex, self.nextPageStartIndex));
        };

        self.moveToFirstPage = function () {
            console.log("moving to first page");
            self.nextPageStartIndex = parseInt(self.chosenRecsPerPageOption());
            self.prevPageStartIndex = 0;
            self.pagedRecordsList(self.gridLocalDataRepo.slice(self.prevPageStartIndex, self.nextPageStartIndex));
            console.log("Prev Index:" + self.prevPageStartIndex);
            console.log("Next Index:" + self.nextPageStartIndex);
            self.currentPageNo(1);

        };

        self.moveToLastPage = function () {
            self.nextPageStartIndex = (self.noOfPages() * parseInt(self.chosenRecsPerPageOption()));
            console.log("nextPageStartIndex:" + self.nextPageStartIndex);
            self.prevPageStartIndex = self.nextPageStartIndex - parseInt(self.chosenRecsPerPageOption());
            console.log("prevPageStartIndex:" + self.prevPageStartIndex);
            self.pagedRecordsList(self.gridLocalDataRepo.slice(self.prevPageStartIndex));
            self.currentPageNo(self.noOfPages());

        };

        self.updateIndexToNext = function () {
            console.log("Updating indexes for next page");
            self.prevPageStartIndex = self.nextPageStartIndex;
            console.log("startIndex:" + self.prevPageStartIndex);
            self.nextPageStartIndex = (self.nextPageStartIndex + parseInt(self.chosenRecsPerPageOption()));
            console.log("nextIndex:" + self.nextPageStartIndex);
            self.pagedRecordsList(self.gridLocalDataRepo.slice(self.prevPageStartIndex, self.nextPageStartIndex));
            self.increamentPageNo();

        };

        self.updateIndexToPrev = function () {
            console.log("Updating indexes for previous page");
            var index = (self.prevPageStartIndex - parseInt(self.chosenRecsPerPageOption()));
            if (index >= 0) {
                self.nextPageStartIndex = self.prevPageStartIndex;
                console.log("Next Index:" + self.nextPageStartIndex);
                self.prevPageStartIndex = index;
                console.log("Prev Index:" + self.prevPageStartIndex);
                self.pagedRecordsList(self.gridLocalDataRepo.slice(self.prevPageStartIndex, self.nextPageStartIndex));
                self.decreamentPageNo();
            }

        };

        self.increamentPageNo = function () {
            var cp = parseInt(self.currentPageNo()) + 1;
            self.currentPageNo(cp);
        };

        self.decreamentPageNo = function () {
            var cp = parseInt(self.currentPageNo()) - 1;
            self.currentPageNo(cp);
        };

        self.addNewRecord = function (record) {
            self.gridLocalDataRepo.push(record);
            self.moveToLastPage();
        };

        self.removeRecord = function (idOrData) {
            self.gridLocalDataRepo.remove(idOrData);
            self.moveToLastPage();
        };

    };

    return pagedGridModelRemote;

});