let noFilterStudentList = document.querySelector("#studentList");
let filteredStudentList = document.querySelector("#filterStudentList");
let filterEducation = document.querySelector("#filterEducation");
let choices = document.querySelectorAll("[name='student']");

let sortButtons = document.querySelector("#sortButtons");
let sortAge = document.querySelector("#sortAge");
let sortFirstName = document.querySelector("#sortFirstName");
let sortLastName = document.querySelector("#sortLastName");

let searchBar = document.querySelector("#searchBar");
let searchButton = document.querySelector("#searchButton");
let searchedList = document.querySelector("#searchedList");

let filteredProgramme = "";

sortButtons.hidden = true; //Knappar för att sortera ut elever döljs
noFilterStudentList.hidden = false; //Lista med ofiltrerade elever visas

let getData = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

async function fetchInfo() {
  let students = await getData("https://api.mocki.io/v2/01047e91/students");
  let schools = await getData("https://api.mocki.io/v2/01047e91/schools");

// Funktion för studentkort som skapas när man använder sökrutan
  function studentCard(search){
    let sökText = document.createElement("p");
    sökText.innerHTML = `<div><b>Namn: </b>${search.firstName} ${search.lastName}, ${search.age} år.</div> <div><b>Hobby: </b>${search.hobbies}</div> <div> <b>Utbildning: </b>${search.programme}</div>`;
    searchedList.appendChild(sökText);
  }

  //Sökruta och sökknapp för att skriva ut elev, utbildning osv...
  searchButton.addEventListener("click", () => {
    let input = searchBar.value.toLowerCase();
    console.log(input);
    searchedList.innerHTML = "";
    filteredStudentList.hidden = true;
    noFilterStudentList.hidden = true;

    students.forEach((student) => {
      let studentHobbies = student.hobbies;
      studentHobbies.forEach((hobby) => {
        if (hobby === input) {
          studentCard(student);
        }
      });

      if (student.firstName.toLowerCase() === input) {
        studentCard(student);
      } else if (student.lastName.toLowerCase() === input) {
        studentCard(student);
      } else if (student.programme.toLowerCase() === input) {
        studentCard(student);
      }
    });
  });

  //Lista med alla elever
  let profileInfo = document.createElement("div");
  students.forEach((object) => {
    let profileName = document.createElement("p");
    profileName.innerHTML = `<div><b>Namn: </b>${object.firstName} ${object.lastName}, ${object.age} år.</div> <div><b>Hobby: </b>${object.hobbies}</div> <div> <b>Utbildning: </b>${object.programme}</div>`;
    profileInfo.appendChild(profileName);
  });
  noFilterStudentList.appendChild(profileInfo);

  //Knapp för att filtrera ut elever per utbildning
  filterEducation.addEventListener("click", () => {
    filteredStudentList.innerHTML = "";
    choices.forEach((input) => {
      if (input.checked) {
        filteredProgramme = input.value;
        noFilterStudentList.hidden = true; //Om en radiobutton är "checked", ofiltrerad lista göms
      }
    });

    sortButtons.hidden = false;

    let filter = students.filter(
      (student) => student.programme === filteredProgramme
    );

    //En funktion som skapar elever och tillhörande knappar som visar matchande skolor
    function createStudent(elev) {
      //Skapar element för varje elev
      let eachStudent = document.createElement("p");
      
      eachStudent.innerHTML = `<div><b>Namn: </b>${elev.firstName} ${elev.lastName}, ${elev.age} år.</div> <div><b>Hobby: </b>${elev.hobbies}</div> <div> <b>Utbildning: </b>${elev.programme}</div>`;
      filteredStudentList.appendChild(eachStudent);

      //Skapar element för skolor som matchar
      let relatedSchools = document.createElement("button");
      relatedSchools.textContent = "Visa skolor";
      eachStudent.appendChild(relatedSchools);

      //Skapar ett element där skolorna skrivs ut för att kunna tömma denna så inte uppgifterna skrivs ut mer än en gång
      let tomDiv = document.createElement("div");
      tomDiv.innerHTML = "";
      tomDiv.id = "tomDiv";
      eachStudent.appendChild(tomDiv);
      tomDiv.hidden = true;

      //Skapar en funktion för varje "Visa Skolor"-knapp
      relatedSchools.addEventListener("click", () => {
        // Klickar på knappen när inget innehåll visas - visar innehållet.
        if (tomDiv.hidden === true){
          tomDiv.hidden = false; //Bekräftar att innehållet inte längre ska gömmas.
          tomDiv.innerHTML = ""; //Tömmer div:en varje gång man trycker på knappen - får bara ut informationen en gång.
         
          let redDiv = document.createElement("div");
          let orangeDiv = document.createElement("div");
          let greenDiv = document.createElement("div");

          tomDiv.appendChild(greenDiv);
          tomDiv.appendChild(orangeDiv);
          tomDiv.appendChild(redDiv);
         
          schools.forEach((school) => {
            let relatedSchoolList = document.createElement("p");
                
            let colorOrange = false;
            let colorGreen = false;

            let studentHobbies = elev.hobbies;
            let schoolActivities = school.activities;
            let schoolProgrammes = school.programmes;

            //ORANGE/GULT - Eleven matchar med skolan baserat på bara program men inte aktiviteter
            for (let i = 0; i < school.programmes.length; i++) {
              if (elev.programme === school.programmes[i]){
                relatedSchoolList.innerHTML = `<div>${school.name}</div>`;
                orangeDiv.appendChild(relatedSchoolList);
                colorOrange = true;
                relatedSchoolList.style.color = "#EFC700";              
              } 
            }

            //GRÖNT - Eleven matchar perfekt med skolan baserat på både program och aktiviteter
            if (elev.programme === schoolProgrammes[0] || elev.programme === schoolProgrammes[1]){       
              let allHobbies = false;
              if(studentHobbies.every( a => schoolActivities.includes(a))){
                allHobbies = true;
              }             
              if(allHobbies === true){
                relatedSchoolList.innerHTML = `<div>${school.name}</div>`;
                greenDiv.appendChild(relatedSchoolList);
                colorGreen = true;
                relatedSchoolList.style.color = "green";
              }
            }
          
            //RÖTT - Eleven matchar inte med skolan baserat på både program och aktiviteter
            if (colorOrange === false && colorGreen === false){
              relatedSchoolList.innerHTML = `<div>${school.name}</div>`;
              redDiv.appendChild(relatedSchoolList);
              relatedSchoolList.style.color = "red";
            } 
            });
        } 
        // Klickar på knappen efter att allt innehåll visas - gömmer innehållet.
        else if(tomDiv.hidden === false){
          tomDiv.hidden = true; //Bekräftar att innehållet inte längre ska visas.
        } 
      });
    }

    //Skapar p-taggar för varje utfiltrerad elev
    filter.forEach((student) => {
      createStudent(student); //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
    });

    //Knapp för att sortera filtrerad lista i åldersordning med yngst först
    let sortAgeCompare = true;
    sortAge.addEventListener("click", () => {
      sortAge.innerHTML = `Ålder <i class="fas fa-caret-up"></i>`;
      if (sortAgeCompare === true) {
        filter.sort((age1, age2) => {
          return age1.age - age2.age;
        });
        sortAgeCompare = false;
        sortAge.innerHTML = `Ålder <i class="fas fa-caret-down"></i>`;
      } else if (sortAgeCompare === false) {
        filter.sort((age1, age2) => {
          return age2.age - age1.age;
        });
        sortAgeCompare = true;
      }

      //Tömmer den existerande filtrerade listan
      filteredStudentList.innerHTML = "";

      //Skriver ut eleverna igen men i sorterad ordning
      filter.forEach((student) => {
        createStudent(student); //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
      });
    });

    //Knapp för att sortera filtrerad lista i bokstavsordning baserat på förnamn
    let sortFirstCompare = true;
    sortFirstName.addEventListener("click", () => {
      sortFirstName.innerHTML = `Förnamn <i class="fas fa-caret-up"></i>`;
      if (sortFirstCompare === true) {
        filter.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
        sortFirstCompare = false;
        sortFirstName.innerHTML = `Förnamn <i class="fas fa-caret-down"></i>`;
      } else if (sortFirstCompare === false) {
        filter.sort((a, b) => {
          if (a.firstName > b.firstName) {
            return -1;
          }
          if (a.firstName < b.firstName) {
            return 1;
          }
          return 0;
        });
        sortFirstCompare = true;
      }

      //Tömmer den existerande filtrerade listan
      filteredStudentList.innerHTML = "";

      //Skriver ut eleverna igen men i sorterad ordning
      filter.forEach((student) => {
        createStudent(student); //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
      });
    });

    //Knapp för att sortera filtrerad lista i bokstavsordning baserat på efternamn
    let sortLastCompare = true;
    sortLastName.addEventListener("click", () => {
      sortLastName.innerHTML = `Efternamn <i class="fas fa-caret-up"></i>`;
      if (sortLastCompare === true) {
        filter.sort((a, b) => {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        });
        sortLastCompare = false;
        sortLastName.innerHTML = `Efternamn <i class="fas fa-caret-down"></i>`;
      } else if (sortLastCompare === false) {
        filter.sort((a, b) => {
          if (a.lastName > b.lastName) {
            return -1;
          }
          if (a.lastName < b.lastName) {
            return 1;
          }
          return 0;
        });
        sortLastCompare = true;
      }

      //Tömmer den existerande filtrerade listan
      filteredStudentList.innerHTML = "";

      //Skriver ut eleverna igen men i sorterad ordning
      filter.forEach((student) => {
        createStudent(student); //Funktion som skapar elever och tillhörande knappfunktioner för att visa matchande skolor
      });
    });
  });
}
fetchInfo();
