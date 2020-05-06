/**
 * This class controls a gameplay experiment where the player is
 * invited to play all the games, one after another, while
 * some data are collected (facial expressions, etc).
 */

 var FTG = FTG || {};

 FTG.Experiment = function() {
     this.mUid;
     this.mUser;
     this.mCurrentGame;
     this.mRestTime = 1; // in minutes
     this.mDebug;
     this.mFinished;
     this.mData;
     this.mBipSound;
     this.mTanSound;
     this.mCalmSound;

     this.mGames = [
         {id: 1, name: 'tetris', url: '../tetris/', width: 600, height: 900, paddingLeft: 500, cots: false, questions: FTG.Questions.Game, hasRest: true},
         {id: 2, name: 'platformer', url: '../platformer/', width: 1200, height: 900, paddingLeft: 200, cots: false, questions: FTG.Questions.Game, hasRest: true},
         {id: 3, name: 'tetrisc', url: '../tetrisc/', width: 600, height: 900, paddingLeft: 500, cots: false, questions: FTG.Questions.Game, hasRest: true},
         {id: 4, name: 'platformerc', url: '../platformerc/', width: 1200, height: 900, paddingLeft: 200, cots: false, questions: FTG.Questions.Game, hasRest: true},
     ];

     this.mGamesSorting = [
        /* 0 */ [1, 2],
        /* 1 */ [3, 4],
        /* 2 */ [2, 1],
        /* 3 */ [4, 3]
     ];
     this.mSorting;

    // Initialize the whole thing up
    this.init();
 };

// Singleton that will be used by all games
FTG.Experiment.instance = null;

// Methods

FTG.Experiment.prototype.init = function() {
    this.mUid = FTG.Utils.getURLParamByName('uid');
    this.mUser = FTG.Utils.getURLParamByName('user');

    this.mCurrentGame = -1; // TODO: get from URL.
    this.mRestTime = FTG.Utils.getURLParamByName('rest') || this.mRestTime;
    this.mDebug = FTG.Utils.getURLParamByName('debug') == 'true' || FTG.Utils.getURLParamByName('debug') == '1';
    this.mBipSound = document.getElementById('bip');
    this.mTanSound = document.getElementById('tan');
    this.mCalmSound = document.getElementById('calm');
    this.mSorting = this.mUser ? (this.mUser % this.mGamesSorting.length) : 0;
    this.mFinished = false;

    this.mData = new FTG.Collector(this.mDebug);
    this.mRestTime *= 60 * 1000;

    var aInformedSorting = FTG.Utils.getURLParamByName('sorting');

    if(aInformedSorting) {
        this.mSorting = aInformedSorting;
        console.warn('[Experiment] Default sorting was overridden by value informed in the URL (sorting=' + aInformedSorting + ')');
    }

    console.log('[Experiment] Init with user uid:' + this.mUid + ', rest: ' + this.mRestTime + 'ms, sorting: ' + this.mSorting + ' [' + this.mGamesSorting[this.mSorting].join(',') + ']');

    if(this.mUid == null) {
        alert('User id not informed! Append ?uid=DDD to the URL.');
    } else {
        this.greetings();
    }
};

FTG.Experiment.prototype.preventAbruptSessionEnd = function() {
    // Warn the user before leaving the page
    window.addEventListener("beforeunload", function(e) {
        var aMessage = 'You did something that will stop the study before it is over. Please, click "Stay on this Page" to resume your study.';

        e.preventDefault();
        e.returnValue = aMessage;

        return aMessage;
    });

    // Disable mouse right-click (prevent problems during the experiment)
    document.addEventListener('contextmenu', function(theEvent) {
        theEvent.preventDefault();
        return false;
    }, false);

    var aSelf = this;

    $(document).ready(function() {
        $(document).on("keydown", FTG.Utils.preventProblematicKeyboardKey);
    });
};

FTG.Experiment.prototype.enableCalmMusic = function(theStatus) {
    if(theStatus) {
        this.mCalmSound.loop = true;
        this.mCalmSound.currentTime = 0;
        this.mCalmSound.play();
    } else {
        this.mCalmSound.pause();
    }
};

