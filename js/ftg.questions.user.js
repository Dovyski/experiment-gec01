/**
 * A a few question for each user of the experiment.
 */

 var FTG = FTG || {};

 FTG.Questions = FTG.Questions || {};

 FTG.Questions.User_EN = [
     {
         text: 'How old are you? (please answer in years)',
         input: true,
     },
     {
         text: 'What is your gender?',
         hide: true,
         options: [
             {value: 1, label: 'Male'},
             {value: 2, label: 'Female'},
             {value: 3, label: 'Other'}
         ]
     },
     {
         text: 'What is the number of hours per week that you had played any type of video game over the last year?',
         hide: true,
         options: [
             {value: 1, label: 'Never'},
             {value: 2, label: '0 to 1'},
             {value: 3, label: '1 to 3'},
             {value: 4, label: '3 to 5'},
             {value: 5, label: '5 to 10'},
             {value: 6, label: 'More than 10'}
         ]
     },
     {
         text: 'How proficient or skilled do you believe you are at playing video games?',
         hide: true,
         options: [
             {value: 1, label: 'No skill'},
             {value: 2, label: 'Not very skilled'},
             {value: 3, label: 'Moderately skilled'},
             {value: 4, label: 'Very skilled'}
         ]
     },
     {
         text: 'How experienced do you believe you are with platform games (e.g. jump/slide game you played)?',
         hide: true,
         options: [
             {value: 1, label: 'No experience'},
             {value: 2, label: 'Not very experienced'},
             {value: 3, label: 'Moderately experienced'},
             {value: 4, label: 'Very experienced'}
         ]
     },
     {
         text: 'How experienced do you believe you are with the game Tetris (e.g. game with squared blocks you played)?',
         hide: true,
         options: [
             {value: 1, label: 'No experience'},
             {value: 2, label: 'Not very experienced'},
             {value: 3, label: 'Moderately experienced'},
             {value: 4, label: 'Very experienced'}
         ]
     },
     {
         text: 'Compared to your regular/usual daily state of mind, how are you feeling today?',
         hide: true,
         options: [
             {value: 1, label: 'Unusually calm and relaxed'},
             {value: 2, label: 'A bit more calm and relaxed than usual'},
             {value: 3, label: 'Normal (calm and/or stressed as usual'},
             {value: 4, label: 'A bit more stressed than usual'},
             {value: 5, label: 'Unusually stressed'}
         ]
     },
     {
         text: 'How familiar are you with the research related to this experiment?',
         hide: true,
         options: [
             {value: 1, label: 'Unfamiliar (e.g. never heard about it)'},
             {value: 2, label: 'Not very familiar (e.g. heard something about it)'},
             {value: 3, label: 'Moderately familiar (e.g. attended a seminar/guest lecture about it)'},
             {value: 4, label: 'Very familiar (e.g. read a scientific paper or text about it)'}
         ]
     },
     {
         text: 'Do you have color blindness?',
         hide: true,
         options: [
             {value: 1, label: 'I do not have any kind of color blindness'},
             {value: 2, label: 'I have a slightly trace of color blindness'},
             {value: 3, label: 'I have a medium trace of color blindness'},
             {value: 4, label: 'I have a severe case of color blindness'}
         ]
     },
 ];

 FTG.Questions.User_PT = [
    {
        text: 'Qual sua idade? (favor responder em anos)',
        input: true,
    },
    {
        text: 'Qual o seu gênero?',
        hide: true,
        options: [
            {value: 1, label: 'Homem'},
            {value: 2, label: 'Mulher'},
            {value: 3, label: 'Outro'}
        ]
    },
    {
        text: 'Qual o número de horas por semana que você jogou qualquer tipo de video game no último ano?',
        hide: true,
        options: [
            {value: 1, label: 'Nenhuma'},
            {value: 2, label: '0 a 1'},
            {value: 3, label: '1 a 3'},
            {value: 4, label: '3 a 5'},
            {value: 5, label: '5 a 10'},
            {value: 6, label: 'Mais de 10'}
        ]
    },
    {
        text: 'O quão proficiente ou habilidoso(a) você acredita ser ao jogar video games?',
        hide: true,
        options: [
            {value: 1, label: 'Sem habilidades'},
            {value: 2, label: 'Não muito habilidoso'},
            {value: 3, label: 'Moderadamente habilidoso'},
            {value: 4, label: 'Muito habilidoso'}
        ]
    },
    {
        text: 'Quão experiente você acredita ser com jogos de plataforma (o jogo de pular/escorregar que você jogou)?',
        hide: true,
        options: [
            {value: 1, label: 'Nenhuma experiência'},
            {value: 2, label: 'Não muito experiente'},
            {value: 3, label: 'Moderadamente experiente'},
            {value: 4, label: 'Muito experiente'}
        ]
    },
    {
        text: 'O quão experiente você acredita ser com o jogo Tetris? (o jogo de blocos quadrados que você jogou)?',
        hide: true,
        options: [
            {value: 1, label: 'Nenhuma experiência'},
            {value: 2, label: 'Não muito experiente'},
            {value: 3, label: 'Moderadamente experiente'},
            {value: 4, label: 'Muito experiente'}
        ]
    },
    {
        text: 'Comparado com sua condição mental normal, como você está se sentindo hoje?',
        hide: true,
        options: [
            {value: 1, label: 'Anormalmente calmo e relaxado'},
            {value: 2, label: 'Mais calmo e relaxado que o normal'},
            {value: 3, label: 'Normal (calmo e/ou estressado como o normal)'},
            {value: 4, label: 'Um pouco mais estressado que o normal'},
            {value: 5, label: 'Anormalmente estressado'}
        ]
    },
    {
        text: 'O quão familiarizado(a) você está com a pesquisa ligada a esse experimento?',
        hide: true,
        options: [
            {value: 1, label: 'Nem um pouco familiar (nunca escutei sobre)'},
            {value: 2, label: 'Não muito familiar (escutei algo sobre)'},
            {value: 3, label: 'Moderadamente familiar (assisti um seminário/vi uma palestra sobre)'},
            {value: 4, label: 'Muito familiar (li um artigo científico/texto sobre)'}
        ]
    },
    {
        text: 'Você tem daltonismo?',
        hide: true,
        options: [
            {value: 1, label: 'Eu não tenho nenhum tipo de daltonismo'},
            {value: 2, label: 'Eu tenho um caso leve de daltonismo'},
            {value: 3, label: 'Eu tenho um caso médio de daltonismo'},
            {value: 4, label: 'Eu tenho um caso grave de daltonismo'}
        ]
    },
];

FTG.Questions.User = {
    en: FTG.Questions.User_EN,
    pt: FTG.Questions.User_PT,
};
