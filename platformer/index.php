<?php

require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Platformer</title>
	<script type="text/javascript" src="../js/3rdparty/phaser.min.js"></script>
	<script type="text/javascript" src="../js/ftg.utils.js?<?php echo CACHE_TAG ?>"></script>

	<script type="text/javascript" src="./Constants.js?1"></script>
	<script type="text/javascript" src="./BootState.js"></script>
	<script type="text/javascript" src="./LoadState.js?1"></script>
	<script type="text/javascript" src="../card-flipper/SetupState.js?5"></script>
	<script type="text/javascript" src="./PlayState.js?2"></script>
	<script type="text/javascript" src="./GameOverState.js?3"></script>
	<script type="text/javascript" src="./MenuState.js"></script>
	<script type="text/javascript" src="./TutorialState.js?1"></script>
	<script type="text/javascript" src="./ProgressBar.js"></script>
	<script type="text/javascript" src="./Hud.js"></script>
	<script type="text/javascript" src="./Player.js"></script>
	<script type="text/javascript" src="./Dust.js"></script>
	<script type="text/javascript" src="./Level.js"></script>
	<script type="text/javascript" src="./Landscape.js"></script>
	<script type="text/javascript" src="./platformer.js"></script>
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
