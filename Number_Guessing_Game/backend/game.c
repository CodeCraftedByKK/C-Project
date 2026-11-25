#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

/*
  Small C game engine called by Node.js.
  Usage:
    game.exe start
    game.exe guess SECRET_NUMBER PLAYER_GUESS
  Output:
    start -> secret number
    guess -> low, high, or won
*/

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Missing command.\n");
        return 1;
    }

    if (strcmp(argv[1], "start") == 0) {
        unsigned int seed = (unsigned int)time(NULL) ^ (unsigned int)clock();
        srand(seed);
        printf("%d\n", rand() % 100 + 1);
        return 0;
    }

    if (strcmp(argv[1], "guess") == 0) {
        if (argc != 4) {
            fprintf(stderr, "Usage: game.exe guess SECRET GUESS\n");
            return 1;
        }

        int secret = atoi(argv[2]);
        int guess = atoi(argv[3]);

        if (secret < 1 || secret > 100 || guess < 1 || guess > 100) {
            fprintf(stderr, "Numbers must be between 1 and 100.\n");
            return 1;
        }

        if (guess < secret) {
            puts("low");
        } else if (guess > secret) {
            puts("high");
        } else {
            puts("won");
        }
        return 0;
    }

    fprintf(stderr, "Unknown command.\n");
    return 1;
}
