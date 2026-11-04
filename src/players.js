export function setupAvatarSelection() {
const avatarButtons = document.querySelectorAll(".avatar-option")
console.log(avatarButtons)
const selectedAvatarInput = document.getElementById("selectedAvatar")
console.log(selectedAvatarInput)

for(const avatarButton of avatarButtons){
    
    avatarButton.addEventListener("click", function() 

    {
       selectedAvatarInput.value = avatarButton.dataset.avatar

       console.log(selectedAvatarInput.value, selectedAvatarInput)
    
    })
}
}                                

