# JS-projektarbete-extendedVersion
EXTENDED VERSION - Skapa en applikation som hanterar elever som söker till eftergymnasiala utbildningar och färgsortera skolor baserat på hur bra dessa matchar med eleven. 

1. Användaren ska ha möjlighet att se samtliga elever i en lista när sidan laddas.

2. Användaren ska kunna filtrera eleverna i listan baserat på utbildning.
3. Användaren ska också kunna sortera listan i både stigande och fallande ordning, baserat på följande:
- Ålder
- Förnamn
- Efternamn 

4. Användaren ska kunna söka efter elever via en fritext. Användare kan välja att söka på förnamn, efternamn, utbildning eller elever som har en specifik hobby.
OBS! Söker användare på för- eller efternamn måste hen skriva HELA namnet för att få en matchning. Man kan dock blanda versaler och gemener och få en matching t.ex.
        “mArIA” => Alla som heter Maria visas
        “Mari" => Endast elever som heter Mari matchas, ej Maria.

5. Användaren ska kunna välja en elev i listan, och se en lista på samtliga skolor. De ska vara färgsorterade efter hur väl de matchar elevens behov (dvs gröna skolor ska vara högst upp, sedan gula, sedan röda):
- Grön: Utbildning samt aktiviteter för alla elevens hobbys finns.
- Gul: Utbildning finns, men alla aktiviteter finns inte.
- Röd: Utbildning finns inte.
