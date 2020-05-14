/**
 * A set of question to be used after each game in an experiment.
 */

 var FTG = FTG || {};

 FTG.Questions = FTG.Questions || {};

 FTG.Questions.Game_EN = [
     {
         text: 'On a scale from 1 to 5, how <em>bored</em> did you feel at the <em>beginning</em> of the game?',
         options: [
             {value: 1, label: '(Not bored at all)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremely bored)'}
         ]
     },
     {
         text: 'On a scale from 1 to 5, how <em>stressed</em> did you feel at the <em>beginning</em> of the game?',
         options: [
             {value: 1, label: '(Not stressed at all)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremely stressed)'}
         ]
     },
     {
         text: 'On a scale from 1 to 5, how <em>bored</em> did you feel at the <em>end</em> of the game?',
         options: [
             {value: 1, label: '(Not bored at all)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremely bored)'}
         ]
     },
     {
         text: 'On a scale from 1 to 5, how <em>stressed</em> did you feel at the <em>end</em> of the game?',
         options: [
             {value: 1, label: '(Not stressed at all)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremely stressed)'}
         ]
     },
     {
         text: 'Did you understand how to play the game properly?',
         hide: true,
         options: [
             {value: 2, label: 'Yes'},
             {value: 1, label: 'Yes, but I was a bit confused'},
             {value: 0, label: 'No'}
         ]
     },
     {
        text: 'Adjust the sliders below to best describe how you felt at the <em>beginning</em> of the game:',
        slider: true,
        labels: {
            arousal:'Level of arousal',
            pleasure: 'Level of pleasure'
        },
    },
    {
        text: 'Adjust the sliders below to best describe how you felt at the <em>end</em> of the game:',
        slider: true,
        labels: {
            arousal:'Level of arousal',
            pleasure: 'Level of pleasure'
        },
    },
 ];

 FTG.Questions.Game_PT = [
     {
         text: 'Em uma escala de 1 a 5, o quão <em>entediado</em> você se sentiu no <em>começo</em> do jogo?',
         options: [
             {value: 1, label: '(Nem um pouco entediado)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremamente entediado)'}
         ]
     },
     {
         text: 'Em uma escala de 1 a 5, o quão <em>estressado</em> você se sentiu no <em>começo</em> do jogo?',
         options: [
             {value: 1, label: '(Nem um pouco estressado)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremamente estressado)'}
         ]
     },
     {
         text: 'Em uma escala de 1 a 5, o quão <em>entediado</em> você se sentiu ao <em>final</em> do jogo?',
         options: [
             {value: 1, label: '(Nem um pouco entediado)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremamente entediado)'}
         ]
     },
     {
         text: 'Em uma escala de 1 a 5, o quão <em>estressado</em> você se sentiu ao <em>final</em> do jogo?',
         options: [
             {value: 1, label: '(Nem um pouco estressado)'},
             {value: 2, label: ''},
             {value: 3, label: ''},
             {value: 4, label: ''},
             {value: 5, label: '(Extremamente estressado)'}
         ]
     },
     {
         text: 'Você entendeu como jogar o jogo devidamente?',
         hide: true,
         options: [
             {value: 2, label: 'Sim'},
             {value: 1, label: 'Sim, mas foi um pouco confuso'},
             {value: 0, label: 'Não'}
         ]
     },
     {
        text: 'Ajuste as barrinhas abaixo para demonstrar da melhor forma como você se sentiu no <em>começo</em> do jogo:',
        slider: true,
        labels: {
            arousal:'Level of arousal',
            pleasure: 'Level of pleasure'
        },
    },
    {
        text: 'Ajuste as barrinhas abaixo para demonstrar da melhor forma como você se sentiu no <em>final</em> do jogo:',
        slider: true,
        labels: {
            arousal:'Level of arousal',
            pleasure: 'Level of pleasure'
        },
    },
 ];

FTG.Questions.Game = {
    en: FTG.Questions.Game_EN,
    pt: FTG.Questions.Game_PT,
};
