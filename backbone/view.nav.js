var ItemsNavView = Backbone.View.extend({
  rootID: 'bb-content',
  navID: 'bb-nav',
  template: _.templateFromUrl('backbone/tpl/navigation.html'),

  navCtrl: function(nav) {
    //console.log(nav);

    var pagesData = $.extend(nav, { pages : []});

    var buffer = {},
      pgs = 3,
      jump = Math.ceil(pgs + 1 / 2),
      min = nav.currentPage - jump > 0 ? nav.currentPage - jump : 1,
      max = nav.currentPage + jump <= nav.lastPage ? nav.currentPage + jump : nav.lastPage;

    buffer[nav.currentPage] = { 'href': '#page/' + nav.currentPage, text: nav.currentPage, 'isCurrent': true };
    for (var i=1; i<jump; i++) {

      tmp_index = nav.currentPage - i;
      if (tmp_index > 0)
        buffer[tmp_index] = { 'href': '#page/' + tmp_index, text: tmp_index, 'isCurrent': false };

      if (Object.keys(buffer).length >= pgs)
        break;

      tmp_index = nav.currentPage + i;
      if (tmp_index <= nav.lastPage)
        buffer[tmp_index] = { 'href': '#page/' + tmp_index, text: tmp_index, 'isCurrent': false };

      if (Object.keys(buffer).length >= pgs)
        break;
    }

    var first = parseInt(Object.keys(buffer)[0], 10),
      last = parseInt(Object.keys(buffer)[Object.keys(buffer).length - 1], 10);

    var first_index = first - 1;
    if (first_index >= nav.firstPage)
      buffer[first_index] = { 'href': '#page/' + first_index, text: first_index > nav.firstPage ? '...' : first_index, 'isCurrent': false };

    var last_index = last + 1;
    if (last_index <= nav.lastPage)
      buffer[last_index] = { 'href': '#page/' + last_index, text: last_index < nav.lastPage ? '...' : last_index, 'isCurrent': false };

    $.each(buffer, function(k, el) {
      pagesData['pages'].push(el);
    });

    return pagesData;
  },

  render: function(nav) {
    pagesData = this.navCtrl(nav);

  	var navHtml = this.template(pagesData);
    $('#' + this.navID).html(navHtml);
  }

});