<?php

require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
    <title>Study <?php echo config('id') ?></title>
    
    <?php if(config('ga')) { ?>
        <!-- Google Analytics -->
        <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '<?php echo config('ga') ?>', 'auto');
        ga('send', 'pageview');
        </script>
        <!-- End Google Analytics -->
    <?php } ?>

	<link href="../css/style.css?<?php echo CACHE_TAG ?>" rel="stylesheet">
</head>
<body>
	<div id="info"></div>
	<div id="instructions"></div>

	<script type="text/javascript" src="../js/3rdparty/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="../js/ftg.utils.js?<?php echo CACHE_TAG ?>"></script>
	<script type="text/javascript" src="../js/ftg.collector.js?<?php echo CACHE_TAG ?>"></script>
	<script type="text/javascript" src="../js/ftg.questionnaire.js?<?php echo CACHE_TAG ?>"></script>
	<script type="text/javascript" src="../js/ftg.questions.game.js?<?php echo CACHE_TAG ?>"></script>
	<script type="text/javascript" src="../js/ftg.questions.user.js?<?php echo CACHE_TAG ?>"></script>
    <script type="text/javascript" src="../js/ftg.experiment.js?<?php echo CACHE_TAG ?>"></script>

	<audio id="bip" src="./sfx/bip.mp3" volume="1.0">There is a problem with the bip sound in the experiment.</audio>
	<audio id="tan" src="./sfx/tan.mp3" volume="1.0">There is a problem with the tan sound in the experiment.</audio>
	<audio id="calm" src="./sfx/calm.mp3" volume="0.8" loop="true">There is a problem with the calm sound in the experiment.</audio>
</body>
</html>
