//juegos
const mainUrl = "https://api.rawg.io/api/games";
const key = "?key=cfc093c9499c431f851aa37cda834746";
let parameter = "&search=";
let buscar = "";

let urlCompleta = "";

const btn = document.getElementById("btn");

/*
//NOTICIAS RAPIDAPI

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6359f7fed2msh768fdf99f2eb0fep1dbca5jsn3ffc11c469d8',
		'X-RapidAPI-Host': 'videogames-news2.p.rapidapi.com'
	}
};

fetch('https://videogames-news2.p.rapidapi.com/videogames_news/recent', options)
	.then(response => response.json())
	.then(newsRapid => console.log(newsRapid))
	.catch(err => console.error(err));


  const getNews = async () => {
    await fetch('https://videogames-news2.p.rapidapi.com/videogames_news/recent', options)
      .then((response) => {
        return response.json();
      })
      .then((newsRapid) => {
        console.log(newsRapid);
  
        for (let i = 0; i < newsRapid.length; i++) {
  
          const newsCont = document.createElement("div");
          document.getElementById("noticias").appendChild(newsCont);

          const newsBody= document.createElement("div");
          newsBody.className = "newsBody";
          newsCont.appendChild(newsBody);
  
          const pics = document.createElement("img");
          pics.src = newsRapid[i].image;
          pics.className = "newsImg";
          newsBody.appendChild(pics);
  
          const title = document.createElement("h6");
          title.innerText = newsRapid[i].title;
          title.className = "newsTitle";
          newsBody.appendChild(title);
  
        }
      });
  };
*/

//BUSCAR RAWG

btn.onclick = () => {
  document.getElementById("juegos-container").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
  //document.getElementById("noticias").innerHTML = "";
  //document.getElementById("notiHead").innerHTML = "";
  
  buscar = document.getElementById("buscar").value;
  console.log(buscar);

  if(buscar === ""){
    window.alert("Escriba el nombre del juego!!!")

    getNews();

    document.getElementById("notiHead").innerHTML = "Noticias";

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
        title.className = "card-title";
        cardBody.appendChild(title);

        const link = document.createElement("a");
        link.innerText = games.results[i].name;
        //link.appendChild(document.createTextNode("Link"));
        link.href = 'https://api.rawg.io/api/games/'+ games.results[i].id+ '?key=cfc093c9499c431f851aa37cda834746';
        link.className = "link";
        link.onclick = loadScript;
        title.appendChild(link);
        
        function loadScript(){
         alert('Hi')
        }



      }
    });
};

//getNews(),

getData();