FTG.Experiment.prototype.playBipSound = function() {
    this.mBipSound.currentTime = 0;
    this.mBipSound.play();
};

FTG.Experiment.prototype.playTanSound = function() {
    this.mTanSound.currentTime = 0;
    this.mTanSound.play();
};

FTG.Experiment.prototype.greetings = function() {
    var aSelf = this;

    $('#info').html(
        '<div class="greetings">' +
            '<h1>Instructions</h1>' +
            '<p>User: ' + this.mUid + '</p>' +
            '<p>Welcome! Please wait the researcher let you know when to start.<br/>When you are told to start, click the "Start" button below.<br /><br />Thank you for being part of this research!</p>' +
            '<button id="start">Start</button>' +
        '</div>'
    );

    $('#start').click(function() {
        aSelf.startNewGame();
    });

    aSelf.mData.logMilestone(aSelf.mUid, -1, 'experiment_hr_start');
    aSelf.playBipSound();

    // try to protect the experiment against unintended user actions
    // that will terminate the experiment, e.g. page refresh
    aSelf.preventAbruptSessionEnd();

    // Play the bip sound to indicate everything is set.
    this.playBipSound();
};

FTG.Experiment.prototype.generateGameURL = function(theGameInfo) {
    var aGameParams = '';

    if(theGameInfo.params) {
        for(var aParam in theGameInfo.params) {
            aGameParams += '&' + aParam + '=' + encodeURIComponent(theGameInfo.params[aParam]);
        }
    }

    return theGameInfo.url + '?user=' + this.mUid + '&game=' + theGameInfo.id + '&rand=' + Math.random() + '&debug=' + this.mDebug + aGameParams;
};

FTG.Experiment.prototype.startNewGame = function() {
    var aGame;

    if(this.anyMoreGamesToPlay()) {
        this.mCurrentGame++;
        aGame = this.getCurrentGame();

        console.log('[Experiment] New game about to start: ' + aGame.name + ' (id=' + aGame.id + ')');
        this.playTanSound();
        this.mData.logMilestone(this.mUid, aGame.id, 'experiment_game_start');

        // Add the game iframe and ajust its src property (prevent chache issues)
        $('#info').html('<iframe id="game" style="width: ' + aGame.width + 'px; height: ' + aGame.height + 'px; padding-left: ' + aGame.paddingLeft + 'px;"></iframe>');
        document.getElementById('game').src = this.generateGameURL(aGame);

        if(aGame.instructions) {
            $('#instructions').html(aGame.instructions).show();
        } else {
            $('#instructions').hide();
        }

        if(this.mDebug) {
            var aSelf = this;

            $('#info').append('<button id="conclude">Conclude</button>');
            $('#conclude').click(function() {
                aSelf.concludeCurrentGame();
            });
        }
    } else {
        console.log('[Experiment] No more games to play, finishing now');
        this.finish();
    }
};

FTG.Experiment.prototype.proceedAfterQuestionnaireAnswered = function() {
    var aGame = this.getCurrentGame();

    if(this.anyMoreGamesToPlay()) {
        if(aGame.hasRest) {
            this.rest();
        } else {
            console.log('[Experiment] Concluded game has no rest. Moving on to next game.');
            this.startNewGame();
        }
    } else {
        this.finish();
    }
};

FTG.Experiment.prototype.concludeCurrentQuestionnaire = function(theGameId, theData) {
    var aSelf = this;

    console.log('[Experiment] Sending questionnaire data (game: ' + theGameId + ')', JSON.stringify(theData));

    $.ajax({
        url: '../backend/',
        method: 'POST',
        data: {
            method: 'answer',
            user: this.mUid,
            game: theGameId,
            data: JSON.stringify({t: Date.now(), d: theData})
        },
        dataType: 'json'

    }).done(function(theData) {
        if(theData.success) {
            console.log('[Experiment] Questionnaire data has been saved!');
            aSelf.proceedAfterQuestionnaireAnswered();

        } else {
            console.error('[Experiment] Backend didn\'t like the answers: ' + theData.message);
        }
    }).fail(function(theXHR, theText) {
        // TODO: show some user friendly messages?
        console.error('Something wrong: ' + theXHR.responseText, theXHR, theText);
    });
};

