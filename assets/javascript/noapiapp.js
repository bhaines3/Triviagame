$( document ).ready(function() {
    
    // game object that holds all questions and answers
        var game = {
            questions: [
            {
                question: "What is the regulation height for a basketball hoop?",
                possibles: ["9 ft", "10 ft", "12 ft", "8 ft"],
                id: 'question-one',
                answer: 1
            }, {
                question: "What city hosted the 2012 Summer Olympics?",
                possibles: ["Paris", "Beijing", "Rio", "Tokyo", "London"],
                id: 'question-two',
                answer: 4
            }, {
                question: "How many soccer players should be on the field at the same time?",
                possibles: ["22", "20", "11", "16", "18"],
                id: 'question-three',
                answer: 0
            }, {
                question: "What NFL Quarterback has been in the most Super Bowls?",
                possibles: ["Joe Montana", "Brett Farve", "Ben Rothlisberger", "Tom Brady", "Troy Aikman"],
                id: 'question-four',
                answer: 3
            }, {
                question: "The Heisman Trophy is presented in which sport?",
                possibles: ["College Baseball", "MLB", "College Basketball", "College Football", "NFL"],
                id: 'question-five',
                answer: 3
            }, {
                question: "What position does Rob Gronkowski play?",
                possibles: ["Wide Receiver", "Safety", "Tight End", "Offensive Line", "Running Back"],
                id: 'question-six',
                answer: 2
    
            }, {
                question: "What is the highest number of games played in a World Series?",
                possibles: ["3", "9", "5", "7", "4"],
                id: 'question-seven',
                answer: 3
            }, {
                question: "Lambeau Field is the home field of which National Football League team?",
                possibles: ["Dolphins", "Packers", "Bears", "Eagles", "Patriots"],
                id: 'question-eight',
                answer: 1
            }, {
                question: "What is the most common type of pitch thrown by pitchers in baseball?",
                possibles: ["Fastball", "Curveball", "Slider", "Knuckleball", "Screwball"],
                id: 'question-nine',
                answer: 0
            }, {
                question: "Which tennis player has won the most men's Grand Slam titles?",
                possibles: ["Andre Agassi", "Pete Sampras", "Roger Federer", "Rafael Nadal", "Bjorn Borg"],
                id: 'question-ten',
                answer: 2
            }, {
                question: "Who is the only athlete ever to play in a Super Bowl and a World Series?",
                possibles: ["Bo Jackson", "Barry Sanders", "DJ Dozier", "Jim Thorpe", "Deion Sanders"],
                id: 'question-eleven',
                answer: 4
            }, {
                question: "What is the real name of the former wrestler turned actor who went by the ring name 'The Rock'?",
                possibles: ["Shawn Robinson", "Dwayne Johnson", "Deion Lewis", "Micheal Johnson", "none of the above"],
                id: 'question-twelve',
                answer: 1
            }
            ]}
    
        // test
        var message = "You Finished!!";
          // Timer 
          var number = 100;
    
    // This initializes the button that starts the game 
        $(".startGame").on("click", function (){
    // when the start button clicked, the div with the questions that was hidden is shown
            $(".card-body").show();
            buildQuestions();
            // Execute the run function.
            run();
            $("#timeLeft").html("<h2>" + number + " seconds" + "</h2>");
    
            $(this).hide();
        });
    
        // Timer 
        $("#timeLeft").on("click", run); //come back to this is a min
    
        // This function enables the number of seconds to decrease with time, and to display
        // the result of that decrease until time is up. 
        function decrement(){
            // Decrease number by one.
            number--;
            // Show the number in the #timeLeft div.
            $("#timeLeft").html("<h2>" + number + " seconds" + "</h2>");
            // When the number is equal to zero, 
            if (number === 0){
            // run the stop function.
            stop();
            $("#message").html("times up!");
            checkAnswers();
            }
        }
    
        function run(){
            counter = setInterval(decrement, 1000);
        }
        
        // The stop function
        function stop(){
        // Clears our "counter" interval. The interval name is passed to the clearInterval function.
            clearInterval(counter);
        }
     
    function formTemplate(data) {

        var qString = "<form id='questionOne'>"+ data.question +"<br>";
    // this variable to access the question object's answers array needed to answer each question
        var possibles = data.possibles;
    // a for loop to go through the answers array for each question to add the values of each answer
    // array and using qString, add them as radio buttons to the question to which they are
    // associated
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='"+ data.id +"' value=" + i + " > " + possible + "  ";
    
        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
    // this function takes the template created in the last function and by appending it,
    // allows it to be displayed on the page
    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $("#questions-container").append(questionHTML);
    
    }
    
    // function that 
    function isCorrect(question){
        var answers = $("[name=" + question.id + "]");
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(":checked");
        return isChecked;
    }
    
    // call the buildQuestions function
    
    // function to build the display of guesser results
    function resultsTemplate(question){
        var htmlBlock = "<div>"
        htmlBlock = htmlBlock + question.question + ": " + isChecked;
        return htmlBlock + "</div>";
    }
    
    // function to tabulate the guesser results
    function checkAnswers (){
    
    // variables needed to hold results
        var resultsHTML = "";
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0;
    
    // for loop iterates through each question and passes the questions at each index first into
    // the isCorrect function to see if they match the indices of correct answers, and if they do,
    // increments up the correct score
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
    // then this statement runs the questions at each index through the checkAnswered function
    // to determine whether the user clicked an answer, or did not click an answer, so that
    // incorrect and unAnswered scores can be delineated from each other
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }
    // display the results of the function in the results div and use strings of text to relate the
    // results of the for loop with their corresponding values
        $(".results").html("correct: " + correct+ "<br>" + "incorrect: " + incorrect+ "<br>" + "unanswered: " + unAnswered);
    }
    
    // this function checks whether the guesser actually checked an answer for each of the 
    // questions
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $("[name=" + question.id + "]");
    // the for loop creates a condition to check if the buttons were checked and and then sets
    // the anyAnswered variable to true if they were
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
    // then return the anyAnswered variable so it can be tabulated in the last function to distinguish
    // between incorrect answers and those answers that were not attempted
        return anyAnswered;
    
    }
    
    // create a function with an onclick event for the doneButton that both checks the Answers 
    // and stops the clock when "done" button is pressed
        $("#doneButton").on("click", function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("You Finished!!");
        })
    });