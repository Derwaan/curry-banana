/* global pause timer start amount default_text */

var count = 0
var paused = false
var pomodoroAmount = 25
var shortBreakAmount = 5
var longBreakAmount = 15

/*
 * Manage the timer
 */
function counter() {
	clearInterval(timer)

	timer = setInterval(() => {
		if (paused) {
			start = new Date(start.getTime() + (new Date().getTime() - pause.getTime()))
			paused = false
		}

		var total = amount * 60
		var elapsed = total - Math.floor((new Date - start) / 1000)
		var minutes = Math.floor(elapsed / 60)
		var seconds = elapsed - minutes * 60

		if (seconds < 10)
			seconds = "0" + seconds

		if (minutes < 10)
			minutes = "0" + minutes

		$("#timer").text(minutes + ":" + seconds)
		$("title").html("Curry Banana " + minutes + ":" + seconds)

		if (minutes <= 0 && seconds <= 0)
			over()
	}, 500)
}

function over() {
	clearInterval(timer)
	switch (amount) {
		case pomodoroAmount:
			if (count < 3) {
				switchToShortBreak()
			} else {
				switchToLongBreak()
			}
			break
		case shortBreakAmount:
			count = (count + 1) % 4
			switchToLaunch()
			break
		case longBreakAmount:
			count = (count + 1) % 4
			switchToLaunch()
			break
		default:
	}
}

function switchText(mode) {
	switch (mode) {

		case "pause":
			$("#text").html("<p>When you are ready...</p>")
			break

		case "short_break":
			$("#text").html("<p>Time to take a short break ;-)</p>")
			break

		case "reward":
			$("#text").html(`
			<h2>You have received a reward !</h2>
			<p>${getReward().msg}</p>

			<p>
				Time to take a long break ;-) <br>
				Take this time to go outside :-D
			</p>
			`)
			break
		
		case "long_break":
			$("#text").html('<p>Take this time to go outside :-D')
			break

		case "timer":
			switch (count) {
				case 0:
					$("#text").html("<p>You are at your first pomodoro. <br> Keep going !</p>")
					break
				case 1:
					$("#text").html("<p>You are at your second pomodoro. <br> Keep going !<p>")
					break
				case 2:
					$("#text").html("<p>You are at your third pomodoro. <br> Keep going !</p>")
					break
				case 3:
					$("#text").html("<p>You are at your last pomodoro. <br> Just one more step !</p>")
					break
			}
			break

		case "ready":
			$("#text").html("<p>Ready for an another round ?</p>")
			break

		default:
			$("#text").html(default_text)
	}

}

function switchToTimer() {
	$("#launch_button").css("display", "none")
	$("#relaunch_button").css("display", "none")
	$("#stop_button").css("display", "none")
	$("#pause_button").css("display", "inline-block")
	$("#break_button").css("display", "inline-block")
	$("#short_break_button").css("display", "none")
	$("#long_break_button").css("display", "none")

	if (amount === pomodoroAmount)
		switchText("timer")
	else if (amount == shortBreakAmount)
		switchText("short_break")
	else
		switchText("long_break")
}

function switchToPause() {
	$("#launch_button").css("display", "none")
	$("#relaunch_button").css("display", "inline-block")
	$("#stop_button").css("display", "inline-block")
	$("#pause_button").css("display", "none")
	$("#break_button").css("display", "none")
	$("#short_break_button").css("display", "none")
	$("#long_break_button").css("display", "none")

	switchText("pause")
}

function switchToLaunch() {
	$("#launch_button").css("display", "inline-block")
	$("#relaunch_button").css("display", "none")
	$("#stop_button").css("display", "none")
	$("#pause_button").css("display", "none")
	$("#break_button").css("display", "none")
	$("#short_break_button").css("display", "none")
	$("#long_break_button").css("display", "none")

	if (count != 0)
		switchText("ready")
	else
		switchText()
}

function switchToShortBreak() {
	$("#launch_button").css("display", "none")
	$("#relaunch_button").css("display", "none")
	$("#stop_button").css("display", "none")
	$("#pause_button").css("display", "none")
	$("#break_button").css("display", "none")
	$("#short_break_button").css("display", "inline-block")
	$("#long_break_button").css("display", "none")

	switchText("short_break")
}

function switchToLongBreak() {
	$("#launch_button").css("display", "none")
	$("#relaunch_button").css("display", "none")
	$("#stop_button").css("display", "none")
	$("#pause_button").css("display", "none")
	$("#break_button").css("display", "none")
	$("#short_break_button").css("display", "none")
	$("#long_break_button").css("display", "inline-block")

	switchText("reward")
}

$(() => {
	default_text = $('#text').html()
	$("#timer").text(pomodoroAmount + ":00")

	$("#launch_button").click(() => {
		amount = pomodoroAmount
		start = new Date
		counter()
		switchToTimer()
	})

	$("#short_break_button").click(() => {
		amount = shortBreakAmount
		start = new Date
		counter()
		switchToTimer()
	})

	$("#long_break_button").click(() => {
		amount = longBreakAmount
		start = new Date
		counter()
		switchToTimer()
	})

	$("#short_break_action").click(() => {
		$("#short_break_button").click()
	})

	$("#long_break_action").click(() => {
		$("#long_break_button").click()
	})

	$("#pause_button").click(() => {
		clearInterval(timer)

		pause = new Date
		paused = true

		switchToPause()
	})

	$("#relaunch_button").click(() => {
		counter()
		switchToTimer()
	})

	$("#stop_button").click(() => {
		clearInterval(timer)
		count = 0

		$("#timer").text(pomodoroAmount + ":00")
		$("title").html("Curry Banana")
		amount = pomodoroAmount

		switchToLaunch()
	})
})