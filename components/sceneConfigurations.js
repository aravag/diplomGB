import { images } from "./imagePreloader.js";

export const sceneConfigurations = (userName, chars) => [
    {
        background: images.bg.bg1,
        dialogues: [
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [
                    `Здравствуй, ${userName}! Я - Бабушка и у меня беда: книжка упала и все герои перемешались! Я уже старенькая и самой мне их не собрать. Поможешь мне это сделать? Тогда в путь!`,
                ],
                btns: ["Приятно познакомиться! В путь!", "Поехали!"],
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [
                    `Знаешь, ${userName}, в русских сказках всегда присутствует волшебство и удивительные существа. Например, Иван-Царевич должен был сразиться с Драконом, чтобы спасти прекрасную царевну, но по итогу просто подружился с ним.`,
                ],
                btns: ["Ого, как интересно", "Лучше бы сразился с драконом"],
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [
                    "Сказочные персонажи могут быть такими разными, от смешных до загадочных. Мы встретим их и восстановим сказочное равновесие. Давай посмотрим, что нас ждёт в этом волшебном путешествии.",
                ],
                btns: ["Далее..."],
            },
            {
                dialogue: ["Кто из героев сказки тянул репку после Жучки?"],
                btns: ["Кошка", "Внучка", "Мышка"],
                isTestBtns: true,
                actionImage: images.action.actionImage1,
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [`Молодец, ${userName}! Начинает получаться. Так же, как и в сказке 'Репка', мы помогаем друг другу! Идём дальше?`],
                btns: ["Да!", "А у меня есть выбор?"],
            },
            {
                dialogue: ["Сивка-Бурка - это...?"],
                btns: ["Корова", "Конь", "Бык", "Курица"],
                isTestBtns: true,
                actionImage: images.action.actionImage2,
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Отлично! Интересный факт: все знают нашу сказку 'Волк и семеро козлят'. А у румынов есть свой аналог 'Коза и три козленка'."],
                btns: ["Далее..."],
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["И когда Россия и Румыния снимали совместно фильм-сказку 'Мама' по мотивам этой сказки, то взяли среднее количество козлят, то есть пять!"],
                btns: ["Как интересно!", "Ясно..."],
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Посмотри: впереди девочка. Ей нужна помощь. Давай скорей поможем ей!"],
                btns: ["Давай!", "Что с ней случилось?"],
            },
            {
                dialogue: ["Кто обижает добрую девочку-сироту в сказке «Морозко»?"],
                btns: ["Злая мачеха", "Баба-Яга", "Змей Горыныч"],
                isTestBtns: true,
                actionImage: images.action.actionImage3,
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Обижать людей нехорошо. Надеюсь, ты не обижаешь никого?"],
                btns: ["Стараюсь этого не делать", "Иногда могу ненароком кого-нибудь обидеть"],
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Ладно, нет времени останавливаться. Смотри, а что это за странный дом впереди?"],
                btns: ["Где?", "Давайте посмотрим..."],
            },
            {
                dialogue: ["На каких ножках стоит дом Бабы-Яги?"],
                btns: ["На деревянных", "На курьих", "На железных", "На бетонных"],
                isTestBtns: true,
                actionImage: images.action.actionImage4,
            },
            {
                char: { 
                    image: chars.char1,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    image: images.storytellers.storyteller1,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Прекрасно! Это был вопрос с подвохом! Ведь в данный момент дом не стоит, поэтому по фото и не скажешь, какие у него ножки."],
                btns: ["Далее..."],
            },
            {
                char: { image: chars.char1 },
                storyteller: { name: "Бабушка", image: images.storytellers.storyteller1 },
                dialogue: ["Что-то я немного устала, пойду прилягу. Сейчас к тебе подойдет мой помощник, собери вместе с ним оставшиеся страницы, пожалуйста!"],
                btns: ["Поправляйтесь, бабушка!", "Хорошо..."],
            },
        ],
    },
    {
        background: images.bg.bg1,
        dialogues: [
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [
                    `Мур-мяу, ну, что ж, приятно познакомиться, ${userName}! Я - Кот учёный, бабушкин друг. Она попросила тебя сопроводить в этом нелегком путешествии! Пойдём покажу, что ещё в книге нужно расставить по местам.`,
                ],
                btns: ["И мне приятно познакомиться!", "Пойдем!"],
            },
            {
                dialogue: ["Имя царя, у которого Иван-царевич украл Жар-птицу?"],
                btns: ["Николай", "Салтан", "Афрон", "Алексей", "Добрыня"],
                isTestBtns: true,
                actionImage: images.action.actionImage5,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Так вот, как его звали! А я думал иначе. Теперь-то буду знать!"],
                btns: ["Далее..."],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Кто это у нас тут отдыхает, давай-ка узнаем."],
                btns: ["Хорошо...", "Пусть отдыхает..."],
            },
            {
                dialogue: ["Какое самое любимое место Иванушки-дурачка для сна и отдыха?"],
                btns: ["Кровать", "Печь", "Пол", "Парк"],
                isTestBtns: true,
                actionImage: images.action.actionImage6,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Надёюсь мы не ошиблись, пойдём дальше."],
                btns: ["Далее..."],
            },
            {
                dialogue: ["Кто разбил золотое яичко?"],
                isTestBtns: true,
                btns: ["Дед", "Мышка", "Баба", "Курица"],
                actionImage: images.action.actionImage7,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [`Так держать, ${userName}, не сбавляем темп! Мур-мяу.`],
                btns: ["Далее..."],
            },
            {
                dialogue: ["Избушку какого героя заняла коза-дереза?"],
                isTestBtns: true,
                btns: ["Зайчика", "Медведя", "Лисы"],
                actionImage: images.action.actionImage8,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: [`Ну, как тебе, ${userName}? Не слишком сложно? Всё получится, нужно помочь ещё паре героев, вперёд.`],
                btns: ["Проще простого", "Вроде, не слишком сложно", "Местами трудновато, но я справлюсь"],
            },
            {
                dialogue: ["Иванушка стал козленочком, когда выпил воду из козьего копытца. А как он снова стал мальчиком?"],
                isTestBtns: true,
                btns: ["Три раза перекувыркнулся через голову", "Выпил волшебной воды", "Искупался в чистой реке"],
                actionImage: images.action.actionImage9,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Что ж, думаю мы на правильном пути!"],
                btns: ["Далее..."],
            },
            {
                dialogue: ["Птицы, которые унесли братца, в то время как сестрица загулялась-заигралась, были ...?"],
                isTestBtns: true,
                btns: ["Сороки-вороны", "Утки-крякушки", "Гуси-лебеди"],
                actionImage: images.action.actionImage10,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Идем в хорошем темпе! Слышишь, кто-то что-то кричит."],
                btns: ["Далее..."],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Бабушка", 
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Кот!!! Я нашла страницу, заберешь?"],
                btns: ["Далее..."],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Посмотри, что случилось с лисой и петушком!"],
                btns: ["Далее..."],
            },
            {
                dialogue: ["Что предлагала лиса петушку, чтобы он выглянул в окошко?"],
                isTestBtns: true,
                btns: ["Молочко", "Зернышко", "Горошек"],
                actionImage: images.action.actionImage11,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Вот оно что! Продолжим?"],
                btns: ["Да...", "Да!", "Да!!!"],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Больше оптимизма! Осталось чуть-чуть!"],
                btns: ["Хорошо..."],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Отвлеку тебя немного интересным фактом! Ты заешь сказку 'Муха-Цокотуха'? Мало кто знает, что такое цокатуха? Слово 'цокотуха' просто-напросто означает 'болтушка'."],
                btns: ["Далее..."],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Смотри, еще страница! Т-там собака??? Мне страшно!!!"],
                btns: ["Не бойся!", "Все будет хорошо!"],
            },
            {
                dialogue: ["Что в сказке «Иван-царевич и серый волк» называется «живой» и «мертвой»"],
                isTestBtns: true,
                btns: ["Земля", "Трава", "Вода"],
                actionImage: images.action.actionImage12,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Фух! Я перепугался... Лихо ты справляешься с задачами!"],
                btns: ["Спасибо!", "Стараюсь."],
            },
            {
                dialogue: ["Какой продукт лиса размазала по тарелке и подала журавлю в сказке «Лиса и журавль»?"],
                isTestBtns: true,
                btns: ["Суп", "Кашу", "Оладушек", "Пюре"],
                actionImage: images.action.actionImage13,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Интересно-интересно, кажется я становлюсь ещё умнее, хотя куда уж больше."],
                btns: ["Далее..."],
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Смотри, тут какой-то поломанный дом."],
                btns: ["Далее..."],
            },
            {
                dialogue: ["Кто сломал теремок в сказке «Теремок»?"],
                isTestBtns: true,
                btns: ["Чудо-юдо", "Волк", "Медведь"],
                actionImage: images.action.actionImage14,
            },
            {
                char: { 
                    image: chars.char2,
                    position: {
                        left: false,
                        offset: '2'
                    }
                },
                storyteller: { 
                    name: "Кот ученый", 
                    image: images.storytellers.storyteller2,
                    position: {
                        left: true,
                        offset: '2'
                    }
                },
                dialogue: ["Молодец, мы очень ценим твою помощь, пришло время узнать результат."],
                btns: ["Результат"],
            },
        ],
    },
];
