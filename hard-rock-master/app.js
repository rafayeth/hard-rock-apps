// document.getElementById("search-bttn").addEventListener("click", searchResult )

    


// function searchResult(){

//     document.getElementById("song-container").innerHTML = ''

//     const songTitle =   document.getElementById("title-inuptt").value

//     fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
//       .then(response => response.json())
//       .then(data => {
    
//         fetchdata = data;
//           for(i = 0; i<data.data.length; i++){
        
//        const title =  data.data[i].title;
//        const artist =  data.data[i].artist.name;

//        const songDiv = document.createElement('div');
//        songDiv.className = 'single-result row align-items-center my-3 p-3';
//        songDiv.innerHTML = 
    
//         document.getElementById("song-container" ).innerHTML += `<div> <h3> ${title}</h3>
//                                                                          <h5>   ${artist} </h5>
                                                                         
    
//                                                                           </div>`
                                                                     


    
                   
                   
//                                                                           if( i ==9)  {
//                          break;
//                      }                                                   
        
        
        
//         }})
        

// }


// function getLyrics (index){

//     document.getElementById("lyrics").innerHTML = ''

//     const title = fetchdata.data[index].title;
//     const artist = fetchdata.data[index].title.name;

//     fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
//     .then(response => response.json())
//     .then(data => {

//         const lyrics = data.lyrics;

//         if(lyrics == undefined){

//             alert ("lyrics not found")
//         }

//         document.getElementById('lyrics').innerHTML = ` <pre>${lyrics} </pre> `
//     })


// }

const searchSongs = () => {
    document.getElementById("search-field").innerHTML = ''
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something Went Wrong!! Please try again later!'));
}


const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

const getLyric = async (artist, title) => {

    document.getElementById("song-lyrics").innerHTML = ''
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyrics(data.lyrics)
// }
//     catch (error) {
//                 displayError('Sorry! I failed to load lyrics, Please try again later!!!')
//             }


const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}