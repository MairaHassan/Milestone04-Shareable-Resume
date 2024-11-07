// get reference to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;


// handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); //prevent page reload

    //collect input value
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLTextAreaElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

     // picture element
     const profilePictureFile = profilePictureInput.files?.[0];
     const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

    // save form data in localstorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        address,
        education,
        experience,
        skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally

    // generate the resume content dynamically
    const resumeHTML =`
    <h2><b>Editable Resume</b></h2>

    <h3>Personal Information</h3>
    ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
    <p><b>Name:</b><span contenteditable="true">${name}</span></p>
    <p><b>Email:</b><span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>
    <p><b>Address:</b><span contenteditable="true">${address}</span></p>
    
    <h3>Qualification</h3>
    <p contenteditable="true">${education}</p>

    <h3>Work Experience</h3>
    <p contenteditable="true">${experience}</p>

    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
    `;

    //display the generated resume
     resumeDisplayElement.innerHTML = resumeHTML;

    //generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`; 

    // display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

//handle pdf download
downloadPdfButton.addEventListener('click' , () => {
    window.print(); // this will open the print dialog and the user to save as pdf

});

//prefill the foem based on the username in the URL
window.addEventListener('DOMContentLoaded' , () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

if (username) {

 // Autofill form if data is found in localStorage
 const savedResumeData = localStorage.getItem(username);

 if (savedResumeData) {
 const resumeData = JSON.parse(savedResumeData);

 (document.getElementById('username') as HTMLInputElement).value =
username;
 (document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
 (document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
 (document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('address') as HTMLTextAreaElement).value =
 resumeData.address;
 (document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
 (document.getElementById('experience') as HTMLTextAreaElement).value
= resumeData.experience;
 (document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
 }
 }
});
