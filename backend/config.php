<?php

define('DB_FILE','database.sqlite');
define('DB_FILE_PATH', dirname(__FILE__) . '/' . DB_FILE);
define('PER_USER_DB_FILE_PATH', dirname(__FILE__) . '/data');
define('PER_USER_DB_FILE', '%s.sqlite');
define('LANG_INI_FILE_PATH', dirname(__FILE__) . '/../i18n/texts.ini');
define('EXPERIMENT_INI_FILE_PATH', dirname(__FILE__) . '/../experiment.ini');
define('CACHE_TAG', '20200519');

if(!file_exists(LANG_INI_FILE_PATH)) {
    echo 'The text.ini file is missing: ' . LANG_INI_FILE_PATH;
    exit(2);
}

if(!file_exists(EXPERIMENT_INI_FILE_PATH)) {
    echo 'The experiment.ini file is missing: ' . EXPERIMENT_INI_FILE_PATH;
    exit(2);
}

$gIniLang = parse_ini_file(LANG_INI_FILE_PATH, true);
$gIniExperiment = parse_ini_file(EXPERIMENT_INI_FILE_PATH, true);

if($gIniLang === false) {
    echo 'The text.ini file has a syntax problem: ' . LANG_INI_FILE_PATH;
    exit(3);
}

if($gIniExperiment === false) {
    echo 'The experiment.ini file has a syntax problem: ' . EXPERIMENT_INI_FILE_PATH;
    exit(3);
}

?>
