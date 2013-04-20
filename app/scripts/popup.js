'use strict';

var showMap = function(data) {
	var mapUrl = 'http://maps.google.com/maps?q=';
	if(data.Latitude && data.Longitude) {
		mapUrl += '@' + data.Latitude + ',' + data.Longitude;
	}
	else if(data.ZipPostalCode) {
		mapUrl += data.ZipPostalCode;
	}
	else if (data.City && data.CountryName) {
		mapUrl += data.City + ', ' + data.CountryName;
	}
	else {
		return;
	}
	$('#map').on('click', function() {
		window.open(mapUrl);
	}).show();
};

var getIPData = function() {
	$(document)
		.ajaxSend(function() {
			$('#spinner').show();
		})
		.ajaxStop(function() {
			$('#spinner').hide();
		})
		.ajaxError(function() {
			$('#spinner').hide();
			$('#ip').text('Error occurred');
		});
	$.getJSON('http://myip.travelingtechguy.com?e=1', function(data) {
		// console.log(JSON.stringify(data));
		$('#ip').removeClass('getting-data').text(data.Ip);
		$('.value').each(function() {
			$(this).text(data[$(this).attr('id')]);
		});
		$('#nav').show();
		showMap(data);
	});
};

$(document).ready(function() {
	getIPData();
	$('#more').on('click', function() {
		$('#more').text($('#more').text() === 'more' ? 'less' : 'more');
		$('#geo').toggle();
	});
	$('#copy').on('click', function() {
		var ip = $('#ip').text();
		chrome.extension.sendRequest({ text: ip });
		$('#ip').fadeTo('slow', 0.33, function() {
			$('#ip').text('Copied');
		}).fadeTo('slow', 1.00, function() {
			$('#ip').text(ip);
		});
	});
	$('.about').on('click', function() {
		window.open('http://www.TravelingTechGuy.com');
	});
});
