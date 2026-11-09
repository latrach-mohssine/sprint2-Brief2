import {
     getPlayers, savePlayers, getActivePlayerId, saveActivePlayerId
} from "./storage.js"


export function setupAvatarSelection(){
    const avatarButtons = document.querySelectorAll(".avatar-option")
    const selectedAvatarInput = document.getElementById("selectedAvatar")
    if(!selectedAvatarInput) return 
    function chooseAvatar(avatarButton){
        for( const button of avatarButton){
            button.classList.remove("border-[#751f16]")
            button.classList.add("border-[#e7d8bd]")

        }
         avatarButton.classList.remove("border-[#e7d8bd]")
         avatarButton.classList.add("border-[#751f16]")
selectedAvatarInput.value = avatarButton.dataset.avatar
    }
    for(const avatarButton of avatarButtons){
        avatarButton.addEventListener("click", function(){
            chooseAvatar(avatarButton)

        })

    }
    for(const avatarButton of avatarButtons){
        if(avatarButton.dataset.avatar === selectedAvatarInput.value){
            chooseAvatar(avatarButton)
            break
        }
    }
}











export function setupPlayerForm(){
    const playerForm = document.getElementById("playerForm")
    const nicknameInput = document.getElementById("nickname")
    const selectedAvatarInput = document.getElementById("selectedAvatar")
    playerForm.addEventListener("submit",function(event){
        event.preventDefault()
        const nickname = nicknameInput.ariaValueMax.trim()
        const avatar = selectedAvatarInput.value
        if(nickname === "" || avatar === ""){
            return
        }

        const  newPlayer = {
            id: Date.now().toString,
            nickname: nickname,
            avatar: avatar
        }
        const players = getPlayers()
        players.push(newPlayer)
        savePlayers(players)
        if(!getActivePlayerId()){
            saveActivePlayerId(newPlayer.id);
            
        }
        displayPlayers();
        nicknameInput.value = ""
    })
}
export function displayPlayers(){
    const players = getPlayers()
    const playersContainer = document.getElementById("playersContainer")
if(!playersContainer) return
playersContainer.innerHTML = ""
if(players.length === 0){
    const emptyMessage = document.createElement("p")
emptyMessage.className = "text-[#757573] p-3"
emptyMessage.textContent = "Aucun joueur. Ajoute ton premier joueur."
playersContainer.appendChild(emptyMessage)
updateActivePlayerDisplay()
return
}


}