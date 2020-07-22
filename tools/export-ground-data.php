<?php

/**
 * Export the ground data of a specific subject.
 */

require_once(dirname(__FILE__) . '/config.php');
require_once(dirname(__FILE__) . '/inc/functions.php');

assertRunningAsCmdScript();

$aOptions = array(
    "database-file:",
    "subject:",
    "output-prefix:",
    "help"
);

$aArgs = getopt("h", $aOptions);

if(isset($aArgs['h']) || isset($aArgs['help']) || $argc == 1) {
     echo "Usage: \n";
     echo " php ".basename($_SERVER['PHP_SELF']) . " [options]\n\n";
     echo "Options:\n";
     echo " --database-file=<path>    Path to the file containing the SQLite\n";
     echo "                           database that has the data for all subject\n";
     echo "                           sessions.\n";
     echo " --subject=<int>           Id of the subject whose ground data will\n";
     echo "                           exported.\n";
     echo " --output-prefix=<string>  String to be prefixed to all exported\n";
     echo "                           ground files. If nothing is informed, the\n";
     echo "                           subject id is used as a prefix.\n";
     echo " --help, -h                Show this help.\n";
     echo "\n";
     exit(1);
}

$aDatabaseFile = isset($aArgs['database-file']) ? $aArgs['database-file'] : '';
$aSubjectId = isset($aArgs['subject']) ? $aArgs['subject'] : '';
$aOutputPrefix = isset($aArgs['output-prefix']) ? $aArgs['output-prefix'] : $aSubjectId;

if(!file_exists($aDatabaseFile)) {
    echo 'Unable to access database file: ' . $aDatabaseFile . "\n";
    exit(2);
}

$aDb = new PDO('sqlite:' . $aDatabaseFile);
$aDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$aData = getSubjectData($aDb, $aSubjectId);
exportSubjectData($aOutputPrefix, $aDb, $aData, $aSubjectId);

?>
