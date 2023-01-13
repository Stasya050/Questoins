const option1 = document.querySelector('.option1'),
 option2 = document.querySelector('.option2'),
 option3 = document.querySelector('.option3'),
 option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
	  numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
	indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let score = 0;


const questions = [
    //1
	  	{
			question: 'What is the capital of France?',
			options:  [
					'New York',
					'London',
                    'Paris',
                    'Dublin',
			],
			rightAnswer: 2
		},
    //2
		{
			question: 'What is the longest river in the world?',
            options: [
                  'Nile',
                  'Amazon',
                  'Yangtze',
                  'Mississippi',
            ],
            rightAnswer: 1
		},
    //3
		{
            question: 'What is the capital of Canada?',
            options: [
                  'Toronto',
                  'Ottawa',
                  'Vancouver',
                  'Edmonton',
            ],
            rightAnswer: 1
      	},
    //4
    {
            question: 'Which of these characters are friends with Harry Potter?',
            options: [
                  'Ron Weasley',
                  'Draco Malfoy',
                  'Hermione Granger',
                  'Hagrid',
            ],
            rightAnswer: 0
      	},
    //5
     {
            question: 'What is the Jewish New Year called?',
            options: [
                  'Hanukkah',
                  'Yom Kippur',
                  'Kwanzaa',
                'Rosh Hashanah',
                  
            ],
            rightAnswer: 3
      	},
    //6
    
     {
            question: ' How many planets are in the solar system?',
            options: [
                  '8',
                  '9',
                  '10',
                  '2',
                  
            ],
            rightAnswer: 1
      	}, 
    
       
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
   

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false;

	if (indexOfPage == questions.length) {
		quizOver()
	} else {
		if (completedAnswers.length > 0) {
				completedAnswers.forEach(item => {
					if(item == randomNumber) {
						hitDuplicate = true;
					};
			});
			if (hitDuplicate) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			};
		};
		
		if (completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		};
	};
	completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
	if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	};
	disabledOptions();
};

for(option of optionElements) {
	option.addEventListener('click', e => checkAnswer(e));
};

const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
			item.classList.add('correct');
		};
	});
};

const enableOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	});
};

const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	});
};

const updateAnswerTracker = (status) => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
	if(!optionElements[0].classList.contains('disabled')) {
		alert('Выберите один из вариантов ответов');
	} else {
		randomQuestion();
		enableOptions();
	};
};


btnNext.addEventListener('click', () => {
	validate();
});

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
});