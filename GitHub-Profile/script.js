const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput")
const searchButtonEl = document.getElementById("search_btn")
const profileContainerEl = document.getElementById("profileContainer")
const loadingEl = document.getElementById("loading")

const generateProfile = (profile)=>{
    return ` <div class="profile-box">
   <div class="top-section">
    <div class="left">
      <div class="avatar">
        <img src="${profile.avatar_url}" alt="profile picture"/>
      </div>
      <div class="self">
        <h1>${profile.name}</h1>
        <p>${profile.login}</p>
      </div>
    </div>
    <a href="${profile.html_url}" target="_blank"><button class="profileBtn">Check Profile</button></a>
   </div>

   <div class="about">
    <h2>About</h2>
    <p>${profile.bio}</p>
   </div>
   <div class="status">
    <div class="status-item">
      <h2>Followers</h2>
      <p>${profile.followers}</p>
    </div>
    <div class="status-item">
      <h2>Following</h2>
      <p>${profile.following}</p>
    </div>
    <div class="status-item">
      <h2>Repos</h2>
      <p>${profile.public_repos}</p>
    </div>
   </div>
</div>`
    
}

const fetchProfile = async () => {
      const username = searchInputEl.value

      loadingEl.innerText = "loading....."
      loadingEl.style.color = "black";

    try{
        const res = await fetch(`${url}/${username}`)
        const data = await res.json();
        
        if(data.login){
            loadingEl.innerText = ""
            profileContainerEl.innerHTML = generateProfile(data)
        }else{
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = "red";
            profileContainerEl.innerText = ''
        }

        console.log(data);
    } catch (error){
        console.log({error});
        loadingEl.innerText = ""
    }
}

searchButtonEl.addEventListener("click",fetchProfile)