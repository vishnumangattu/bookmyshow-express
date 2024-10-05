const url=window.location.href;
const urlParams=new URLSearchParams(url.split("?")[1]);
const id=urlParams.get("id");
let titleimg;
let banimg;
async function getMovie() {
    const res=await fetch(`http://localhost:3007/api/getmovie/${id}`);
    const movie=await res.json();
    
    titleimg=movie.titleimg;
    banimg=movie.banimg;
    document.getElementById("frm").innerHTML=`
    <label for="title">Movie Title:</label>
            <input type="text" id="title" name="title" value=${movie.title}>

            <label for="duration">Duration (in minutes):</label>
            <input type="number" id="duration" name="duration" value=${movie.duration}>

            <label for="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value=${movie.genre}>

            <label for="release-date">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" value=${movie.releaseDate}>

            <label for="language">Language:</label>
            <input type="text" id="language" name="language" value=${movie.language}>

            <label for="certification">Certification:</label>
            <select id="certification" name="certification" value=${movie.certification}>
                <option value="U">U</option>
                <option value="UA">UA</option>
                <option value="A">A</option>
                <option value="S">S</option>
            </select>

            <label for="picture">Title image:</label>
            <input type="file" id="titleimg" name="picture1"   value=${movie.titleimg}accept="image/*" required>
            <label for="picture1">Banner image:</label>
            <input type="file" id="banimg" name="picture2"  value=${movie.banimg} accept="image/*" required>

            <button type="submit">Submit</button>
    `;
}
getMovie();

document.getElementById("frm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    try {
        const title=document.getElementById("title").value;
    const duration=document.getElementById("duration").value;
    const genre=document.getElementById("genre").value;
    const releaseDate=document.getElementById("releaseDate").value;
    const language=document.getElementById("language").value;
    const certification=document.getElementById("certification").value;
    const res=await fetch(`http://localhost:3007/api/editmovie/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,duration,genre,releaseDate,language,certification,titleimg,banimg})
    })
    if(res.status==201){
        alert("Updated")
        window.location.href="../index.html"
    }else{
        alert("error")
    }
    } catch (error) {
        console.log(error);
        
    }
})

async function pic1(){
    console.log(document.getElementById("titleimg").files[0]);
    titleimg=await convertToBase64(document.getElementById("titleimg").files[0]);
}
async function pic2(){
    console.log(document.getElementById("banimg").files[0]);
    banimg=await convertToBase64(document.getElementById("banimg").files[0]);
}
function convertToBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.readAsDataURL(file);   
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror= (error)=>{
            reject(error)
        }
    })
}