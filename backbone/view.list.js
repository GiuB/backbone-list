var ItemsListView = Backbone.View.extend({
  rootID: 'bb-content',
  tagName: 'tbody',

  initialize: function(){
    this.itemsNav  = new ItemsNavView();

    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('update', this.render, this);
    this.watch();
  },

  watch: function() {
    var self = this;
    $('#bb-content th.order').click(function() {
      self.sortUpdate($(this));
    });
  },

  addOne: function(item){
    var itemView = new ItemView({model: item});
    this.$el.append(itemView.render().el);
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  sortUpdate: function(col) {
    var order = $(col).attr('data-order') != 'asc'? 'asc' : 'desc';

    // Reset caret orientation
    $('#' + this.rootID + ' th.order').attr('data-order', 'asc');

    // Update $col data
    $(col).attr('data-order', order);

    // Prepare pagination sorting
    this.collection.state.sortKey = col.data('sort');
    this.collection.state.order   = order === 'desc'? 1 : -1;

    // Fetch data
    this.collection.fetch();
  },

  navRender: function() {
    this.itemsNav.render({
      previous: this.collection.hasPreviousPage()? this.collection.state.currentPage - 1 : false,
      hasPrevious: this.collection.hasPreviousPage(),
      next: this.collection.hasNextPage()? this.collection.state.currentPage + 1 : false,
      hasNext: this.collection.hasNextPage(),
      currentPage: this.collection.state.currentPage,
      totalPages: this.collection.state.totalPages,
      firstPage: this.collection.state.firstPage,
      lastPage: this.collection.state.totalPages
    });
  },

  render: function(){
    // Clean rows html
    $('#' + this.rootID + " " + this.tagName).empty();

    // Prepare all items
    this.addAll();

    // Refresh total counter
    $('#bbi-total-counter').text(this.collection.state.totalRecords);

    // Add all items to html
    $('#' + this.rootID).append(this.$el);

    // Update nav
    this.navRender();
  }

});