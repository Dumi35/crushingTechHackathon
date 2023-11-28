let steps = document.querySelectorAll('.steps')
let bell = document.getElementsByClassName("bell")[0]
let alert = document.getElementsByClassName("alert")[0]
let profile = document.getElementsByClassName("profile")[0]
let dropdown = document.getElementsByClassName("dropdown")[0]
let dismissTrial = document.getElementsByClassName("dismiss")[0]
let hideSteps = document.getElementsByClassName("controls")[0]
let extendTrial = document.getElementsByClassName("extend")[0]
let allSteps = document.getElementsByClassName("allSteps")[0]

let showAlert = false;
let showProfile = false;

let steps_counter = 0;

/*display notification */
bell.addEventListener("click",()=>{
    showAlert = !showAlert
    if(showAlert){
        alert.style.display="block"
        bell.querySelector("button").setAttribute("aria-expanded", "true")
        dropdown.style.display="none"
        showProfile=false
    }
    else{
        alert.style.display="none"
        bell.querySelector("button").setAttribute("aria-expanded", "false")

    }
})

/* display profile */
profile.addEventListener("click",()=>{
    showProfile = !showProfile
    if(showProfile){
        dropdown.style.display="flex"
        alert.style.display="none"
        profile.querySelector(".initial").setAttribute("aria-expanded", "true")
        showAlert = false

    }
    else{
        dropdown.style.display="none"
        profile.querySelector(".initial").setAttribute("aria-expanded", "false")
    }
})

/* only one step display at a time */
let detailsOpen= false

steps.forEach(function(step) {
    step.addEventListener('click', function(e) {
        // Close all other details elements when one is opened
        
        document.querySelectorAll('details').forEach(function(otherDetails) {
            let isOpen
            let currentDetails=step.querySelector("details")

            if (otherDetails !== currentDetails) {
                otherDetails.removeAttribute('open'); 
            }   
            
        });
    });
});
 



/* progress bar indication */
let completionStatement = document.getElementById("completion-statement")
let stepSelect = document.querySelectorAll('.step-select')
let progress = document.getElementsByClassName("progress-bar-complete")[0]
let completed=0;
completionStatement.innerText= `${completed} / 5 completed`

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function svgLoadingDelay(selection) {
    // Sleep for 400 milliseconds then change svg to ticked
    await sleep(400);

    selection.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#1C181D"></circle>
        <path
        d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
        fill="#fff"
        ></path>
    </svg>` 
     
}

stepSelect.forEach((selection)=>{
    let isSelected = false;
    
    selection.addEventListener("click",()=>{
        selection.parentElement.parentElement.parentElement.removeAttribute("open")

        isSelected = !isSelected
        if(isSelected){
            completed+=1
            
            if (completed==5){
                progress.style.borderTopRightRadius="5px"
                progress.style.borderBottomRightRadius="5px"
            } 

            completionStatement.innerText= `${completed} / 5 completed`
            progress.style.width=`${(completed/5)*100}%`

            /* change svg pic to loading animation */
            selection.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 30 30" fill="none">
            <!-- Initial shape: Original SVG path with rotation -->
            <path id="originalPath" d="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2"
              stroke="#1C181D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <animateTransform attributeName="transform" type="rotate" from="0 14 14" to="360 14 14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="d" values="M26 14C26 16.3734 25.2962 18.6935 23.9776 20.6668C22.6591 22.6402 20.7849 24.1783 18.5922 25.0866C16.3995 25.9948 13.9867 26.2324 11.6589 25.7694C9.33114 25.3064 7.19295 24.1635 5.51472 22.4853C3.83649 20.8071 2.6936 18.6689 2.23058 16.3411C1.76755 14.0133 2.00519 11.6005 2.91345 9.4078C3.8217 7.21509 5.35977 5.34094 7.33316 4.02236C9.30655 2.70379 11.6266 2 14 2" dur="2s" repeatCount="1" />
            </path>
        </svg>`
        svgLoadingDelay(selection) 

      selection.setAttribute("aria-checked", "true")
        }
        else{
            completed-=1
            
            completionStatement.innerText= `${completed} / 5 completed`
            progress.style.width=`${(completed/5)*100}%`
            progress.style.borderTopRightRadius="0px"
            progress.style.borderBottomRightRadius="0px"
            selection.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="step-select">
            <circle cx="16" cy="16" r="12" stroke="#8A8A8A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 6" />
          </svg>`

          selection.setAttribute("aria-checked", "false")
        }
        
        
    })

    
}) 

/* close extend trial bar */
dismissTrial.addEventListener("click",()=>{
    extendTrial.style.display="none"
})

/* hide all the steps in setup guide */

let stepsHidden = false

hideSteps.addEventListener("click",()=>{
    stepsHidden = !stepsHidden
    if(stepsHidden){
        allSteps.style.display="none"
        hideSteps.innerHTML=`<svg width="31" height="30" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21967 8.46967C6.51256 8.17678 6.98744 8.17678 7.28033 8.46967L10.75 11.9393L14.2197 8.46967C14.5126 8.17678 14.9874 8.17678 15.2803 8.46967C15.5732 8.76256 15.5732 9.23744 15.2803 9.53033L11.2803 13.5303C10.9874 13.8232 10.5126 13.8232 10.2197 13.5303L6.21967 9.53033C5.92678 9.23744 5.92678 8.76256 6.21967 8.46967Z" fill="#4a4a4a"/>
        </svg>
        `
        hideSteps.setAttribute("aria-expanded",false)
    }
    else{
        allSteps.style.display="block"
        hideSteps.innerHTML=`<svg width="31" height="30" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0303 12.2803C14.7374 12.5732 14.2626 12.5732 13.9697 12.2803L10.5 8.81066L7.03033 12.2803C6.73744 12.5732 6.26256 12.5732 5.96967 12.2803C5.67678 11.9874 5.67678 11.5126 5.96967 11.2197L9.96967 7.21967C10.2626 6.92678 10.7374 6.92678 11.0303 7.21967L15.0303 11.2197C15.3232 11.5126 15.3232 11.9874 15.0303 12.2803Z" fill="#4a4a4a"/>
        </svg>
        `
        hideSteps.setAttribute("aria-expanded",true)
    }
})

