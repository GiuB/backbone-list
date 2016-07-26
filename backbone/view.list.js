var ItemsListView = Backbone.View.extend({
  initialize: function(){
    //this.collection = ItemsList();
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },
  addOne: function(item){
    var itemView = new ItemView({model: item});
    this.$el.append(itemView.render().el);
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },
  render: function(){
    this.addAll();
  }
});

/*
var itemList      = new ItemList();
var itemsListView = new ItemsListView({
  collection: itemList
});

itemList.fetch();
itemsListView.render(); */