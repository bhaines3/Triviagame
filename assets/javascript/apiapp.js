$( document ).ready(function() {
    
    // game object that holds all questions and answers
        var game = {
            questions: []
          }
    //added api
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple",
        method: "GET"
    }).done(function (response) {
      console.log(response.results, " this is the ajax response")
      //an array of 3 incorrect answers
      //one key value pair of the correct answer
      //take the 3 incorrect and correct and stor them into an possibles property on an obj wich will be an array
      for(var i = 0; i < response.results.length; i++) {
        //loop over each response object
        //generate an object to stor our array\
        var formatArray = []
        var obj = {};
        
        //push that formated object into our array after we format it
        formatArray.push(response.results[i].correct_answer)
        for (var j = 0; j < response.results[i].incorrect_answers.length; j++){
          formatArray.push(response.results[i].incorrect_answers[j])
        }
        formatArray = shuffle(formatArray);
        console.log(formatArray.indexOf(response.results[i].correct_answer), "this is our index of");
        if (formatArray.indexOf(response.results[i].correct_answer) !== -1) {
          obj.answer = formatArray.indexOf(response.results[i].correct_answer)
        }
        obj.question = response.results[i].question;
        obj.id = "question-" + i
        obj.possibles = formatArray;
        game.questions.push(obj)
      }
    // Got this code from Stack Overflow to randomize array answers 
      function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue; 
        var randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
    })
        // test
        var message = "You Finished!!";
        // var $message = $('#message');
        // test
    
    // This initializes the button that starts the game 
        $(".startGame").on("click", function (){
    // when the start button clicked, the div with the questions that was hidden is shown
            $(".wrapper").show();
    
            $(this).hide();
          run();
          buildQuestions();
        });
    
        // Timer 
        var number = 100;
        $("#timeLeft").on("click", run);
    
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
            // Alert the user that time is up. Update the innerHTML of the message
           // div to say 'Game Over!'
            // alert('Time Up!')
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
    
        // Execute the run function.
        
     
    function formTemplate(data) {
    // the first variable relates the form field for question with the data in the object for
    // each question so that the questions can be inputed into that form field
        var qString = "<form id='questionOne'>"+ data.question +"<br>";
    // this variable to access the question object's answers array needed to answer each question
        var possibles = data.possibles;
    // a for loop to go through the answers array for each question to add the values of each answer
    // array and using qString, add them as radio buttons to the question to which they are
    // associated
        for (var i = 0; i < possibles.length; i++) {
            var possible = possibles[i];
            console.log(possible);
            qString = qString + "<input type='radio' name='"+data.id+"' value=" + i + ">" + possible;
    
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
        var unAnswered =0
    
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