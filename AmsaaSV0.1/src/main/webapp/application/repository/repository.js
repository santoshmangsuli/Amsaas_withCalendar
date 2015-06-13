define(function (require) {
    "use strict";
    var repo = {

        path: "",

        setPath: function (pathParam) {
            this.path = pathParam;
            console.log("Repo url set to:" + this.path);
        },

        persist: function (model) {
        	console.log("persistUser "+JSON.stringify(model));
            return $.ajax({
                url: this.path,
                type: "POST",
                data: ko.toJSON(model),
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });
        },

        update: function (model) {
            return $.ajax({
                url: this.path,
                type: "PUT",
                data: ko.toJSON(model),
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });
        },

        removeById: function (id) {
            return $.ajax({
                url: this.path + "/" + id,
                type: "DELETE",
                dataType: "json",
                contentType: ";application/json; charset=utf-8"
            });
        },

        remove: function (data) {
            return $.ajax({
                url: this.path + "/",
                type: "DELETE",
                data: ko.toJSON(data),
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });
        },

        findAll: function () {
            return $.ajax({
                url: this.path,
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

        },

        findNextPageData: function (pageModel) {
        	console.log("Calling Server"+this.path+" "+pageModel.currentIndex+" "+pageModel.nextIndex );
            return $.ajax({
                url: this.path + "/page/" + pageModel.currentIndex + "&" + pageModel.nextIndex,
                type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            });

        }

    };

    return repo;

});