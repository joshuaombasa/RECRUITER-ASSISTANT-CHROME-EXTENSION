let candidatesArray = []
const saveCandidateBtn = document.getElementById("save-candidate-btn")
const inputEl = document.getElementById("input-el")
const linksList = document.getElementById("links-list")
const candidatesFromLocalStorage = JSON.parse(localStorage.getItem("myCandidates"))
const saveLinkBtn = document.getElementById("save-link-btn")
const resetBtn = document.getElementById("reset-btn")

if (candidatesFromLocalStorage) {
    candidatesArray = candidatesFromLocalStorage
    render()
}

saveCandidateBtn.addEventListener("click", function () {
    if (inputEl.value) {
        localStorage.setItem("myCandidates",inputEl.value)
        inputEl.value = ''
        let storedCandidates = localStorage.getItem("myCandidates")
        candidatesArray.push(storedCandidates)
        render()
    }  
})

saveLinkBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow:true}, function (tabs) {
        candidatesArray.push(tabs[0].url)
        localStorage.setItem("myCandidates", JSON.stringify(candidatesArray))
        render()
    })
})

resetBtn.addEventListener("click", function () {
    localStorage.clear
    candidatesArray = []
    render()

})

function render() {
    let htmlList = ''
    for (let i = 0; i< candidatesArray.length; i++) {
        htmlList += `<li>
                         <a href="${candidatesArray[i]}">${candidatesArray[i]}<a>
                    </li>`
    }
    linksList.innerHTML = htmlList
}