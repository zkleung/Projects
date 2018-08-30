objects = connectfour.o gameboard.o
connectfour.out : $(objects)
	gcc -o connectfour.out -Wall $(objects)

connectfour.o : connectfour.c gameboard.h
	gcc	-c -std=gnu99 connectfour.c
gameboard.o : gameboard.c gameboard.h
	gcc	-c	-std=gnu99 gameboard.c
clean :
	rm connectfour.out $(objects)
