const fullName = document.getElementById("full-name");
const stateCode = document.getElementById("state-code");
const ppa = document.getElementById("ppa");
const phone = document.getElementById("phone");
const addEl = document.getElementById("add-el");
const membersForm = document.getElementById("membersForm");
const closeEl = document.getElementById("close-el");
const submitBtn =document.getElementById("submit-btn")
const membersTbody = document.querySelector(".members-info");

//  preview elements
const previewRow = document.getElementById("preview");
const previewName = document.getElementById("preview-name");
const previewCode = document.getElementById("preview-code");
const previewPPA = document.getElementById("preview-ppa");
const previewPhone = document.getElementById("preview-phone");

// defining error
const fn = document.getElementById("fn")
const sc = document.getElementById("sc")
const pa = document.getElementById("pa")
const phn = document.getElementById("phn")
const fnErr = document.getElementById("fn-err")
const scErr = document.getElementById("sc-err")
const paErr = document.getElementById("pa-err")
const phnErr = document.getElementById("phn-err")



submitBtn.addEventListener("click", (e) => {
  e.preventDefault(e);
  if (fullName.value === "") {
    fnErr.textContent = "First Name cannot be empty";
    fnErr.style.color = "red";
    fullName.style.border = "1px solid red";
  } else {
    fnErr.textContent = "";
    fullName.style.border = "1px solid #ccc";
  }

  //validate full name

  if (stateCode.value === "") {
    scErr.textContent = "State Code is required";
    scErr.style.color = "red";
     document.getElementsByName('stateCode') [0].placeholder = "E.g LA/00B/0000";
    stateCode.style.border = "1px solid red";
  } else {
    scErr.textContent = "";
    stateCode.style.border = "1px solid #ccc";
  }

  //validate ppa
  if (ppa.value === "") {
    paErr.textContent = "PPA is required";
    paErr.style.color = "red"; 
    ppa.style.border = "1px solid red";
  } else {
    paErr.textContent = "";
    ppa.style.border = "1px solid #ccc";
  }

  //validate phone number
  const phoneRegex = /^\+234[0-9]{10}$/;

  if (phoneRegex.test(phone.value)) {
    phnErr.textContent = "Phone number cannot be empty";
    phnErr.style.color = "red";
    phone.style.border = "1px solid red";
  } else if (phone.value.length < 11 || phone.value.length > 11 ) {
    phnErr.textContent = "Phone number must be 13 digits";
    phnErr.style.color = "red";
    phone.style.border = "1px solid red";
    phone.style.display = "block";
  } else {
    phnErr.textContent = "";
    phnErr.style.border = "1px solid #ccc";
  }


});



//  show / hide form 
addEl.addEventListener("click", (e) => {
    e.preventDefault();
    membersForm.style.display = "block";
});

closeEl.addEventListener("click", (e) => {
    e.preventDefault();
    membersForm.style.display = "none";
});

//  preview (for typing in the form input, to access each td and update it as well)
function updatePreview() {
    const hasValue = fullName.value || stateCode.value || ppa.value || phone.value;
    previewRow.style.display = hasValue ? "table-row" : "none";
    previewName.textContent = fullName.value;
    previewCode.textContent = stateCode.value;
    previewPPA.textContent = ppa.value;
    previewPhone.textContent = phone.value;
}

// updating while typing
fullName.addEventListener("input", updatePreview);
stateCode.addEventListener("input", updatePreview);
ppa.addEventListener("input", updatePreview);
phone.addEventListener("input", updatePreview);

//  load members 
function loadMembers() {

   // page loads, get the members
   //it should loop through the array
   // for each item, add member to table (tr)
    const members = JSON.parse(localStorage.getItem("members") || "[]");
    members.forEach(addMemberToTable);
}

//  add member   (for submitting your form)
function addMemberToTable(member) {


    const tr = document.createElement("tr");
    tr.setAttribute("data-id", member.id)
    tr.innerHTML = `
        <td>${member.name}</td>
        <td>${member.code}</td>
        <td>${member.ppa}</td>
        <td>${member.phone}</td>
        <td>
            <a href="#" class="editbtn">Edit</a>
            <a href="#" class="deletebtn">Delete</a>
        </td>
    `;
    membersTbody.appendChild(tr);
}

//  submit form 
membersForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const member = {
        name: fullName.value,
        code: stateCode.value,
        ppa: ppa.value,
        phone: phone.value
    };

    // save to localStorage
    const members = JSON.parse(localStorage.getItem("members") || "[]");
    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));

    // add to table
    addMemberToTable(member);

    // reset form
    membersForm.reset();
    previewRow.style.display = "none";
    membersForm.style.display = "none";
});

//  iinit 
loadMembers();




function edit(memberId) {
     const member = document.createElement("tr")
     const members = JSON.parse(localStorage.getItem("members") || "[]");
     const memberToEdit = members.find(member => member.Id === memberId);

    membersForm.style.display = "block";

    //  if (memberToEdit) {
    //     fullName.value = memberToEdit.name;
    //     stateCode.value = memberToEdit.code;
    //     ppa.value = memberToEdit.ppa;
    //     phone.value = memberToEdit.phone;

    //     membersForm.dataset.editId = member.id
    //  }

    membersForm.addEventListener("submit", (e) => {
    e.preventDefault(e);

    const member = {
        name: fullName.value,
        code: stateCode.value,
        ppa: ppa.value,
        phone: phone.value,
    };

    // save to localStorage
    const members = JSON.parse(localStorage.getItem("membersId") || "[]");
    member.push(member);
    localStorage.setItem("members", JSON.stringify(members));

    // add to table
    addMemberToTable(member);

    // reset form
    membersForm.reset();
    previewRow.style.display = "block";
    membersForm.style.display = "block";
});

}


// edit.addEventListener(); { 
//     const member = document.createElement("tr")
//     fullName.value = member.name;
//     stateCode.value = member.code;
//     ppa.value = member.ppa;
//     phone.value = member.phone;

//     membersForm.dataset.editId = member.id
// }

    

//  submit form 
// membersForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const member = {
//         name: fullName.value,
//         code: stateCode.value,
//         ppa: ppa.value,
//         phone: phone.value
//     };

//     // save to localStorage
//     const members = JSON.parse(localStorage.getItem("members") || "[]");
//     members.push(member);
//     localStorage.setItem("members", JSON.stringify(members));

//     // add to table
//     addMemberToTable(member);

//     // reset form
//     membersForm.reset();
//     previewRow.style.display = "none";
//     membersForm.style.display = "none";
// });

// //  iinit 
// loadMembers();


