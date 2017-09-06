$(() => {
	paused = false
	$("#launch_button").click(() => {
		amount = 25
		start = new Date
		counter()
	})

	$("#short_break_button").click(() => {
		amount = 5
		start = new Date
		counter()
	})

	$("#long_break_button").click(() => {
		amount = 15
		start = new Date
		counter()
	})

	$("#pause_button").click(() => {
		clearInterval(timer)
		pause = new Date
		paused = true

		$("#relaunch_button").css("display", "inline-block")
		$("#stop_button").css("display", "inline-block")
		$("#pause_button").css("display", "none")
		$("#break_button").css("display", "none")
	})

	$("#relaunch_button").click(() => {
		counter()

		$("#relaunch_button").css("display", "none")
		$("#stop_button").css("display", "none")
		$("#pause_button").css("display", "inline-block")
		$("#break_button").css("display", "inline-block")
	})

	$("#stop_button").click(() => {
		clearInterval(timer)

		$("#timer").text("25:00")
		$("title").html("Curry Banana")
		amount = 25

		$("#relaunch_button").css("display", "none")
		$("#stop_button").css("display", "none")
		$("#launch_button").css("display", "inline-block")
	})
})


let counter = function() {
	clearInterval(timer)

	timer = setInterval(() => {
		if(paused) {
			start = new Date(start.getTime() + (new Date().getTime() - pause.getTime()))
			paused = false
		}

		var total = amount * 60
		var elapsed = total - Math.floor((new Date - start) / 1000)
		var minutes = Math.floor(elapsed / 60)
		var seconds = elapsed - minutes * 60

		if(seconds < 10)
			seconds = "0"+seconds

		if(minutes < 10)
			minutes = "0"+minutes

		$("#timer").text(minutes+":"+seconds)
		$("title").html("Curry Banana " + minutes+":"+seconds)


		$("#launch_button").css("display", "none")
		$("#pause_button").css("display", "inline-block")
		$("#break_button").css("display", "inline-block")
	}, 500)
}
