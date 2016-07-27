var ItemsList = Backbone.PageableCollection.extend({
    url: '/api/',
	model: Item,

    // Initial pagination states
    state: {
		pageSize: 5,
		sortKey: "id",
		order: "asc"
    },

    // You can remap the query parameters from `state` keys from
    // the default to those your server supports
    queryParams: {
		totalPages: null,
		totalRecords: null,
		sortKey: "sort"
    },

    // get the state from Github's search API result
    parseState: function (resp, queryParams, state, options) {
		return {totalRecords: resp.total_count};
    },

    // get the actual records
    parseRecords: function (resp, options) {
		return resp.items;
    }
});

//var itemsList = new ItemsList();
/*
var paginator = new Backgrid.Extension.Paginator({
	collection: itemsList
});

$("#paginator").append(paginator.render().$el); */