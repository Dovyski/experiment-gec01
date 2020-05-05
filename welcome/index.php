<?php

/**
 * Receives data from post/get requests and stores it
 * in a database
 */

require_once(dirname(__FILE__) . '/../backend/config.php');

$aDb = new PDO('sqlite:' . DB_FILE_PATH);
$aDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$aError = '';

try {
    if(isset($_REQUEST['start'])) {
        $aUuid = uniqid();

        if(strlen($aUuid) > 36) {
            $aUuid = substr($aUuid, 0, 36);
        }

        $aData = [
            'uuid' => $aUuid,
            'created_at' => time()
        ];

        $aSql = "INSERT INTO subjects (uuid, created_at) VALUES (:uuid, :created_at)";
        $aStmt= $aDb->prepare($aSql);
        $aStmt->execute($aData);

        $aSubjectDbId = $aDb->lastInsertId();
        $aExperimentUserId = $aSubjectDbId . '' . $aUuid;
        $aHit = urlencode(base64_encode(str_repeat($aUuid, 6)));

        header('Location: ../experiment/?hit='.$aHit.'&user='.$aSubjectDbId.'&uid=' . $aExperimentUserId . '&t=' . time());
    }
} catch(Exception $e) {
	$aError = $e->getMessage();
}
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<title>Welcome</title>
	<link href="./css/style.css" rel="stylesheet">
</head>
<body>
    <h1>Welcome<h2>
    <p>Text something</p>

    <?php if(!empty($aError)) { ?>
        <p>Oops, something wrong just happended: <?php echo $aError ?></p>
    <?php } ?>

    <form action="./?start=<?php echo time() ?>" method="post">
        <button>Submit</button>
    </form>

    <!-- prefetch everything we need -->
	<script type="text/javascript" src="../js/3rdparty/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="../js/ftg.utils.js"></script>
	<script type="text/javascript" src="../js/ftg.collector.js"></script>
	<script type="text/javascript" src="../js/ftg.questionnaire.js"></script>
	<script type="text/javascript" src="../js/ftg.questions.cots.js"></script>
	<script type="text/javascript" src="../js/ftg.questions.game.js"></script>
	<script type="text/javascript" src="../js/ftg.questions.user.js"></script>
	<audio id="bip" src="./sfx/bip.mp3" volume="1.0">There is a problem with the bip sound in the experiment.</audio>
	<audio id="tan" src="./sfx/tan.mp3" volume="1.0">There is a problem with the tan sound in the experiment.</audio>
	<audio id="calm" src="./sfx/calm.mp3" volume="0.8" loop="true">There is a problem with the calm sound in the experiment.</audio>
</body>
</html>
