$(() => {
	$("#open_rewards").click(() => {
		$("#rewards_panel").css('left', '0')
		$('.content').css('position', 'relative')
		$('.content').css('left', '200px')
		$('#menu').css('margin-left', '360px')
	})

	$("#close_rewards").click(() => {
		$("#rewards_panel").css('left', '-400px')
		$('.content').css('position', 'relative')
		$('.content').css('left', '0px')
		$('#menu').css('margin-left', '0px')
	})

	$("#open_about").click(() => {
		$("#about_panel").css('right', '0')
		$('.content').css('position', 'relative')
		$('.content').css('right', '200px')
	})

	$("#close_about").click(() => {
		$("#about_panel").css('right', '-400px')
		$('.content').css('position', 'relative')
		$('.content').css('right', '0px')
	})
});
