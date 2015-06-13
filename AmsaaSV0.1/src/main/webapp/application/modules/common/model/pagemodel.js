define(function (require) {
    "use strict";
    var pageModel = function (recPerFetch) {
        var self = this;
        self.noOfRecordsPerFetch = recPerFetch;
        self.currentIndex = 0;
        self.nextIndex = recPerFetch;
        self.pageDataList = [];

        self.updateToNext = function () {
            self.currentIndex = self.nextIndex;
            self.nextIndex += self.noOfRecordsPerFetch;
            console.log("Bulk page currentIndex:" + self.currentIndex);
            console.log("Bulk page nextIndex:" + self.nextIndex);

        };

        self.updateToPrev = function () {
            self.nextIndex = self.currentIndex;
            self.currentIndex -= self.noOfRecordsPerFetch;
            console.log("Bulk page currentIndex:" + self.currentIndex);
            console.log("Bulk page nextIndex:" + self.nextIndex);

        };

    };

    return pageModel;

});