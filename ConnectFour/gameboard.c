

#include <stdlib.h>
#include <stdio.h>
#include "gameboard.h"

// allocates space for the gameboard and its squares
gameboard* gameboard_create(int numRows, int numCols) {
    // Homework TODO: complete this function by adding code here
    gameboard* result;
    result = (gameboard*)malloc(sizeof(gameboard));
    result->squares = (square**)malloc(sizeof(square*)*numRows);
    for(int i = 0; i < numRows; i++){
        result->squares[i] = (square*)malloc(sizeof(square)*numCols);
    }
    result->numRows = numRows;
    result->numCols = numCols;
    gameboard_initialize(result);
    return result;
}

// deallocates space for the gameboard and its squares
void gameboard_destroy(gameboard* board) {
    for (int i = 0; i < board->numRows; i++) {
        free(board->squares[i]);
    }
    free(board->squares);
    free(board);
}

// sets coinsInBoard to 0, state to STILL_PLAYING, and all squares to EMPTY
void gameboard_initialize(gameboard* board) {
    // Homework TODO: define this function
    board->coinsInBoard = 0;
    board->state = STILL_PLAYING;
    for(int i = 0; i < board->numRows; i++)
    {
        for(int j = 0; j < board->numCols; j++)
        {
            board->squares[i][j] = EMPTY;
        }
    }
}

// returns RED_COIN, YELLOW_COIN, or EMPTY depending on square (row, col)
square gameboard_square(const gameboard board, int row, int col) {
    if (0 <= row && row < board.numRows && 0 <= col && col < board.numCols) {
        return board.squares[row][col];
    } else {
        fprintf(stderr, "Error: board index %d %d out of bounds\n", row, col);
        exit(EXIT_FAILURE);
    }
}

// attempts to insert coin into column col for player p
bool gameboard_insert_coin(gameboard* board, int col, player p) {
    // Homework TODO: define this function
    bool boolVal = false;
    int i;
    for(i = board->numRows - 1; i >= 0; i--){
        if(board->squares[i][col] == EMPTY){
            boolVal = true;
            break;
        }
    }
    if(boolVal){
        if(p == RED_PLAYER){
            board->squares[i][col] = RED_COIN;
        }
        else{
            board->squares[i][col] = YELLOW_COIN;
        }
        board->coinsInBoard++;
    }
    else{
        printf("Column %d is full\n", col);
    }
    return boolVal;

}

// prints the coins currently in the board
void gameboard_print(const gameboard board) {
    for (int i = 0; i < board.numRows; i++) {
        for (int j = 0; j < board.numCols; j++) {
            switch (gameboard_square(board, i, j)) {
                case EMPTY:
                    printf("  ");
                    break;
                case RED_COIN:
                    printf("R ");
                    break;
                case YELLOW_COIN:
                    printf("Y ");
                    break;
            }
        }
        printf("\n");
    }
    for (int j = 0; j < board.numCols - 1; j++) {
        printf("==");
    }
    printf("=\n");
}

// returns true if STILL_PLAYING, false otherwise
bool gameboard_still_playing(const gameboard board) {
    return board.state == STILL_PLAYING;
}

// returns state field
gamestate gameboard_state(const gameboard board) {
    return board.state;
}
// check horizontal strips containing square (row, col)
bool gameboard_check_square_horizontal(gameboard* board){
    // Homework TODO: define this function
    for(int j = 0; j < board->numCols - 3; j++){
        for(int i = 0; i < board->numRows; i++){
            if(board->squares[i][j] == RED_COIN && board->squares[i][j + 1] == RED_COIN && board->squares[i][j + 2] == RED_COIN && board->squares[i][j + 3] == RED_COIN){
                board->state = RED_WINS;
                return true;
            }
            if(board->squares[i][j] == YELLOW_COIN && board->squares[i][j + 1] == YELLOW_COIN && board->squares[i][j + 2] == YELLOW_COIN && board->squares[i][j + 3] == YELLOW_COIN){
                board->state = YELLOW_WINS;
                return true;
            }
        }
    }
    return false;
}

// check vertical strips containing square (row, col)
bool gameboard_check_square_vertical(gameboard* board){
    // Homework TODO: define this function
    for(int i = 0; i < board->numRows - 3; i++){
        for(int j = 0; j < board->numCols; j++){
            if(board->squares[i][j] == RED_COIN && board->squares[i + 1][j] == RED_COIN && board->squares[i + 2][j] == RED_COIN && board->squares[i + 3][j] == RED_COIN){
                board->state = RED_WINS;
                return true;
            }
            if(board->squares[i][j] == YELLOW_COIN && board->squares[i + 1][j] == YELLOW_COIN && board->squares[i + 2][j] == YELLOW_COIN && board->squares[i + 3][j] == YELLOW_COIN){
                board->state = YELLOW_WINS;
                return true;
            }
        }
    }
    return false;
}

// check diagonal strips containing square (row, col)
bool gameboard_check_square_diagonal(gameboard* board) {
    // Homework TODO: define this function
    for(int i = 0; i < board->numRows - 3; i++){
        for(int j = 0; j < board->numCols - 3; j++){
            if(board->squares[i][j] == RED_COIN && board->squares[i + 1][j + 1] == RED_COIN && board->squares[i + 2][j + 2] == RED_COIN && board->squares[i + 3][j + 3] == RED_COIN){
                board->state = RED_WINS;
                return true;
            }
            if(board->squares[i][j] == YELLOW_COIN && board->squares[i + 1][j + 1] == YELLOW_COIN && board->squares[i + 2][j + 2] == YELLOW_COIN && board->squares[i + 3][j + 3] == YELLOW_COIN){
                board->state = YELLOW_WINS;
                return true;
            }
        }
    }
    for(int i = board->numRows - 1; i >= 3; i--){
        for(int j = 0; j < board->numCols - 3; j++){
            if(board->squares[i][j] == RED_COIN && board->squares[i - 1][j + 1] == RED_COIN && board->squares[i - 2][j + 2] == RED_COIN && board->squares[i - 3][j + 3] == RED_COIN){
                board->state = RED_WINS;
                return true;
            }
            if(board->squares[i][j] == YELLOW_COIN && board->squares[i - 1][j + 1] == YELLOW_COIN && board->squares[i - 2][j + 2] == YELLOW_COIN && board->squares[i - 3][j + 3] == YELLOW_COIN){
                board->state = YELLOW_WINS;
                return true;
            }
        }
    }
    return false;
}

bool gameboard_check_if_full(gameboard* board){
    if (board->coinsInBoard == board->numCols * board->numRows){
        return true;
    }
    else{
        return false;
    }
}

void gameboard_declare_winner(gameboard* board){

    if(board->state == RED_WINS){
        printf("Game over: red wins.\n");
        
    }
    else if(board->state == YELLOW_WINS){
        printf("Game over: yellow wins.\n");
    }
    else if(board->state == TIE){
        printf("Game over: tie.\n");
        
    }   
}