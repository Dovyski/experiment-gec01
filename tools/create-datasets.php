<?php

/**
 * Process the raw data in a folder to produce the final dataset files in "/datasets"
 */

require_once(dirname(__FILE__) . '/config.php');
require_once(dirname(__FILE__) . '/inc/functions.php');
require_once(dirname(__FILE__) . '/../backend/config.php');
require_once(dirname(__FILE__) . '/../backend/inc/functions.php');

assertRunningAsCmdScript();

$aOptions = array(
    "data-dir:",
    "database-file:",
    "output-dir:",
    "ignore:",
    "ids:",
    "skip-video",
    "help"
);

$aArgs = getopt("h", $aOptions);

if(isset($aArgs['h']) || isset($aArgs['help']) || $argc == 1) {
     echo "Usage: \n";
     echo " php ".basename($_SERVER['PHP_SELF']) . " [options]\n\n";
     echo "Options:\n";
     echo " --data-dir=<path>       Path to the folder containing subjects database files.\n";
     echo " --database-file=<path>  Path to the file containing the SQLite database that\n";
     echo "                         has the data for all subject sessions. If nothing is\n";
     echo "                         provided, the root of the data dir is searched for\n";
     echo "                         a database file.\n";
     echo " --output-dir=<path>     Path to the folder where processed files will\n";
     echo "                         be written.\n";
     echo " --ignore=<ids>          List of subject ids (separated by commas) that will\n";
     echo "                         be ignored in the process. Use this option to exclude\n";
     echo "                         subjects with defective data, for instance.\n";
     echo " --ids=<ids>             List of subject ids (separated by commas) that will\n";
     echo "                         be used from the data dir to generate the dataset.";
     echo "                         Use this option to include only a particular set of";
     echo "                         subjects in a dataset, for instance.";
     echo " --skip-video            No actions will be performed regarding video files.\n";
     echo "                         For instance, video files will not be concatenated.";
     echo " --help, -h              Show this help.\n";
     echo "\n";
     exit(1);
}

$aDefaultDataFolder = dirname(__FILE__) . '\..\backend\data\\';
$aDataFolder = isset($aArgs['data-dir']) ? $aArgs['data-dir'] : realpath($aDefaultDataFolder);
$aDatabaseFile = isset($aArgs['database-file']) ? $aArgs['database-file'] : '';

$aDataFolder .= @$aDataFolder[strlen($aDataFolder) - 1] != DIRECTORY_SEPARATOR ? DIRECTORY_SEPARATOR : '';

if(!file_exists($aDataFolder)) {
    echo 'Unable to access data folder: ' . $aDataFolder . "\n";
    exit(2);
}

if(empty($aDatabaseFile)) {
    $aDatabaseFile = dirname(__FILE__) . '\..\backend\\' . DB_FILE;
}

if(!file_exists($aDatabaseFile)) {
    echo 'Unable to access data file: ' . $aDatabaseFile . "\n";
    exit(3);
}

$aDefaultOutputFolder = dirname(__FILE__) . '\datasets\complete-experiment\\';
$aOutputFolder = isset($aArgs['output-dir']) ? $aArgs['output-dir'] : realpath($aDefaultOutputFolder);
$aOutputFolder .= @$aOutputFolder[strlen($aOutputFolder) - 1] != DIRECTORY_SEPARATOR ? DIRECTORY_SEPARATOR : '';

if(!file_exists($aOutputFolder)) {
    echo 'Unable to access output folder: ' . $aOutputFolder . "\n";
    exit(4);
}

$aIgnoreList = isset($aArgs['ignore']) ? stringCommasToArray($aArgs['ignore']) : array();
$aIdsList    = isset($aArgs['ids'])    ? stringCommasToArray($aArgs['ids'])    : array();

$aDb = new PDO('sqlite:' . $aDatabaseFile);
$aDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$aSubjects = findSubjects($aDb);

foreach($aSubjects as $aSubjectInfo) {
    $aSubjectId = $aSubjectInfo['id'] . $aSubjectInfo['uuid'];
    $aSubjectDir = $aDataFolder;

    $aShouldIgnore = count($aIgnoreList) > 0 && in_array($aSubjectId, $aIgnoreList);
    $aShouldInclude = count($aIdsList) == 0 || (count($aIdsList) > 0 && in_array($aSubjectId, $aIdsList));

    if($aShouldIgnore || !$aShouldInclude) {
        echo 'Subject '.$aSubjectId . ' skipped (' . ($aShouldIgnore ? 'in --ignore list' : 'not in --ids list') . ').' . "\n";
        continue;
    }

    if($aSubjectInfo['compleated_at'] == 0) {
        echo 'Subject '.$aSubjectId . ' skipped due to incomplete experiment.' . "\n";
        continue;
    }

    $aSubjectDatabaseFile = $aSubjectDir . getUserHash($aSubjectId) . '.sqlite';
    $aOutputPath = $aOutputFolder . $aSubjectId . DIRECTORY_SEPARATOR;
    $aOutputLogsPath = $aOutputPath . 'logs' . DIRECTORY_SEPARATOR;

    @mkdir($aOutputPath);
    @mkdir($aOutputLogsPath);

    echo 'Subject ' . $aSubjectId . "\n";
    echo '  id: ' . $aSubjectInfo['id'] . "\n";
    echo '  uuid: ' . $aSubjectInfo['uuid'] . "\n";
    echo '  subject id: ' . $aSubjectId . "\n";
    echo '  subject db: ' . $aSubjectDatabaseFile . "\n";
    echo '  output folder: ' . $aOutputPath . "\n";

    $aGroundFileExporter = dirname(__FILE__) . '\export-ground-data.php';
    $aExportCmd = 'php "'.$aGroundFileExporter.'" --database-file="' . $aSubjectDatabaseFile . '" --subject=' . $aSubjectId . ' --output-prefix="' . $aOutputPath . $aSubjectId . '"';

    runAndExitIfFailed($aExportCmd, $aOutputLogsPath . 'ground-files-generation.log');

    $aSummaryPath = $aOutputPath . $aSubjectId . '.json';
    $aGroundSummary = loadSubjectGroundDataSummary($aSummaryPath);

    if($aGroundSummary == NULL) {
        echo 'Unable to load ground data summary from: ' . $aSummaryPath . "\n";
        exit(5);
    }
}

echo "\n";
echo 'Datasets generated successfuly!' . "\n";

?>
