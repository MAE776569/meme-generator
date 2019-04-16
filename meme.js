var browse = document.getElementById('file');

//draw canvas
var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

var img, font_family = "impact", font_size = 16, stroke_style = "black",
stroke_width = "3", fill_style = "white";

//upload image
browse.addEventListener("change" , function(){
	//if the user uploaded image
	if (browse.files.length > 0) {
		//if the type of the uploaded file is image continue
		if((browse.files[0].type).search("image") !== -1) {
			$('#file-info').html("file size : " + (browse.files[0].size)/1000000 + " MB");
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			var reader  = new FileReader();
			reader.addEventListener("load", function (e) {
				 // Create an image object
				img = new Image();
				img.addEventListener("load" , function(){
					canvas.width = img.width;
		    			canvas.height = img.height;
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				});
		    	img.src = e.target.result;
		  	});
			reader.readAsDataURL(browse.files[0]);
		}
		//else show danger box
		else {
		    $('#danger').fadeIn("slow");
		    $('#close-danger').focus();
		}
	}
	//else show warning box
	else {
		$('#warning').fadeIn("slow");
		$('#close-warning').focus();
	}
});

//notEmpty function checks if the input is empty or not
function notEmpty(id) {
	if (document.getElementById(id).value === '') {
		return false;
	}
	return true;
}

function changeTextProperties() {
	ctx.font = font_size + 'px ' + font_family;
	ctx.strokeStyle = stroke_style;
	ctx.lineWidth = stroke_width;
	ctx.fillStyle = fill_style;
}

function edit() {
	if (notEmpty('font-family')) {
		font_family = $('#font-family').val();
	}
	if (notEmpty('font-size')) {
		font_size = $('#font-size').val();
	}
	if (notEmpty('stroke-style')) {
		stroke_style = $('#stroke-style').val();
	}
	if (notEmpty('stroke-width')) {
		stroke_width = $('#stroke-width').val();
	}
	if (notEmpty('fill-style')) {
		fill_style = $('#fill-style').val();
	}
	changeTextProperties();
	drawMeme(window.topLineText, window.bottomLineText);
}

//onclick edit button change text properties
$('#edit-bt').click(edit);

function drawMeme(topLine, bottomLine) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.textAlign = 'center';

	if (img != null){
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		if (topLine != null) {
			ctx.textBaseline = "top";
			ctx.fillText(topLine, canvas.width / 2, 10);
			ctx.strokeText(topLine, canvas.width / 2, 10);
		}
		  
		if (bottomLine != null) {
			ctx.textBaseline = "bottom";
			ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 10);
			ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 10);
		}
	}
}

function textChanger(evt) {
	var id = evt.target.id;
	var text = evt.target.value;

	if (id == "top-text") {
		window.topLineText = text;
	} 
	else {
		window.bottomLineText = text;
	}

	drawMeme(window.topLineText, window.bottomLineText);
}

//oninput the top or bottom text change the text
$('#top-text, #bottom-text').on('input' , textChanger);

//onclick canvas show modal
$('#can').click(function(){
	$('#preview').html('<img src="' + canvas.toDataURL() + '" alt="meme" title="meme"/>');
	$('#download-btn').attr('href', canvas.toDataURL());
	$('#canvas-modal').fadeIn("fast");
});

//onclick close button close modal
$('#close-btn').click(function(){
	$('#canvas-modal').fadeOut("fast");
});

//onclick close sign close the warning
$('#close-warning').click(function(e){
	e.preventDefault();
	$('#warning').fadeOut("fast");
});

//onclick close sign close the alert
$('#close-danger').click(function(e){
	e.preventDefault();
	$('#danger').fadeOut("fast");
});