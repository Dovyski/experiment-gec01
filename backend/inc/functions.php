<?php

function getUserHash($theUserId) {
    $aUserId = empty($theUserId) ? 'empty' : $theUserId;
    $aHash = md5($aUserId);
    return $aHash;
}

function getUserDbPath($theUserId) {
    $aHash = getUserHash($theUserId);
    $aDbName = sprintf(PER_USER_DB_FILE, $aHash);
    $aDbPath = PER_USER_DB_FILE_PATH . '/' . $aDbName;

    return $aDbPath;
}

function userdb($theUserId) {
    $aDbPath = getUserDbPath($theUserId);
    return db($aDbPath);
}

function db($thePath = '') {
    $aPath = empty($thePath) ? DB_FILE_PATH : $thePath;
    $aShouldInit = false;

    if(!file_exists($aPath)) {
        $aShouldInit = true;
    }
    
    $aDb = new PDO('sqlite:' . $aPath);
    $aDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($aShouldInit) {
        $aDb->beginTransaction();
        $aDb->query('CREATE TABLE subjects (id INTEGER PRIMARY KEY, uuid VARCHAR(64), locale VARCHAR(5), created_at INTEGER, compleated_at INTEGER)');
        $aDb->query('CREATE TABLE logs (fk_game INTEGER, timestamp INTEGER, uuid VARCHAR(64), data TEXT)');
        $aDb->query('CREATE TABLE questionnaires (fk_game INTEGER, timestamp INTEGER, uuid VARCHAR(64), data TEXT)');
        $aDb->query('CREATE TABLE games (id PRIMARY KEY, name VARCHAR(100))');
        $aDb->query('CREATE INDEX idx_logs_fk_game ON logs (fk_game)');
        $aDb->query('CREATE INDEX idx_questionnaire_fk_game ON questionnaires (fk_game)');
        
        $aDb->query('INSERT INTO games (id, name) VALUES (1, \'Tetris\')');
        $aDb->query('INSERT INTO games (id, name) VALUES (2, \'Platformer\')');
        $aDb->query('INSERT INTO games (id, name) VALUES (3, \'TetrisC\')');
        $aDb->query('INSERT INTO games (id, name) VALUES (4, \'PlatformerC\')');
        $aDb->commit();
    }

    return $aDb;
}

function config($theKey = '', $theSection = '') {
    global $gIniExperiment;

    if(empty($theKey)) {
        return $gIniExperiment;
    }

    $aStore = $gIniExperiment;

    if(!empty($theSection)) {
        if(!isset($aStore[$theSection])) {
            echo 'Unknown config section: ' . $theSection;
            exit(5);
        }
        $aStore = $aStore[$theSection];
    }
    
    if(!isset($aStore[$theKey])) {
        echo 'Unknown config key: ' . $theKey;
        exit(5);
    }

    $aValue = $aStore[$theKey];
    return $aValue;
}

function lang($theKey, $theLocale = '') {
    global $gIniLang;

    if(empty($theLocale)) {
        $theLocale = config('locale');
    }

    $aTexts = isset($gIniLang[$theLocale]) ? $gIniLang[$theLocale] : $gIniLang['en'];
    $aPiece = isset($aTexts[$theKey]) ? $aTexts[$theKey] : '???';
    
    return $aPiece;
}

function validateLocale($theLocale = '', $theDefaultLocale = 'en') {
    global $gIniLang;
    
    if(isset($gIniLang[$theLocale])) {
        return $theLocale;
    } else {
        return $theDefaultLocale;
    }
}

function initLocale() {
    global $gIniExperiment;

    $aLocale = isset($_REQUEST['locale']) ? $_REQUEST['locale'] : config('locale');
    $gIniExperiment['locale'] = validateLocale($aLocale);
}

?>
