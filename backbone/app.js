var ItemApp = new (Backbone.Router.extend({
	initialized: false,
	routes: {
		"": "index",
		"page/:page": "page"
	},
	initialize: function(){
		this.itemsList = new ItemsList();
		this.itemsView = new ItemsListView({collection: this.itemsList});
		this.itemsView.render();
	},
	start: function(){
		Backbone.history.start({pushState: false, root: ''}); // alternative root: 'index.html'
	},
	index: function(){
		this.itemsList.fetch();
		this.initialized = true;
	},
	show: function(id){
		this.todoList.focusOnItem(id);
	},
	page: function(page) {
		page = parseInt(page, 10);

		if (!this.initialized)
			this.index();

		if (page <= this.itemsList.state.totalPages) {
			this.itemsList.state.currentPage = parseInt(page, 10);
			this.itemsList.fetch();
		} else {
			this.navigate('page/' + this.itemsList.state.totalPages);
		}
	}
}));

$(function(){
	ItemApp.start();
});