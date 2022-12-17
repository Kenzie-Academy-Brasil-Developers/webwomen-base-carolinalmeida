function getLocalStorage(){
    const jobs = JSON.parse(localStorage.getItem("@kenzieWebwomen: JobsAdd"))
    
    if(jobs !== null){
        jobs.forEach((job) => {
            cardJobsAdd(job)
        })
    }
}
getLocalStorage()

function cardsJob(){
    const array = jobsData

    localStorage.setItem("@kenzieWebwomen: jobs", JSON.stringify(array))

    const ul = document.querySelector(".cardJobs")
    array.forEach(job => {
        ul.insertAdjacentHTML("beforeend", 
        
        `
        <li id="${job.id}">
        <h2>${job.title}</h2>
         <div class="informationJob">
           <span>${job.enterprise}</span>
           <span>${job.location}</span>
         </div>

         <h3>${job.descrition}</h3>

        <p>${job.modalities[0]}</p>
        <button class="addJob" id=${job.id}>Candidatar</button>

       </li>

        `)
    });
}
cardsJob()

function addJobs(){
    const button = document.querySelectorAll(".addJob")
    const jobsAddLocalStorege = JSON.parse(localStorage.getItem("@kenzieWebwomen: JobsAdd")) || []

    const jobs = JSON.parse(localStorage.getItem("@kenzieWebwomen: jobs"))

    button.forEach((button) => {
        button.addEventListener("click", () => {
           
            const jobsFound = jobs.find(job => job.id == button.id)
        
            jobsAddLocalStorege.push(jobsFound)
            localStorage.setItem("@kenzieWebwomen: JobsAdd", JSON.stringify(jobsAddLocalStorege))
            
            if(button.innerText == "Candidatar"){
                button.classList.toggle("remove2")
                button.innerText = "Remover Candidatura"
                cardJobsAdd(jobsFound)
            }else{
                
                button.innerText = "Candidatar"
              
                removeLi(button.id)
                removeLocalStorege(button.id)
            }
            

            

        })
        
    })

}
addJobs()

function cardJobsAdd(element){
   
    const title = document.querySelector(".title")
    title.innerHTML = ""
    const ul = document.querySelector(".addJobAll")
        ul.insertAdjacentHTML("beforeend", 
            `
                <li class="job" id="${element.id}">
                <div>
                <h2>${element.title}</h2>
                <div>
                  <span>${element.enterprise}</span>
                  <span>${element.location}</span>
                </div>
                </div>
                <button class="remove" id="${element.id}"></button>
                    
                </li>
         `
    )
    deleJobs()
}


function deleJobs(){
    const buttons = document.querySelectorAll(".remove")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonAdd = document.querySelectorAll(".remove2")

            const li = document.querySelectorAll(".job")
            li.forEach((li) => {
                if(li.id == button.id){
                    removeLi(button.id)
                    removeLocalStorege(button.id)
                    buttonAdd.forEach((button2) => {
                        if(button2.id == li.id){
                            button2.innerHTML = "Candidatar"
                            button2.classList.remove("remove2")
                        }
                    })
                }

            })

        })
    })


}

function removeLi(id){
    const li = document.querySelectorAll(".job")
    li.forEach((li) => {
        
        if(li.id == id){
            li.remove()
            const ul = document.querySelector(".addJobAll")
                    if(ul.childElementCount <= 1){
                        const title = document.querySelector(".title")
                        title.innerHTML = "Você ainda não aplicou para nenhuma vaga"
                       
                    }
        }
    })
}

function removeLocalStorege(id){
    const jobsLocalStorege = JSON.parse(localStorage.getItem("@kenzieWebwomen: JobsAdd"))
    const newJobsLocalStorege = jobsLocalStorege.filter((job) => {return job.id != id})
    localStorage.setItem("@kenzieWebwomen: JobsAdd", JSON.stringify(newJobsLocalStorege))
}



