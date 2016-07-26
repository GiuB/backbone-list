var ItemView = Backbone.View.extend({
	tagName: 'tr',
	className: 'bbi-row',
	model: Item,
	template: _.templateFromUrl('backbone/tpl/item.html'),
	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	remove: function(){
		this.$el.remove();
	}
});