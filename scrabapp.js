$(document).ready(function(){
	var letter1 = genLetter();
	var letter2 = genLetter();
	var letter3 = genLetter();
	var letter4 = genLetter();
	var letter5 = genLetter();
	var letter6 = genLetter();
	var letter7 = genLetter();
	var letter8 = genLetter();

	$("#letter1").text(letter1);
	$("#letter2").text(letter2);
	$("#letter3").text(letter3);
	$("#letter4").text(letter4);
	$("#letter5").text(letter5);
	$("#letter6").text(letter6);
	$("#letter7").text(letter7);
	$("#letter8").text(letter8);

	var distr = getDistr(letter1 + letter2 + letter3 + letter4 + letter5 + letter6 + letter7 + letter8);
	var used = [];
	console.log(distr);

	$('#redraw').click(function () {
		letter1 = genLetter();
		letter2 = genLetter();
		letter3 = genLetter();
		letter4 = genLetter();
		letter5 = genLetter();
		letter6 = genLetter();
		letter7 = genLetter();
		letter8 = genLetter();

		$("#letter1").text(letter1);
		$("#letter2").text(letter2);
		$("#letter3").text(letter3);
		$("#letter4").text(letter4);
		$("#letter5").text(letter5);
		$("#letter6").text(letter6);
		$("#letter7").text(letter7);
		$("#letter8").text(letter8);

		distr = getDistr(letter1 + letter2 + letter3 + letter4 + letter5 + letter6 + letter7 + letter8);
		used = [];
		$('#submissions').text("");
	});

	$('#submit').click(function(){
		var word = $('#word').val().toUpperCase();
		if(checkIfAn($('#word').val().toUpperCase(), distr)){
			if(used.includes(word)){
				alert("You have already used this word");
			} else {
				if(word.length <= 1)
					alert("You must play at least a 2 letter word");
				else{
					$.getJSON("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190913T013143Z.75b8a3f71fef3e69.a18bf5e18bb6d7a4423276ebdc7e19dde8aaa53d&lang=en-ru&text=" + word, function(data){
						console.log(data);
						if(data.def.length > 0){
							$('#submissions').html($('#submissions').html() + "<br>>" + word);
							used.push(word);
						}else
							alert("Not recognized as a word");
					});
				}
			}
			$('#word').val("");
		} else{
			alert("You must use the letters provided");
		}
	});

	$('#solution').click(function(){
		var word = letter1 + letter2 + letter3 + letter4 + letter5 + letter6 + letter7 + letter8;
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://danielthepope-countdown-v1.p.rapidapi.com/solve/" + word + "?variance=-1",
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "danielthepope-countdown-v1.p.rapidapi.com",
				"x-rapidapi-key": "2bf498ec62mshdb70550a3103794p1aef16jsn53813b7aa283"
			}
		}

		$.ajax(settings).done(function (response) {
			for(var i = 0; i < response.length; i++){
				var word = response[i].word.toUpperCase();
				if(!used.includes(word) && word.length > 1){
					$('#submissions').html($('#submissions').html() + "<br>>" + word);
					used.push(word);
				}
			}
		});
		

		
	});
});

function checkIfWord(word){
	$.getJSON("https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20190913T013143Z.75b8a3f71fef3e69.a18bf5e18bb6d7a4423276ebdc7e19dde8aaa53d&lang=en-ru&text=hello", function(data){
		console.log(data.def.length);
		if(data.def.length > 0)
			return true;
		else
			return false;
	});
}

function checkIfAn(word, distr){
	var newdistr = getDistr(word);
	for(var i = 0; i < distr.length; i++){
		if(newdistr[i] > distr[i])
			return false;
	}
	return true;
}

function getDistr(word){
	var newdistr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	for(var i = 0; i < word.length; i++){
		newdistr[word.charCodeAt(i) - "A".charCodeAt(0)] += 1;
	}
	return newdistr;
}

function genLetter(){
	var num = Math.floor((Math.random() * 98));
	if(num < 12)
		return 'E';
	else if(num < 21)
		return 'A';
	else if(num < 30)
		return 'I';
	else if(num < 38)
		return 'O';
	else if(num < 44)
		return 'N';
	else if(num < 50)
		return 'R';
	else if(num < 56)
		return 'T';
	else if(num < 60)
		return 'L';
	else if(num < 64)
		return 'S';
	else if(num < 68)
		return 'U';
	else if(num < 72)
		return 'D';
	else if(num < 75)
		return 'G';
	else if(num < 77)
		return 'B';
	else if(num < 79)
		return 'C';
	else if(num < 81)
		return 'M';
	else if(num < 83)
		return 'P';
	else if(num < 85)
		return 'F';
	else if(num < 87)
		return 'H';
	else if(num < 89)
		return 'V';
	else if(num < 91)
		return 'W';
	else if(num < 93)
		return 'Y';
	else if(num < 94)
		return 'K';
	else if(num < 95)
		return 'J';
	else if(num < 96)
		return 'X';
	else if(num < 97)
		return 'Q';
	else
		return 'Z';
}