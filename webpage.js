// headings

const headings = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'];

const content = document.querySelector('.contact-box .content');

headings.forEach( eachOne =>{
    const h2 = document.createElement('h2');
    const div = document.createElement('div');

    
    h2.innerHTML = eachOne;
    h2.setAttribute('class', 'heading')

    content.appendChild(h2);
    content.appendChild(div);
    h2.style.display = 'none';
})



//class Contact

class Contact{
    constructor(name, phone, email){
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

class Storage{
    static getContacts(){
        let contacts;
        if(localStorage.getItem('contacts') === null){
            contacts = [];
        }else{
            contacts = JSON.parse(localStorage.getItem('contacts'))
        }

        return contacts;
    }

    static addContact(contact){
        const contacts = Storage.getContacts();

        contacts.push(contact);

        localStorage.setItem('contacts' , JSON.stringify(contacts));
    }

    static removeContact(name){
        const contacts = Storage.getContacts();

        contacts.forEach((eachOne, index)=>{
            if(eachOne.name.toLowerCase() == name.toLowerCase()){
                // console.log(true);
                contacts.splice(index, 1)
            }
        });

        localStorage.setItem('contacts' , JSON.stringify(contacts));
    }
}





class UI{
    static displayContact(){
        const Contacts = Storage.getContacts();

        Contacts.forEach( eachOne => UI.addContact(eachOne));

    }

    static addContact(contact){

        const h2 = document.querySelectorAll('.contact-box .content .heading');

        const name = contact.name;

        const firstLetter = name[0].toUpperCase();


        const span = document.createElement('span');

        let count = 0
        
        h2.forEach( eachOne =>{
            if(eachOne.innerHTML === firstLetter){
                span.innerHTML = name;
                eachOne.nextElementSibling.appendChild(span);

                span.setAttribute('class', 'list');


                eachOne.style.display = '';

            }else{
                count++;
            }        
        })

        if(count == 27){
            span.innerHTML = name;
            h2[26].nextElementSibling.appendChild(span);
            h2[26].style.display = '';
        }

        UI.showDetails();

        UI.sorting();

    }

    static showDetails(){

        const contactBox = document.querySelector('.contact-box');

        const showContact = document.querySelector('.show-contact');

        const allSpan = document.querySelectorAll('.contact-box .content span');

        const contacts = Storage.getContacts();

        const name = document.querySelector('.show-contact .name');
        const phone = document.querySelector('.show-contact .details .phone .number');
        const email = document.querySelector('.show-contact .details .mail .email');
        
        allSpan.forEach( eachOne =>{
            eachOne.addEventListener('click', ()=>{

                contactBox.setAttribute('class', 'contact-box init');
                showContact.setAttribute('class', 'show-contact init');

                name.innerHTML = eachOne.innerHTML.toLowerCase();

                const selected = eachOne.innerHTML.toLowerCase();

                contacts.forEach(eachOne =>{
                    if(eachOne.name.toLowerCase() === selected){
                        phone.innerHTML = eachOne.phone;
                        email.innerHTML = eachOne.email;
                    }
                    
                })
            })
        })

        
    }

    static deleteContact(){
        const contactBox = document.querySelector('.contact-box');

        const showContact = document.querySelector('.show-contact');

        const allSpan = document.querySelectorAll('.contact-box .content span');

        const contacts = Storage.getContacts();

        const name = document.querySelector('.show-contact .name');
        const phone = document.querySelector('.show-contact .details .phone .number');
        const email = document.querySelector('.show-contact .details .mail .email');

        Storage.removeContact(name.innerHTML.toLowerCase());

        allSpan.forEach(eachOne =>{
            if(eachOne.innerHTML.toLowerCase() == name.innerHTML.toLowerCase()){

                if(eachOne.previousElementSibling == null && eachOne.nextElementSibling == null){
                    eachOne.parentElement.previousElementSibling.style.display = 'none';
                    eachOne.remove();
                }else{
                    eachOne.remove();
                }
            }
        })


    }

    static sorting(){

        const allSpan = document.querySelectorAll('.contact-box .content .list');

        var spanList = [];

        allSpan.forEach( eachOne =>{
            
            spanList =  spanList.concat(eachOne.innerHTML);
        })


        spanList = spanList.sort();

        allSpan.forEach( (eachOne, index) =>{
            eachOne.innerHTML = spanList[index];
        })
    }

    static clearfields(){

        document.querySelector('.addContact #my-form #name').value = '';
        document.querySelector('.addContact #my-form #phone').value = '';
        document.querySelector('.addContact #my-form #email').value = '';

    }
}

//DomContentLoad

document.addEventListener('DOMContentLoaded', UI.displayContact);

// form Input

document.querySelector('.addContact #my-form').addEventListener('submit', (e) =>{

    e.preventDefault();



    const name = document.querySelector('.addContact #my-form #name').value.trim().toLowerCase();
    const phone = document.querySelector('.addContact #my-form #phone').value.trim().toLowerCase();
    let email = document.querySelector('.addContact #my-form #email').value.trim().toLowerCase();

    if(email == ''){
        email = "Not Available";
    }

    const contactbox = document.querySelector('.contact-box');
    const addContact = document.querySelector('.addContact');

    const phoneid = document.querySelector('.addContact #my-form #phone');

    const nameid = document.querySelector('.addContact #my-form #name');

    const alert = document.querySelector('.addContact .alert');

    const allSpan = document.querySelectorAll('.contact-box .content .list');

    


    if(phone == '' && name == ''){
        phoneid.setAttribute('placeholder', 'Please enter the field')
        phoneid.style.animation = 'forminput 1s linear';
        phoneid.style.animationIterationCount = 'infinite';

        nameid.setAttribute('placeholder', 'Please enter the field')
        nameid.style.animation = 'forminput 1s linear'
        nameid.style.animationIterationCount = 'infinite';

        alert.style.display = 'none';               


    }else if(name == ''){
        nameid.setAttribute('placeholder', 'Please enter the field')
        nameid.style.animation = 'forminput 1s linear'
        nameid.style.animationIterationCount = 'infinite'

        phoneid.style.animation = '';
        phoneid.setAttribute('placeholder', '')

        alert.style.display = 'none';               

    }else if(phone == ''){
        phoneid.setAttribute('placeholder', 'Please enter the field')
        phoneid.style.animation = 'forminput 1s linear';
        phoneid.style.animationIterationCount = 'infinite';

        nameid.style.animation = '';
        nameid.setAttribute('placeholder', '')

        alert.style.display = 'none';

    }else{
        let count = 0;
        
        allSpan.forEach(eachOne =>{
            if(eachOne.innerHTML.toLowerCase() == name.toLowerCase()){
                
                alert.style.display = '';

                phoneid.style.animation = '';
                phoneid.setAttribute('placeholder', '')

                nameid.style.animation = '';
                nameid.setAttribute('placeholder', '')

                console.log('this is alert');

                count = 1;
            };
        });

        if(count == 0){

            contactbox.setAttribute('class', 'contact-box')
            addContact.setAttribute('class', 'addContact')
        
            alert.style.display = 'none'; 
                                
            nameid.style.animation = '';
            phoneid.style.animation = '';
            alert.style.display = 'none';


            nameid.setAttribute('placeholder', '')
            phoneid.setAttribute('placeholder', '')


            UI.clearfields();

            const contact = new Contact(name, phone, email);

            Storage.addContact(contact);
            UI.addContact(contact);
       }
    }
})



// onclick events

document.querySelector('.contact-box .search').addEventListener('click', ()=>{
    document.querySelector('.contact-box #input').setAttribute('class', 'input init')
})

//add-contact click event

const contactbox = document.querySelector('.contact-box');
const addContact = document.querySelector('.addContact');
const alert = document.querySelector('.addContact .alert');


document.querySelector('.contact-box .add-contact').addEventListener('click', ()=>{


    contactbox.setAttribute('class', 'contact-box init')
    addContact.setAttribute('class', 'addContact init')

    alert.style.display = 'none';

})

//close

const closeAddContact = document.querySelector('.addContact .close');

var clicked1 = false;


closeAddContact.addEventListener('mouseover', ()=>{
    if(clicked1 == true){
        clicked1 = false;
    }
    addContact.setAttribute('class', 'addContact init hover');
})

closeAddContact.addEventListener('mouseout', mouseOut1);

function mouseOut1(){
    if(clicked1 == false){
        addContact.setAttribute('class', 'addContact init');
    }
}


document.querySelector('.addContact .close').addEventListener('click', ()=>{

    clicked1 = true;

    contactbox.setAttribute('class', 'contact-box')
    addContact.setAttribute('class', 'addContact')

})


//show-contact on click events


const showContact = document.querySelector('.show-contact');
const deleteContact = document.querySelector('.show-contact .delete');
const closeContact = document.querySelector('.show-contact .close');

var clicked2 = false;

closeContact.addEventListener('mouseover', ()=>{
    if(clicked2 == true){
        clicked2 = false;
    }
    showContact.setAttribute('class', 'show-contact init hover');
})

closeContact.addEventListener('mouseout', mouseOut2);

function mouseOut2(){
    if(clicked2 == false){
        showContact.setAttribute('class', 'show-contact init');
    }
}

closeContact.addEventListener('click', ()=>{

    clicked2 = true;

    showContact.setAttribute('class', 'show-contact')
    contactbox.setAttribute('class', 'contact-box')

})

deleteContact.addEventListener('click', ()=>{
    showContact.setAttribute('class', 'show-contact')
    contactbox.setAttribute('class', 'contact-box')

    UI.deleteContact();
})


// filtering

const inputValue =  document.querySelector('.contact-box .menu #input');

inputValue.addEventListener('keyup', ()=>{

    let input = inputValue.value;

    const allSpan = document.querySelectorAll('.contact-box .content span');

    const h2 = document.querySelectorAll('.contact-box .content .heading');  

    h2.forEach( eachOne =>{
        eachOne.style.display = 'none';
    })

    allSpan.forEach( eachOne =>{
        if(eachOne.innerHTML.toLowerCase().includes(input.toLowerCase()) ){
            eachOne.style.display = '';
            eachOne.parentElement.previousElementSibling.style.display = ''; 
        }else{
            eachOne.style.display = 'none';
        }
    })

})