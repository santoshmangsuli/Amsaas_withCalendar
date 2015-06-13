/**
 *
 *
 */

define(function (require) {
    "use strict";
    var dataMapper = function (model) {
        var self = this;
        self.modelObject = model;

        self.getMappedList = function (dataList) {
            var mappedModelList = $.map(dataList, function (item) {
                return new self.modelObject(item);
            });
            return mappedModelList;
        };
    };

    return dataMapper;

});