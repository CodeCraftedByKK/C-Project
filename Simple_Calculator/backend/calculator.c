#include <stdio.h>

void printf_menu()
int main () {


    int choice;
    double first,second,result;

    do{
        print_menu();
        scanf("%d",&choice);
    printf("\nWelcome to Simple Calculator\n");
    printf("\nChoose one of the following options: ");
    printf("\n1. Addition");
    printf("\n2. Substraction");
    printf("\n3. Multiplication");
    printf("\n4. Division");
    printf("\n5. Modulus");
    printf("\n6.Power");
    printf("\n7. Exit");

    printf("\nNow, Enter Your Choices: ");
    scanf("%d",&choice);
} while(choice != 7);


     
    return 0;
}