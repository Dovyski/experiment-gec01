<?php

/**
 * Receives data from post/get requests and stores it
 * in a database
 */

require_once(dirname(__FILE__) . '/config.php');
require_once(dirname(__FILE__) . '/inc/functions.php');

$aUser 	 = isset($_REQUEST['user']) ? $_REQUEST['user'] : 0;
$aGame 	 = isset($_REQUEST['game']) ? $_REQUEST['game'] : 0;
$aMethod = isset($_REQUEST['method']) ? $_REQUEST['method'] : 'tracking';
$aRet	 = array();

$aDb = userdb($aUser);

try {
	switch($aMethod) {
		case 'tracking':
		case 'answer':
			if($aUser == 0 || $aGame == 0) {
				throw new Exception('Empty UID or game id.');
			}

			$aTable = $aMethod == 'tracking' ? 'logs' : 'questionnaires';
			$aData = isset($_REQUEST['data']) ? $_REQUEST['data'] : '';

			if($aData == '') {
				throw new Exception('No data.');
			}

			$aStmt = $aDb->prepare("INSERT INTO ".$aTable." (fk_game, timestamp, uuid, data) VALUES (:game, :timestamp, :uuid, :data)");

			$aNow = time();
			$aStmt->bindParam(':game', $aGame);
			$aStmt->bindParam(':timestamp', $aNow);
			$aStmt->bindParam(':uuid', $aUser);
			$aStmt->bindParam(':data', $aData);

			$aStmt->execute();
			$aRet['success'] = true;
			break;

		default:
			throw new Exception('Unknow method "' .$aMethod. '"');
	}

} catch(Exception $e) {
	$aRet['success'] = false;
	$aRet['message'] = $e->getMessage();
}

header('Content-type: application/json');
echo json_encode($aRet);

?>
