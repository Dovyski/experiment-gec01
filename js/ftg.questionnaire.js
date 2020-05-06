/**
 * This class implements a questionnaire.
 */

 var FTG = FTG || {};

 FTG.Questionnaire = function(theContainerId, theUserId, theGameId, theQuestions, theDoneCallback, theCallbackContext) {
     this.mContainerId = theContainerId;
     this.mUserId = theUserId;
     this.mGameId = theGameId;
     this.mDoneCallback = theDoneCallback;
     this.mCallbackContext = theCallbackContext || this;
     this.mQuestions = theQuestions;

     this.init();
 };

// Methods

FTG.Questionnaire.prototype.init = function() {
    var aSelf = this;

    $('#' + this.mContainerId).append('<div id="ftg-questionnaire">' + this.render() + '<button id="ftg-btn-submit">'+FTG.Utils.text('submit')+'</button></div>');

    $('#ftg-btn-submit').click(function() {
        aSelf.finish();
    });
};

FTG.Questionnaire.prototype.render = function() {
    var i,
        j,
        aId,
        aQuestion,
        aContent = '';

    for(i = 0; i < this.mQuestions.length; i++) {
        aQuestion = this.mQuestions[i];
        aContent += '<div class="question"><p id="q' + i + '">' + (i + 1) + ') ' + aQuestion.text + '</p>';

        if(aQuestion.options) {
            for(j = 0; j < aQuestion.options.length; j++) {
                aId = 'id' + i + j;
                aContent +=
                    '<input type="radio" name="a' + i + '" value="' + aQuestion.options[j].value + '" id="' + aId + '"/> ' +
                    '<label for="' + aId + '">' + (aQuestion.hide ? '' : aQuestion.options[j].value + ' ') + aQuestion.options[j].label + '</label>';
            }
        } else if(aQuestion.input) {
            aContent += '<input type="text" name="t' + i + '" value="" />';

        } else if(aQuestion.slider) {
            aContent += '<form class="AffectiveSlider"><div id="AffectiveSlider" style="width: 100%;">' + this.getASSlider('s' + i, aQuestion.labels) + '</div></form>';
        }

        aContent += '</div>';
    }

    return aContent;
};

// Source: https://github.com/albertobeta/AffectiveSlider
FTG.Questionnaire.prototype.getASSlider = function(thePrefix, theLabels) {
    var arousal_part = theLabels.arousal + ' \n<div class="arousal"> \n<object class="arousal_svg" type="image/svg+xml" data="images/AS_sleepy.svg"></object> \n<input type="range" name="' + thePrefix + 'a" id="' + thePrefix + 'a" value=".5" min="0" max="1" step=".01" /> \n<object class="arousal_svg" type="image/svg+xml" data="images/AS_wideawake.svg"></object> \n<object class="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object></div>';
	var pleasure_part = theLabels.pleasure + ' \n<div class="pleasure"> \n<object class="arousal_svg" type="image/svg+xml" data="images/AS_unhappy.svg"></object> \n<input type="range" name="' + thePrefix + 'p" id="' + thePrefix + 'p" value=".5" min="0" max="1" step=".01" /> \n<object class="arousal_svg" type="image/svg+xml" data="images/AS_happy.svg"></object> \n<object class="intensity_cue_svg" type="image/svg+xml" data="images/AS_intensity_cue.svg"></object> \n</div>';

	return arousal_part + pleasure_part;
};

FTG.Questionnaire.prototype.finish = function() {
    var aData = [],
        i,
        aQuestion,
        aAnswer,
        aLabel,
        aItem,
        aAnswered = 0;

    for(i = 0; i < this.mQuestions.length; i++) {
        aQuestion = this.mQuestions[i];
        aLabel = '';

        $('#q' + i).removeClass('error');

        if(aQuestion.options) {
            aItem = $('#ftg-questionnaire input:radio[name="a' + i + '"]:checked');
            aAnswer = aItem.val();
            aLabel = $('label[for="' + aItem.attr('id') + '"]').text();

        } else if(aQuestion.input) {
            aAnswer = $('#ftg-questionnaire input:text[name="t' + i + '"]').val();
            
        } else if(aQuestion.slider) {
            var aArousal = $('#ftg-questionnaire input[name="s' + i + 'a"]').val();
            var aPleasure = $('#ftg-questionnaire input[name="s' + i + 'p"]').val();
            aAnswer = aArousal + '|' + aPleasure;
            aLabel = 'a|p';
        }

        if(aAnswer && aAnswer != '') {
            aData.push({q: $('#q' + i).html(), a: aAnswer, al: aLabel});

        } else {
            $('#q' + i).addClass('error').fadeOut('fast').fadeIn();
        }
    }

    if(aData.length == this.mQuestions.length) {
        this.mDoneCallback.call(this.mCallbackContext, this.mGameId, aData);
    }
};