FTG.Experiment.prototype.getGameQuestionsIntro = function(theGameInfo) {
    var aIntro = 'Regarding the game you just played, please answer the questions below.';

    if(('questionsIntro' in theGameInfo) && theGameInfo.questionsIntro.length > 0) {
        aIntro = theGameInfo.questionsIntro;
    }

    return aIntro;
};

FTG.Experiment.prototype.concludeCurrentGame = function() {
    var aGame,
        aQuestions,
        aIntro;

    aGame = this.getCurrentGame();

    console.log('[Experiment] Current game (' + aGame.name + ', id=' + aGame.id + ') was concluded.');
    this.playTanSound();
    this.mData.logMilestone(this.mUid, aGame.id, 'experiment_game_end');

    aIntro = this.getGameQuestionsIntro(aGame);

    $('#instructions').hide();
    $('#info').html(
        '<div class="questionnaire">' +
            '<h2>Questions</h2>' +
            '<p>' + aIntro + '</p>' +
            '<div id="questions" class="questions"></div>' +
        '</div>'
    );

    aQuestions = new FTG.Questionnaire(
        'questions',
        this.mUid,
        aGame.id,
        aGame.questions,
        this.concludeCurrentQuestionnaire,
        this
    );
};

FTG.Experiment.prototype.rest = function() {
    var aFuture = Date.now() + this.mRestTime,
        aSelf = this,
        aId,
        aGame = this.getCurrentGame();

    console.log('[Experiment] Resting for ' + (this.mRestTime/1000) + ' seconds...');
    this.mData.logMilestone(this.mUid, aGame.id, 'experiment_rest_start');

    this.enableCalmMusic(true);
    $('#info').html('<div class="rest-container"><div><h1>Please, relax.</h1><p>Next game will start in a moment...</p></div></div>');

    aId = setInterval(function() {
        var aRemaining = aFuture - Date.now();

        if(aRemaining <= 0) {
            clearInterval(aId);
            aSelf.enableCalmMusic(false);
            aSelf.startNewGame();
        }
    }, 1000);
};

FTG.Experiment.prototype.finish = function() {
    if(this.mFinished) {
        this.sendSubjectHome();
        return;
    }

    console.log('[Experiment] Finishing up. Last chance to ask anything.');
    this.playTanSound();
    this.mData.logMilestone(this.mUid, -1, 'experiment_final_questions_start');

    $('#info').html(
        '<div class="questionnaire">' +
            '<h2>Questions</h2>' +
            '<p>Please tell us a bit about you.</p>' +
            '<div id="questions" class="questions"></div>' +
        '</div>'
    );

    aQuestions = new FTG.Questionnaire(
        'questions',
        this.mUid,
        -1, // no game
        FTG.Questions.User,
        this.concludeCurrentQuestionnaire,
        this
    );

    this.mFinished = true;
};

FTG.Experiment.prototype.sendSubjectHome = function() {
    console.log('[Experiment] The party is over! Last one to leave turn off the lights.');
    $('#info').html('<div class="rest-container"><div><h1>The end!</h1><p>You are good to go. Thank you for helping us help you help us all! :)</p></div></div>');

    this.mData.logMilestone(this.mUid, -1, 'experiment_end');
    this.playBipSound();
};

FTG.Experiment.prototype.getGameById = function(theId) {
    var aGame = null;

    for(var i = 0, aSize = this.mGames.length; i < aSize; i++) {
        if(this.mGames[i].id == theId) {
            aGame = this.mGames[i];
            break;
        }
    }

    return aGame;
};

FTG.Experiment.prototype.getCurrentGame = function() {
    var aSelectedSorting = this.mGamesSorting[this.mSorting];
    var aCurrentGameId = aSelectedSorting[this.mCurrentGame];
    var aCurrentGame = this.getGameById(aCurrentGameId);

    return aCurrentGame;;
};

FTG.Experiment.prototype.anyMoreGamesToPlay = function() {
    return (this.mCurrentGame + 1) < this.mGamesSorting[this.mSorting].length;
};

// Start the party!
$(function() {
    FTG.Experiment.instance = new FTG.Experiment();
});
