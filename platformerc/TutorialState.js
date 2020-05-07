/**
 * Teaches about controls and stuff.
 */

TutorialState = function() {
	var mFigure,
		mTextClick,
        mTitle,
        mTextInstructionDash,
        mTextInstructionDashKey,
        mTextInstructionJump,
        mTextInstructionJumpKey;

	this.create = function() {
        var aLocale = GlobalInfo.locale || 'en';
        var aTranslation = {
            clickContinue: {en: 'Click anywhere to continue', pt: 'Clique em qualquer lugar para continuar'},
            instructions: {en: 'Instructions', pt: 'Instruções'},
            instructionDashKey: {en: '', pt: '(SEGURE) S'},
            instructionDash: {en: '', pt: 'para deslizar sob obstátuculos'},
            instructionJumpKey: {en: '', pt: 'SETA PARA CIMA'},
            instructionJump: {en: '', pt: 'para pular sobre obstáculos'},
        }

		this.game.stage.backgroundColor = '#5FCDE4';

		mFigure = this.game.add.sprite(0, 0, 'tutorial');
		mTextClick = this.game.add.text(this.game.world.centerX, this.game.world.height - 150, aTranslation.clickContinue[aLocale], { font: "26px Arial", fill: "#ffffff", align: "center" });
        mTitle = this.game.add.text(this.game.world.centerX, 50, aTranslation.instructions[aLocale], { font: "Bold 40px Arial", fill: "#000", align: "center" });
        
        mTextInstructionDash = this.game.add.text(205, 210, aTranslation.instructionDash[aLocale], { font: "22px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3, backgroundColor: '#26C9FF', align: "left" });
        mTextInstructionDashKey = this.game.add.text(205, 170, aTranslation.instructionDashKey[aLocale], { font: "30px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3, backgroundColor: '#26C9FF', align: "left" });

        mTextInstructionJump = this.game.add.text(690, 210, aTranslation.instructionJump[aLocale], { font: "22px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3, backgroundColor: '#26C9FF', align: "left" });
        mTextInstructionJumpKey = this.game.add.text(690, 170, aTranslation.instructionJumpKey[aLocale], { font: "30px Arial", fill: "#ffffff", stroke: '#000000', strokeThickness: 3, backgroundColor: '#26C9FF', align: "left" });

		mTextClick.anchor.setTo(0.5);
		mTitle.anchor.setTo(0.5);

		this.game.add.tween(mTextClick).to({alpha: 0.4}, 300, Phaser.Easing.Linear.None, true, 0, -1, true).start();
	};

	this.update = function() {
		if(this.game.input.activePointer.isDown) {
			GlobalInfo.data.logMilestone(GlobalInfo.user, GlobalInfo.game, 'game_start');
			this.game.state.start('play');
		}
	};
};
