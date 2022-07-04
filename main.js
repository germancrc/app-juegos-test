const mainUrl = "https://api.rawg.io/api/games";
const key = "?key=cfc093c9499c431f851aa37cda834746";
let parameter = "&search=";
let buscar = "";

let urlCompleta = "";

const btn = document.getElementById("btn");

urlCompleta = mainUrl + key + parameter + buscar;

btn.onclick = () => {
  document.getElementById("juegos-container").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";

  buscar = document.getElementById("buscar").value;
  
  console.log(buscar);

  if(buscar.value === ""){
    alert("Hello! I am an alert box!!");
  }else{
    urlCompleta = mainUrl + key + parameter + buscar;
    const spinner = document.getElementById("spin");
    spinner.className = "d-flex justify-content-center"
  
    const separa = document.getElementById("separa");
    separa.className = "display"
  
    getData();
  }
};

const getData = async () => {
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
        title.innerText = games.results[i].name;
        title.className = "card-title";
        cardBody.appendChild(title);
      }
    });
};


getData();
