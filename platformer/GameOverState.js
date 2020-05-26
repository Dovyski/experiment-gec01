/**
 * Game over screen
 */

var GameOverState = function() {
	this.mBackBtn = null;
	this.mBackLabel = null;
	this.mTitle = null;
	this.mText = null;
	this.mDialog = null;

	this.create = function() {
        var aLocale = GlobalInfo.locale || 'en';
        var aTranslation = {
            gameOver: {en: 'Game over', pt: 'Game over'},
            yourScore: {en: 'Score', pt: 'Pontuação'},
            continue: {en: 'Continue', pt: 'Continuar'}
        };
        
		this.mDialog		= Game.add.sprite(Game.world.centerX - 130, Game.world.centerY - 80, 'dialog-small');

		this.mTitle			= Game.add.text(this.mDialog.x + 10, this.mDialog.y + 5, aTranslation.gameOver[aLocale], {fontSize: 16, fill: '#fff', align: 'center'});
		this.mText			= Game.add.text(this.mDialog.x + 40, this.mDialog.y + 40, aTranslation.yourScore[aLocale] + ':\n' + (GlobalInfo.score.collectable + GlobalInfo.score.overcome), {fontSize: 32, fill: '#000', align: 'center'});

		this.mBackBtn 		= Game.add.button(this.mDialog.x + 35, this.mDialog.y + this.mDialog.height - 60, 'blue-button', this.onBack, this, 0, 1, 2);
		this.mBackLabel 	= Game.add.text(this.mBackBtn.x + 50, this.mBackBtn.y + 7, aTranslation.continue[aLocale], {fill: '#000', fontSize: 24});

		GlobalInfo.data.logMilestone(GlobalInfo.user, GlobalInfo.game, 'game_end');
	};

	this.onBack = function() {
		if(GlobalInfo.experiment) {
			GlobalInfo.experiment.concludeCurrentGame();

		} else {
			Game.state.start('menu');
		}
	};
};
