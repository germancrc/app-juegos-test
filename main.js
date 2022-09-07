//juegos-
const mainUrl = "https://api.rawg.io/api/games";
const key = "?key=cfc093c9499c431f851aa37cda834746";
let paramSearch = "&search=";
let paramDate = "&dates="
let buscar = "";
let dateInput = "";
let urlCompleta = "";
let urlCompletaInicio = "";
let date = new Date();


// Get year, month, and day part from the date
let year = date.toLocaleString("default", { year: "numeric" });
let month = date.toLocaleString("default", { month: "2-digit" });
let day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
let formattedDate = year + "-" + month + "-" + day;
console.log(formattedDate); 

let todayDefault = document.getElementById('begDate').value = formattedDate;

let masDias = new Date();
masDias.setDate(masDias.getDate() + 30);

let yearPlus = masDias.toLocaleString("default", { year: "numeric" });
let monthPLus = masDias.toLocaleString("default", { month: "2-digit" });
let dayPLus = masDias.toLocaleString("default", { day: "2-digit" });

masDias = yearPlus + "-" + monthPLus + "-" + dayPLus;
console.log(masDias);

document.getElementById("endDate").value = masDias;

urlCompletaInicio = mainUrl + key + paramDate + todayDefault + "," + masDias;






function get_Date() {
  document.getElementById("juegos-container").innerHTML = "";
  const final = document.getElementById("endDate").value;
  console.log(final);   
  urlCompleta = mainUrl + key + paramDate + todayDefault + "," + final + "&ordering=released";

  getSearch();
}



//BUSCAR RAWG

// btn.onclick = () => {
//   document.getElementById("juegos-container").innerHTML = "";
//   document.getElementById("resultado").innerHTML = "";
//   document.getElementById("rapid-news").innerHTML = "";
//   document.getElementById("notiHead").innerHTML = "";
  
//   buscar = document.getElementById("buscar").value;
//   console.log(buscar);

//   if(buscar === ""){
//     window.alert("Escriba el nombre del juego!!!")

//     getNews();

//     document.getElementById("notiHead").innerHTML = "Noticias";

//   }else{
//     urlCompleta = mainUrl + key + parameter + buscar;
  
//     const spinner = document.getElementById("spin");
//     spinner.className = "d-flex justify-content-center"
  
//     const separa = document.getElementById("separa");
//     separa.className = "display"
  
//     getData();
//   }

// };

const getData = async () => {
  await fetch(urlCompletaInicio)
    .then((response) => {
      return response.json();
    })
    .then((games) => {
      console.log(games.results);

      // const datos = document.createElement("h3");
      // datos.innerText = 'Resultados ' + buscar + ': ' + games.count;
      // datos.className = "datos";
      // document.getElementById("resultado").appendChild(datos);

      for (let i = 0; i < games.results.length; i++) {

        const cardCont = document.createElement("div");
        document.getElementById("juegos-container").appendChild(cardCont);

        const cardBody= document.createElement("div");
        cardBody.className = "card-body";
        cardCont.appendChild(cardBody);

        const pics = document.createElement("img");
        pics.src = games.results[i].background_image;
        pics.className = "card-img-top";
        cardBody.appendChild(pics);

        const title = document.createElement("h6");
        title.className = "card-title";
        cardBody.appendChild(title);

        const link = document.createElement("a");
        link.innerText = games.results[i].name;
        //link.appendChild(document.createTextNode("Link"));
        link.href = 'https://api.rawg.io/api/games/'+ games.results[i].id+ '?key=cfc093c9499c431f851aa37cda834746';
        link.className = "link";
        title.appendChild(link);



      }
    });
  };

  const getSearch = async () => {
    await fetch(urlCompleta)
      .then((response) => {
        return response.json();
      })
      .then((games) => {
        console.log(games);
  
        const datos = document.createElement("h3");
        datos.innerText = 'Resultados ' + buscar + ': ' + games.count;
        datos.className = "datos";
        document.getElementById("resultado").appendChild(datos);
  
        const spinner = document.getElementById("spin");
        spinner.className = "d-none"
  
        for (let i = 0; i < games.results.length; i++) {
  
          const cardCont = document.createElement("div");
          document.getElementById("juegos-container").appendChild(cardCont);
  
          const cardBody= document.createElement("div");
          cardBody.className = "card-body";
          cardCont.appendChild(cardBody);
  
          const pics = document.createElement("img");
          pics.src = games.results[i].background_image;
          pics.className = "card-img-top";
          cardBody.appendChild(pics);
  
          const title = document.createElement("h6");
          title.className = "card-title";
          cardBody.appendChild(title);

          const date = games.results[i].released;
          const [year, month, day] = date.split('-');
          const result = [day, month, year].join('/');

          const releaseDate = document.createElement("p");
          releaseDate.innerText = 'Fecha de salida: ' + result;
          releaseDate.className = "card-text text-center mb-2";
          cardBody.appendChild(releaseDate);
  
          const link = document.createElement("a");
          link.innerText = games.results[i].name;
          // //link.appendChild(document.createTextNode("Link"));
          link.href = 'https://api.rawg.io/api/games/'+ games.results[i].id+ '?key=cfc093c9499c431f851aa37cda834746';
          link.className = "link";
          title.appendChild(link);
  
  
  
        }
      });
    };
  getData();

