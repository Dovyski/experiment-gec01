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
         text: 'Which part of the game would <em>best</em> describe the moment you enjoyed the most (e.g. had more fun)?',
         options: [
             {value: 1, label: '(Very beginning)'},
             {value: 2, label: '(After beginning and before middle)'},
             {value: 3, label: '(Middle)'},
             {value: 4, label: '(After middle and before end)'},
             {value: 5, label: '(Very end)'}
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
        text: 'Slide Did you understand how to play the game properly?',
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
         text: 'Qual parte do jogo <em>melhor</em> descreve o momento em que você se divertiu mais?',
         options: [
             {value: 1, label: '(Bem no início)'},
             {value: 2, label: '(Depois do início e antes da metade)'},
             {value: 3, label: '(O meio)'},
             {value: 4, label: '(Depois da metade e antes do final)'},
             {value: 5, label: '(Bem no final)'}
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
        text: 'Slide Você entendeu como jogar o jogo devidamente?',
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
