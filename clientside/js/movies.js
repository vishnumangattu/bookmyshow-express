let arr=[]
async function getMovies() {
    const res=await fetch("http://localhost:3007/api/getmovies");
    const movies=await res.json();
    console.log(movies);
    str=``;
    movies.map((movie)=>{
        str+=`
        <div class="movie">
            <a href="./movie.html?id=${movie._id}">
            <div class="mimg">
                        <img src="${movie.titleimg}" alt="">
                    </div>
                    <h3>${movie.title}</h3>
                    <p>${movie.certification}</p>
                    <p>${movie.language}</p>
            </a>
        </div>
        `
        arr.push(movie);
    });
    document.getElementById("movies").innerHTML=str;
}
getMovies();

document.getElementById("filter").addEventListener('keyup',(e)=>{
    str=``
    arr.filter((i)=>i.title.toLowerCase().includes(e.target.value.toLowerCase())).map((movie)=>{
        str+=`
       <div class="movie">
            <a href="./movie.html?id=${movie._id}">
            <div class="mimg">
                        <img src="${movie.titleimg}" alt="">
                    </div>
                    <p style="color: black; font-weight:bold; margin:10px 0">${movie.title}</p>
                    <p>${movie.certification}</p>
                    <p>${movie.language}</p>
            </a>
                    
        </div>
        `

})
document.getElementById("movies").innerHTML=str;
})

  