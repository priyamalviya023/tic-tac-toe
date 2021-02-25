"use strict";

  const COMPUTER = "&times;";
  const PLAYER = "&Omicron;";
  var players=1,turn=1,score1=0,score2=0;

  var board = new Array(3); //Declaration of board

  for(var i=0;i<3;i++){
    board[i]=new Array(3);
    for(var j=0;j<3;j++){
      board[i][j] = ' ';
    }
  }

  function evaluate(){
    // Checking for Rows for X or O victory.
      for (var row = 0; row<3; row++)
      {
          if (board[row][0]==board[row][1] &&
              board[row][1]==board[row][2])
          {
              if (board[row][0]=='X')
                  return +10;
              else if (board[row][0]=='O')
                  return -10;
          }
      }

      // Checking for Columns for X or O victory.
      for (var col = 0; col<3; col++)
      {
          if (board[0][col]==board[1][col] &&
              board[1][col]==board[2][col])
          {
              if (board[0][col]=='X')
                  return +10;

              else if (board[0][col]=='O')
                  return -10;
          }
      }

      // Checking for Diagonals for X or O victory.
      if (board[0][0]==board[1][1] && board[1][1]==board[2][2])
      {
          if (board[0][0]=='X')
              return +10;
          else if (board[0][0]=='O')
              return -10;
      }

      if (board[0][2]==board[1][1] && board[1][1]==board[2][0])
      {
          if (board[0][2]=='X')
              return +10;
          else if (board[0][2]=='O')
              return -10;
      }

      // Else if none of them have won then return 0
      return 0;
  }

  function winner(state){
    if(players==2){
      if(state==-10){
        score1++;
        alert("PLAYER \'O\' WON!");
      }
      else if(state==10){
        alert("PLAYER \'X\' WON!");
        score2++;
      }
      else alert("TIE!");
      document.getElementById('sc').innerHTML="O:   "+score1+" |  X:   "+score2;
      startGame();
      return;
    }
    if(state==-10) alert("YOU WON!");
    else if(state==10) alert("YOU LOST!");
    else alert("TIE!");
    startGame();
  }

  function isEmpty(){
    for(var i=0;i<3;i++)
      for(var j=0;j<3;j++) if(board[i][j]==' ') return true;
    return false;
  }

  // MINIMAX AlGORITHM
	  
  function minimax(depth, isComputer){
    var score = evaluate();

    if(score==10) return score-depth;
    if(score==-10) return score+depth;

    if(!isEmpty()) return 0;

    if(isComputer){
      var best=-100;
      for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
          if(board[i][j]==' '){
            board[i][j]='X';
            best = Math.max(best, minimax(depth+1, false));
            board[i][j]=' ';
          }
        }
      }
      return best;
    }
    else{
      var best=100;
      for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
          if(board[i][j]==' '){
            board[i][j]='O';
            best = Math.min(best, minimax(depth+1, true));
            board[i][j]=' ';
          }
        }
      }
      return best;
    }
  }

  function updateboard(){
    var bestVal=-100, posi=0, posj=0;
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
        if(board[i][j]==' '){
          board[i][j]='X';
          var moveVal = minimax(0,false);
          board[i][j]=' ';
          if(moveVal>bestVal){
            bestVal=moveVal;
            posi=i; posj=j;
          }
        }
      }
    }
    board[posi][posj]='X';
    document.getElementById((posi*3+posj+1).toString()).innerHTML = COMPUTER;
    document.getElementById('status').innerHTML = "YOU CAN\'T WIN";
  }

  function startGame(){
    turn = 1;
    for(var i=0;i<3;i++)
      for(var j=0;j<3;j++){
         document.getElementById((i*3+j+1).toString()).innerHTML= "";
         board[i][j]=' ';
      }
    document.getElementById('status').innerHTML = "ENJOY";
  }
  function two(row, col){
	document.getElementById('next').style.display = "none";
    if(turn){
      board[row][col] = 'O';
      document.getElementById((row*3+col+1).toString()).innerHTML=PLAYER;
      document.getElementById('status').innerHTML="Player " + COMPUTER +"\'s turn";
    }
    else{
      board[row][col] = 'X';
      document.getElementById((row*3+col+1).toString()).innerHTML=COMPUTER;
      document.getElementById('status').innerHTML="Player " + PLAYER + "\'s turn";
    }
    turn=(turn+1)%2;
    if(evaluate()==10){
      winner(10);
      return;
    }
    else if(evaluate()==-10){
      winner(-10);
      return;
    }
    if(!isEmpty()){
      winner(0);
      return;
    }
  }
  function fun(row, col){
	document.getElementById('next').style.display = "none";
    if(board[row][col]!=' '){
      alert("Please make a valid move!");
      return;
    }
    if(players==2){
      two(row, col);
      return;
    }
    board[row][col] = 'O';
    document.getElementById((row*3+col+1).toString()).innerHTML=PLAYER;
    updateboard();
    if(!isEmpty()){
      winner(0);
      return;
    }
    if(evaluate()==10){
      winner(10);
      return;
    }
    else if(evaluate()==-10){
      winner(-10);
      return;
    }
  }
  function reset(){
    score1=0;
    score2=0;
    document.getElementById('sc').innerHTML="Choose Mode";
	document.getElementById('next').style.display="none";
    startGame();
    hide();
  }
  function show(a){
	document.getElementById('next').style.display="none";
    players=a;
    if(players==1) document.getElementById('sc').innerHTML="ONE PLAYER";
    else document.getElementById('sc').innerHTML="O:   0 | X:   0";
    document.getElementById('choose').style.display = "none";
    document.getElementById('game').style.display = "block";
  }
  function hide(){
    document.getElementById('choose').style.display = "block";
    document.getElementById('game').style.display = "none";
  }
  function check(){
	  for(let i=0;i<3;i++){
		  for(let j=0;j<3;j++){
			  if(board[i][j]!=' ') return true;
		  }
	  }
	  return false;
  }
  function next_move(){
	  document.getElementById('next').style.display="block";
	  var posi=-1, posj=-1;
	  if(players==2){
		  if(turn){
	  		var best=100;
		  	for(let i=0;i<3;i++){
				for(let j=0;j<3;j++){
					if(board[i][j]==' '){
						board[i][j] = 'O';
						var val = minimax(0,true);
						board[i][j] = ' ';
						if(val<best){
							best=val;
							posi=i;
							posj=j;
						}
					}
				}
			}
		 }
		 else{
			var best=-100;
		  	for(let i=0;i<3;i++){
				for(let j=0;j<3;j++){
					if(board[i][j]==' '){
						board[i][j] = 'X';
						var val = minimax(0,false);
						board[i][j] = ' ';
						if(val>best){
							best=val;
							posi=i;
							posj=j;
						}
					}
				}
			}
		 }
	  }
	  else{
		  var best=100;
		  	for(let i=0;i<3;i++){
				for(let j=0;j<3;j++){
					if(board[i][j]==' '){
						board[i][j] = 'O';
						var val = minimax(0,true);
						board[i][j] = ' ';
						if(val<best){
							best=val;
							posi=i;
							posj=j;
						}
					}
				}
			}
	  }
	  posi++;posj++;
	  if(check())
	  document.getElementById('next').innerHTML="HINT: (" + posi.toString() + " , " + posj.toString() + ")";
	  else document.getElementById('next').innerHTML="Start the game";
  }
