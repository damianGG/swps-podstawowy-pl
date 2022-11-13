// JavaScript Document
jQuery (function($){
	$(document).ready(function(){
		//alert ('sth');
		$('#top, #footer').each(function(){
			$(this).children().wrapAll('<div class="container"></div>');
		});
		$("iframe[src*='youtube.com']").each(function() {
			$(this).wrapAll('<div class="video-container" />');
		});
	});
});
