/*
Author: Daniel Munn <https://github.com/danmunn
Author: Radovan Kepák <https://github.com/bckp
Date: 23/05/2012
*/
function init_tabs(){
  try{
    tabComment = $('tab-history_comments');
    tabAll = $('tab-history_all');
    tabComment.observe('click', click_comments);
    tabAll.observe('click', click_all);
    tabComment.hasClassName('selected') ? show_comments() : show_all();
		
		a = $('tabs-scroll').cumulativeOffset();
		
		tabScroll = {
			elm: tabScroll = $('tabs-scroll'),
			left: a.left,
			top: a.top,
		};
		
		Event.observe(window, 'scroll', function(){
			scroll_tabs();
		});
		
		Event.observe(window, 'resize', function(){
			resize_tabs();
		});
		
		//Vyvolame je hned ze startu kdyby nahodou
		scroll_tabs();
		resize_tabs();
  }catch(e){};
}

function show_comments() {
  $$('.journal').invoke('hide');
	$$('.journal .details').invoke('hide');
  $$('.journal.has-notes').invoke('show');
}

function show_all() {
	$$('.journal .details').invoke('show');
  $$('.journal').invoke('show');
}

function click_comments(e) {
  tabComment.addClassName('selected');
  tabAll.removeClassName('selected');
  show_comments();
  Event.stop(e);
}

function click_all(e) {
  tabComment.removeClassName('selected');
  tabAll.addClassName('selected');
  show_all();
  Event.stop(e);
}

function scroll_tabs(){
	if( (document.viewport.getScrollOffsets().top - tabScroll.top) > 0 )
		tabScroll.elm.setStyle({
			'position': 'fixed',
			'left': tabScroll.left + 'px',
		});
	else
		tabScroll.elm.setStyle({
			'position': 'absolute',
			'left': '0px'
		});
}

function resize_tabs(){
	tabScroll.elm.setStyle({'width': $('content').getLayout().get('width') + 'px'});
}

var tabAll;
var tabComment;
var tabScroll;

document.observe('dom:loaded', function(){
  init_tabs();
});