var performance = {
	what: 'Nome do Festival',
	when: 'Data',
	where: 'Local'
}

$(document).ready(function () {
	$('#what').text("Event: " + performance.what);
	$(this).show()
});

$(document).ready(function () {
	$('#where').text("Event: " + performance.where);
	$(this).show()
});

$(document).ready(function () {
	$('#when').text("Event: " + performance.when);
	$(this).show()
});

$(document).ready(function () {
	$("td img").click(function () {
		$(this).attr('src', '/../images/c.gif');
		$(this).parent().addClass('selected');
		alert($(this).parent().attr("class"));
		return false;
	});
});


