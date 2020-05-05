<?php

/**
 * Initializes the database.
 */

require_once(dirname(__FILE__) . '/config.php');

if(file_exists(DB_FILE_PATH)) {
    echo 'Database file already exists: <code>' . DB_FILE_PATH . '</code>';
    exit(1);
}

$aDb = new PDO('sqlite:' . DB_FILE_PATH);
$aDb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$aDb->query('CREATE TABLE subjects (id INTEGER PRIMARY KEY, uuid VARCHAR(36), locale VARCHAR(5), created_at INTEGER)');
$aDb->query('CREATE TABLE logs (fk_game INTEGER, timestamp INTEGER, uuid VARCHAR(36), data TEXT)');
$aDb->query('CREATE TABLE questionnaires (fk_game INTEGER, timestamp INTEGER, uuid VARCHAR(36), data TEXT)');
$aDb->query('CREATE TABLE games (id PRIMARY KEY, name VARCHAR(100))');
$aDb->query('CREATE INDEX idx_logs_fk_game ON logs (fk_game)');
$aDb->query('CREATE INDEX idx_questionnaire_fk_game ON questionnaires (fk_game)');

$aDb->query('INSERT INTO games (id, name) VALUES (1, \'Tetris\')');
$aDb->query('INSERT INTO games (id, name) VALUES (2, \'Platformer\')');
$aDb->query('INSERT INTO games (id, name) VALUES (3, \'TetrisC\')');
$aDb->query('INSERT INTO games (id, name) VALUES (4, \'PlatformerC\')');

echo 'Ok, database initialized';

?>
