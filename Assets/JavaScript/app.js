//Trivia Game for my DAD!

$(document).ready(function () {

    //Questions and information  of the trivia 
    
    var triviaquestions = [
        {
        //q1
            question: 'Los Reyes de España pudieron expulsar de su territorio a los árabes en 1492, luego de derrocar el reino de...',
            choices: ['Toledo', 'Granada', 'Cataluña', 'Aragón'],
            correctAnswer: 1, 
            image: 'assets/images/q1.jpg'
        },
    
        {
        //q2
            question: '¿Qué estado mexicano tiene menos bocas que alimentar, por ser el más escasamente poblado?',
            choices: ['Colima', 'Baja California Sur', 'Tlaxcala', 'Hidalgo'],
            correctAnswer: 0, 
            image: 'assets/images/q2.jpg'
        },
    
        {
        //q3
            question: 'África tiene la cuarta isla más grande del mundo, del tamaño de España, cuya capital es Antananarivo. ¿Cuál es?',
            choices: ['Zanzíbar', 'Mozambique', 'Madagascar', 'Cabo Verde'],
            correctAnswer: 2, 
            image: 'assets/images/q3.jpg'
        },
    
        {
        //q4
            question: 'La India limita con 7 países, dos de los cuales formaron parte de su territorio hasta hace algunas décadas. Uno es Bangladesh, el otro...',
            choices: ['Pakistán', 'Sri Lanka', 'Nepal'],
            correctAnswer: 0, 
            image: 'assets/images/q4.png'
        },
    
        {
        //q5
            question: '¿Cuántos países integran el Reino Unido?',
            choices: ['8', '6', '5', '4'],
            correctAnswer: 3, 
            image: 'assets/images/q5.jpg'
        },
    
        {
        //q6
            question: 'Este pintor tenía fascinación por los volcanes, especialmente el Paricutín, al que vio nacer en 1943',
            choices: ['O Gorman', 'Orozco', 'Siqueiros', 'Dr. Atl'],
            correctAnswer: 3, 
            image: 'assets/images/q6.jpg'
        },
    
        {
        //q7
            question: 'Este país nórdico no pertenece a la península escandinava, como algunos piensan, pero sí ocupa, él solito, la península de Jutlandia',
            choices: ['Noruega', 'Finlandia', 'Dinamarca', 'Suecia'],
            correctAnswer: 2, 
            image: 'assets/images/q7.jpg'
        },
    
        {
        //q8
            question: '¿Quién es el autor del Imperativo categórico, que nos recomienda actuar como creemos que debieran hacerlo todos los demás?',
            choices: ['Blaise Pascal', 'Immanuel Kant', 'René Descartes', 'Platón'],
            correctAnswer: 1, 
            image: 'assets/images/q8.jpg'
        },
    
        {
        //q9
            question: '¿Cuáles de las ciudades sudamericanas fue la primera en implementar un sistema de transporte rápido?',
            choices: ['Santiago, Chile', 'Buenos Aires, Argentina', 'Río de Janeiro, Brasil', 'Lima, Perú'],
            correctAnswer: 1, 
            image: 'assets/images/q9.jpg'
        },
    
        {
        //q10
            question: 'Aunque Israel es un país milenario, su nacimiento como estado independiente data del año...',
            choices: ['1958', '1962', '1969', '1948'],
            correctAnswer: 3, 
            image: 'assets/images/q10.jpg'
        }
    
    ];
    
    //variables needed to start
    var totAnswers=triviaquestions.length;
    var trivia = [];
    var wins = 0, losses = 0, nonanswered = 0;
    var questionAsked, time, interval;
    //the counter counts the questions that have already been answered
    var counter = 0;
    //var resetButton = $("<button id='reset-button'>Reset</button>");
    
   // function for Timer
    function timeRemaining(){
        time=30;
        interval=setInterval(decreasetime,1000);
    }
    
    function decreasetime(){
        time--;
        $('.timer').html("<h3>Tiempo restante:  "+ time + "</h2>");
    
        //if the question is left unanswered
        if (time===0){
            nonanswered++;
            counter++;
            clearInterval(interval);
            $userChoice=$('<div>');
            $userChoice.addClass('current-answer');
            $userChoice.html("Se terminó el tiempo, la respuesta correcta es:  "+ questionAsked.choices[questionAsked.correctAnswer]);
            $userChoice.append("<br> <img id='images' src='"+questionAsked.image+"'>");
            //to remove selected elements keeping data& events
            $(".answer").detach();
            $(".answer-div").append($userChoice);

            //time to show the result
            setTimeout(function(){
                finishGame();
            },7000)
        }
    }

    //if the player answers correctly
    function playerWins(){
        $userChoice=$('<div>');
        $userChoice.addClass('current-answer');
        $userChoice.html("¡Correcto!" );
        $userChoice.append("<br> <img id='images' src='"+questionAsked.image+"'>");
        $(".answer").detach();
        $(".answer-div").append($userChoice);

        setTimeout(function(){
            finishGame();
        },7000)
    }

    //if the player guessed wrong!
    function playerLoses(){
        $userChoice=$('<div>');
        $userChoice.addClass('current-answer');
        $userChoice.html("¡OH! En realidad, la respuesta correcta es: "+ questionAsked.choices[questionAsked.correctAnswer]);
        $userChoice.append("<br> <img id='images' src='"+questionAsked.image+"'>");
        $(".answer").detach();
        $(".answer-div").append($userChoice);

        setTimeout(function(){
            finishGame();
        },7000)
    }

    
    // Function to go to a new question 
    
    function nextQuestion() {
    
        var i = Math.floor(Math.random() * trivia.length);
        questionAsked=trivia[i];
        //removes items from an array, (not to repeat question)
        trivia.splice(i,1);
    
    
        //DOM
        $(".question-div").html('<h2>'+questionAsked.question+'</h2>');
        for(var j=0; j<questionAsked.choices.length;j++){
            $answerDiv=$("<div>");
            $answerDiv.addClass("answer");
            $answerDiv.attr("id",j);
            $answerDiv.html(questionAsked.choices[j]);
            $(".answer-div").append($answerDiv);
        }

    } 

    //function to finish game (and removing many divs/classes)
    function finishGame(){
        clearInterval(interval);
        if (counter===totAnswers){
            $(".timer").empty();
            $(".answer-div").empty();
            $("#start-button").hide();
            // show() shows the hidden, selected elements.
            $("#reset-button").show();
            $(".question-div").append("<h3>Has terminado la TRIVIA :D</h3>")
            $resultsDiv=$("<div>");
            $resultsDiv.addClass("results");
            $resultsDiv.append("<p> Respuestas Correctas: "+ wins + "</p>");
            $resultsDiv.append("<p> Respuestas Incorrectas: "+ losses + "</p>");
            $resultsDiv.append("<p> No contestadas: "+ nonanswered + "</p>");
            $(".answer-div").append($resultsDiv);
        }
        else{
            $(".answer-div").empty();
            nextQuestion();
            timeRemaining();
        }
    }

    $('#reset-button').hide();
    trivia = triviaquestions.slice();
        
    // Events
        
    $(document).on('click', '.answer', function () {
        
        //console.log(this.id,questionAsked.correctAnswer);
        if (this.id == questionAsked.correctAnswer) { 
            clearInterval(interval);   
            wins++;
            counter++;
            playerWins();    
        } 
            
        else {
            clearInterval(interval);
            losses++;
            counter++;
            playerLoses()
        }

        console.log("losses "+losses,"counter "+counter,"wins "+wins);      
    }) 
         

    //Listener for the start button
    $('#start-button').on('click', function () {
        $(this).hide();
        nextQuestion();
        timeRemaining();
    })

    //Listener for the reset button
    $(document).on('click','#reset-button',function(){
        $(this).hide();
        timeRemaining();
        $('.answer-div').empty();
        $('.question-div').empty();
        trivia = triviaquestions.slice();
        nextQuestion();
        counter = 0;
    
    })
})