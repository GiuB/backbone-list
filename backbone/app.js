var ItemApp = new (Backbone.Router.extend({
	routes: {
		"": "index",
		"item/:id": "show"
	},
	initialize: function(){
		this.itemsList = new ItemsList();
		this.itemsList.fetch();
		this.itemsView = new ItemsListView({collection: this.itemsList});
		$('#bb-content').append(this.itemsView.el);
	},
	start: function(){
		Backbone.history.start({pushState: true});
	},
	index: function(){
		this.itemsList.fetch();
	},
	show: function(id){
		this.todoList.focusOnItem(id);
	}
}));

$(function(){
	ItemApp.start()
});