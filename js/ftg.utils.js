/**
 * A set of useful utilities.
 */

var FTG = FTG || {};

FTG.Utils = function() {
};

FTG.Utils.getURLParamByName = function(theName) {
	var aRegex;

    theName = theName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    aRegex = new RegExp('[\\?&]' + theName + '=([^&#]*)'),
    aResults = aRegex.exec(location.search);

    return aResults === null ? null : decodeURIComponent(aResults[1].replace(/\+/g, ' '));
};

FTG.Utils.preventProblematicKeyboardKey = function(theKeyEvent) {
    var aKey = theKeyEvent.which || theKeyEvent.keyCode;

    var aIsRefresh = aKey == 116 || (aKey == 82 && theKeyEvent.ctrlKey);
    var aIsTabFocus = aKey == 9;
    var aIsFSomething = aKey >= 112 && aKey <= 123;
	var aIsCtrl = aKey == 17 || (aKey == 83 && theKeyEvent.ctrlKey);
    var aIsAltRelated = aKey == 17 || aKey == 18 || (aKey == 36 && theKeyEvent.altKey); // apparently Alt+Home takes you to the browser's default/home page.

    if (aIsRefresh || aIsTabFocus || aIsFSomething || aIsCtrl || aIsAltRelated) {
        theKeyEvent.preventDefault();
    }
};

FTG.Utils.defineLocale = function(theAvailableLocales) {
    var aLocale = FTG.Utils.getURLParamByName('locale');

    if(aLocale == null) {
        return theAvailableLocales[0];
    }

    if(theAvailableLocales.indexOf(aLocale) == -1) {
        return theAvailableLocales[0];
    }

    FTG.Utils.locale = aLocale;

    return aLocale;
};

FTG.Utils.text = function(key, locale) {
    var locale = locale || FTG.Utils.locale;
    var texts = {
        submit: {en: 'Submit', pt: 'Enviar'},
        beforeunload: {
            en: 'You did something that will stop the study before it is over. Please, click "Stay on this Page" to resume your study.',
            pt: 'pt You did something that will stop the study before it is over. Please, click "Stay on this Page" to resume your study.',
        },
        submit: {en: 'Submit', pt: 'Enviar'},
        instructions: {en: 'Instructions', pt: 'Instruções'},
        user: {en: 'User', pt: 'Usuário'},
        welcomeInstructions: {
            en: 'Welcome! Please wait the researcher let you know when to start.<br/>When you are told to start, click the "Start" button below.<br /><br />Thank you for being part of this research!',
            pt: 'pt Welcome! Please wait the researcher let you know when to start.<br/>When you are told to start, click the "Start" button below.<br /><br />Thank you for being part of this research!'
        },
        start: {en: 'Start', pt: 'Iniciar'},
        conclude: {en: 'Conclude', pt: 'Concluir'},
        pleaseAnswer: {
            en: 'Regarding the game you just played, please answer the questions below.',
            pt: 'PT Regarding the game you just played, please answer the questions below.'
        },
        questions: {en: 'Questions', pt: 'Questões'},
        relax: {en: 'Please, relax.', pt: 'Por favor, relaxe.'},
        nextGameSoon: {
            en: 'Next game will start in a moment...',
            pt: 'O próximo jogo começará em um instante...'
        },
        aboutYou: {
            en: 'Please tell us a bit about you.',
            pt: 'Por favor, nos diga um pouco sobre você.'
        },
        end: {en: 'The end!', pt: 'Fim!'},
        endMessage: {
            en: 'You are good to go. Thank you for helping us help you help us all! :)',
            pt: 'PT You are good to go. Thank you for helping us help you help us all! :)'
        },
    };

    if(!texts[key]) {
        return 'XX';
    }

    return texts[key][locale] || '??';
}

// Polyfill for older browsers...
if (!Date.now) {
	Date.now = function now() {
		return new Date().getTime();
	};
}
