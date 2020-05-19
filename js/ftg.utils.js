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
            pt: 'Você fez algo que interromperá o estudo antes que ele termine. Por favor, clique em "Permanecer nesta página" para retomar seu estudo.',
        },
        submit: {en: 'Submit', pt: 'Enviar'},
        instructions: {en: 'Instructions', pt: 'Instruções'},
        user: {en: 'User', pt: 'Usuário'},
        welcomeInstructions: {
            en:
                'Before you begin, please, observe the following:<br/><br />' + 
                '<img src="images/technology.svg" class="guidance" /> Turn off or put your mobile device on airplain mode. <br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Play the games, answer the questionnaire after each game and rest as instructed on the screen.<br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Don\'t give up in the middle of the games (play them until the end).<br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Remain seated during the whole process.<br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Your gaming performance is not being analyzed.<br /><br />',
            pt: 
                'Antes de começar, por favor, preste atenção no seguinte:<br/><br />' + 
                '<img src="images/technology.svg" class="guidance" /> Deslige ou coloque seu celular em modo avião. <br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Jogue os jogos, responda o questionário após cada jogo e descanse conforme instruído na tela.<br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Não desista no meio dos jogos (jogue-os até o final).<br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Permaneça sentado(a) durante todo o processo.<br /><br />' +
                '<img src="images/info.svg" class="guidance" /> Seu desempenho nos jogos não está sendo analizado.<br /><br />'
        },
        start: {en: 'Start', pt: 'Iniciar'},
        conclude: {en: 'Conclude', pt: 'Concluir'},
        pleaseAnswer: {
            en: 'Regarding the game you just played, please answer the questions below.',
            pt: 'Em relação ao jogo que você recém jogou, por favor responda o questionário abaixo.'
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
            pt: 'Você está liberado. Obrigado por nos ajudar a ajudar você a ajudar todos nós! :)'
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
