var starttime;
var currentstop = 0;
var totalstops = 120;
var diffmins;
var pace;
var rest;
var pacediv = document.getElementById("packages");
var currentstopdiv = document.getElementById("ct");
var hourdiv = document.getElementById("hour");
var mindiv = document.getElementById("min");

var fmindiv = document.getElementById("fmin");
var fhourdiv = document.getElementById("fhour");

document.getElementById("pack").onclick = click;

function click() {
	const now = new Date();

	currentstop++;

	if (currentstop === 1) {
		starttime = now;
	} else {
		diffmins =
			now.getHours() * 60 +
			now.getMinutes() -
			(starttime.getHours() * 60 + starttime.getMinutes());

		pace = currentstop / diffmins;

		// rest in Minuten
		rest = (totalstops - currentstop) / pace;

		pacediv.innerHTML = `${pace * 60}<span>p/h</span>`;

		// left anzeige
		var stunden = Math.trunc(rest / 60);
		hourdiv.innerHTML = stunden;
		var minuten = Math.trunc(rest - stunden * 60);
		mindiv.innerHTML = minuten;

		// wann fertig anzeige
		var minges = starttime.getHours() * 60 + starttime.getMinutes() + rest;
		var stunden = Math.trunc(minges / 60);
		fhourdiv.innerHTML = stunden;
		var minuten = Math.trunc(minges - stunden * 60);
		fmindiv.innerHTML = minuten;
	}

	currentstopdiv.innerHTML = currentstop;
}
