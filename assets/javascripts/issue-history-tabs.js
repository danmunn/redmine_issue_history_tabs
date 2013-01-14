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
		tabScroll = {elm: $('tabs-scroll')};
		
		init_scroll_tabs();
		
		Event.observe(window, 'scroll', function(){
			scroll_tabs();
		});
		
		Event.observe(window, 'resize', function(){
			init_scroll_tabs();
		});
  }catch(e){};
}

function init_scroll_tabs(){
	//Reset position, set width
	tabScroll.elm.setStyle({
		'position': 'absolute', 'left': '0px',
		'width': $('content').getLayout().get('width') + 'px'
	});
	a = $('tabs-scroll').cumulativeOffset();
	
	//Set new values
	tabScroll.top = a.top;
	tabScroll.left = a.left;
	
	//Call
	scroll_tabs();
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

var tabAll;
var tabComment;
var tabScroll;

document.observe('dom:loaded', function(){
  init_tabs();
});