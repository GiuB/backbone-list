var ItemsListView = Backbone.View.extend({
  tagName: 'tbody',
  initialize: function(){
    //this.addHead();
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
  addHead: function(){
    this.$el.append(this.template);
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