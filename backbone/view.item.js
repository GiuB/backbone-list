var ItemView = Backbone.View.extend({
	className: 'bb-item',
	model: Item,
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	template: _.template('<h3 class="bbi-title"><%= title %></h3>'),
	render: function(){
		console.log(this.model.toJSON());
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	remove: function(){
		this.$el.remove();
	}
});