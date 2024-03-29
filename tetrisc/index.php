<?php

require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

?>
<!DOCTYPE HTML>
<html>
<head>
	<meta charset="UTF-8" />
	<title>Masonry - Game Dolphin</title>
	<script src="../js/3rdparty/phaser.min.js"></script>
	<script src="../js/ftg.utils.js?<?php echo CACHE_TAG ?>"></script>
	<script src="../card-flipper/SetupState.js?3"></script>
	<script src="load.js"></script>
	<script src="mainmenu.js?7"></script>
	<script src="block.js"></script>
	<script src="game.js?2"></script>
	<style type="text/css">
		body {
			margin: 0;
			padding: 0;
			overflow: hidden;
		}

		#videoel,
		#overlay {
			position: absolute;
			top: 0px;
			left: 0px;
			-o-transform : scaleX(-1);
			-webkit-transform : scaleX(-1);
			transform : scaleX(-1);
			-ms-filter : fliph; /*IE*/
			filter : fliph; /*IE*/
			z-index: 10;

			width : 300px;
			height : 230px;
		}

		#videoel {
			z-index: 9;
		}

		#container {
			position: absolute;
			top: 0;
			right: 0;
			width: 300px;
			height : 230px;
		}
	</style>
</head>

<body style:"margin:0px auto;">

<div id="gameContainer" style:"margin:0px auto;"></div>
<div id="container"></div>

<script type="text/javascript">

/* Made by Nambiar - Game Dolphin

Feel free to use and learn from */
	var w = 400, h = 600;

window.onload = function() {

var gamevar = new Phaser.Game(w,h,Phaser.AUTO,'gameContainer');

gamevar.state.add('setup',SetupState);

gamevar.state.add('Load',Game.Load);

gamevar.state.add('menu',Game.MainMenu);

gamevar.state.add('Game',Game.PlayGame);

gamevar.state.add('Lose',Game.LoseScreen);

gamevar.state.start('Load');

};

</script>

</body>
</html>
