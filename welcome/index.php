<?php

/**
 * Receives data from post/get requests and stores it
 * in a database
 */

require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

initLocale();

$aLocale = config('locale');
$aDb = db();

$aError = '';

try {
    if(isset($_REQUEST['start'])) {
        $aUuid = uniqid();

        if(strlen($aUuid) > 60) {
            $aUuid = substr($aUuid, 0, 60);
        }

        $aData = [
            'uuid' => $aUuid,
            'locale' => $aLocale,
            'created_at' => time()
        ];

        $aSql = "INSERT INTO subjects (uuid, locale, created_at, compleated_at) VALUES (:uuid, :locale, :created_at, 0)";
        $aStmt= $aDb->prepare($aSql);
        $aStmt->execute($aData);

        $aSubjectDbId = $aDb->lastInsertId();
        $aExperimentUserId = $aSubjectDbId . '' . $aUuid;
        $aHit = urlencode(base64_encode(str_repeat($aUuid, 6)));

        header('Location: ../experiment/?hit='.$aHit.'&user='.$aSubjectDbId.'&locale='.$aLocale.'&uid=' . $aExperimentUserId . '&cid=' . $aUuid . '&t=' . time());
        exit();
    }

    if(isset($_REQUEST['end']) && isset($_REQUEST['uuid']) && isset($_REQUEST['user'])) {
        $aUuid = $_REQUEST['uuid'];
        $aUserDbId = $_REQUEST['user'];

        $aData = [
            'id' => $aUserDbId,
            'uuid' => $aUuid,
            'compleated_at' => time()
        ];

        $aSql = "UPDATE subjects SET compleated_at = :compleated_at WHERE id = :id AND uuid = :uuid";
        $aStmt= $aDb->prepare($aSql);
        $aStmt->execute($aData);

        header('Content-type: application/json');
        echo json_encode(array('success' => true));
        exit();
    }
} catch(Exception $e) {
	$aError = $e->getMessage();
}

?>
<!doctype html>
<html lang="<?php echo $aLocale ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo config('title', $aLocale) ?> | Olen</title>

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

    <!-- Styles -->
	<link href="../css/style.css" rel="stylesheet">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
</head>
<body>
    <div class="flex-center position-ref full-height">
        <div class="content">
            <div class="title m-b-md">
                <?php echo lang('welcome') ?>
            </div>
            <div class="m-b-md">
                <p><?php echo config('description', $aLocale) ?></p>

                <?php if(!empty($aError)) { ?>
                    <p><?php echo lang('something_wrong') ?>: <?php echo $aError ?></p>
                <?php } ?>

                <form action="./?locale=<?php echo $aLocale ?>&start=<?php echo time() ?>" method="post" class="m-t-md" id="welcome-form">
                    <button type="submit" class="welcome ld-ext-right" onclick="this.classList.add('running'); this.disabled=true; document.getElementById('welcome-form').submit();">
                        <?php echo lang('continue') ?><div class="ld ld-ring ld-spin"></div>
                    </button>
                </form>

                <p id="mobile-warning"><?php echo lang('mobile') ?></p>
            </div>

            <div class="footer m-b-md">
                <p><?php echo config('footer', $aLocale) ?></p>
            </div>
        </div>
    </div>

    <!-- prefetch everything we need -->
	<script type="text/javascript" src="../js/3rdparty/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="../js/3rdparty/phaser.min.js"></script>
	<script type="text/javascript" src="../js/ftg.utils.js"></script>
	<script type="text/javascript" src="../js/ftg.collector.js"></script>
	<script type="text/javascript" src="../js/ftg.questionnaire.js"></script>
	<script type="text/javascript" src="../js/ftg.questions.game.js"></script>
	<script type="text/javascript" src="../js/ftg.questions.user.js"></script>
	<audio id="bip" src="../experiment/sfx/bip.mp3" volume="1.0">There is a problem with the bip sound in the experiment.</audio>
	<audio id="tan" src="../experiment/sfx/tan.mp3" volume="1.0">There is a problem with the tan sound in the experiment.</audio>
    <audio id="calm" src="../experiment/sfx/calm.mp3" volume="0.8" loop="true">There is a problem with the calm sound in the experiment.</audio>
</body>
</html>
