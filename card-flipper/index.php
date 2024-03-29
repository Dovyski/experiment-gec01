<?php

require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Card Flipper</title>
	<script type="text/javascript" src="../js/3rdparty/phaser.min.js"></script>
	<script type="text/javascript" src="../js/ftg.utils.js?<?php echo CACHE_TAG ?>"></script>

	<script type="text/javascript" src="./Constants.js?2"></script>
	<script type="text/javascript" src="./BootState.js"></script>
	<script type="text/javascript" src="./LoadState.js"></script>
	<script type="text/javascript" src="./SetupState.js?1"></script>
	<script type="text/javascript" src="./PlayState.js?1"></script>
	<script type="text/javascript" src="./GameOverState.js?2"></script>
	<script type="text/javascript" src="./MenuState.js?1"></script>
	<script type="text/javascript" src="./ProgressBar.js"></script>
	<script type="text/javascript" src="./Hud.js"></script>
	<script type="text/javascript" src="./Card.js"></script>
	<script type="text/javascript" src="./RightWrongIcon.js"></script>
	<script type="text/javascript" src="./Tutorial.js"></script>
	<script type="text/javascript" src="./card-flipper.js"></script>
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
<body>
	<div id="container"></div>
</body>
</html>
