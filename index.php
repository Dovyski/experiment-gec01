<?php


$aLocale = '';
$aLocale = isset($_REQUEST['en']) ? 'en' : $aLocale;
$aLocale = isset($_REQUEST['pt']) ? 'pt' : $aLocale;
$aLocale = isset($_REQUEST['locale']) ? $_REQUEST['locale'] : $aLocale;

$aURLAppend = !empty($aLocale) ? '?locale=' . $aLocale : '';
$aURL = 'Location: ./welcome/' . $aURLAppend;

header($aURL);
exit();

?>