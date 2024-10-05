const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
console.log(id);

async function getMovie() {
    const res=await fetch(`http://localhost:3007/api/getmovie/${id}`)
    const movie=await res.json();
    document.getElementById("picture").src=movie.titleimg;
    
    document.getElementById("title").textContent=movie.title;
    document.getElementById("language").textContent=movie.language;
    document.getElementById("duration").textContent=timeConvert(movie.duration);
    document.getElementById("genre").textContent=movie.genre;
    document.getElementById("certification").textContent=movie.certification;
    document.getElementById("date").textContent=movie.releaseDate;
    document.getElementById("buttons").innerHTML=`
    <a href="../pages/edit.html?id=${movie._id}"><button id="edit">Edit</button></a>
                        <button onclick="deleteMovie('${movie._id}')" id="delete">Delete</button>`
     document.getElementById("bimg").style.backgroundImage=`url('${movie.banimg}')`;
}
getMovie();
function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "hr " + rminutes + "min";
    
}
async function deleteMovie(id) {
    fetch(`http://localhost:3007/api/deletemovie/${id}`,{
      method:"DELETE",
          headers:{"Content-Type":"application/json"}
    }).then((res)=>{
          console.log(res);
          if(res.status==201){
              alert("Deleted")
              window.location.href="../index.html";
          }else{
              alert("error");
              window.location.href="../index.html";
          }
      }). catch ((error)=>{
          console.log(error);
          
      })
  }