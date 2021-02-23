(function (window, document, undefined) {

    text_config = {
        "ask_name_message": "Wpisz swoje imię.",
        "friend_text_prompt": "Wpisz imię twojego przyjaciela",
        "acquintance_text_prompt": "Wpisz imię twojego znajomego",
        "casual_acquintance_text_prompt": "Wpisz imię twojego dalszego znajomego",
    };

    classes_config = {
        "friend_text_class": "friend-name",
        "acquintance_text_class": "acquintance-name",
        "casual_acquintance_text_class": "custom-acquintance-name",
    };
    list_name = {
        "friends":[],
        "acquintance":[], 
        "custom_acquintance":[]
    }
    friend_count = 0;
    acquintance_count = 0;
    casual_acquintance_count = 0;

    

    window.onload = init;

    function init() {
        askName()
        fitToScreen()
    }

})(window, document, undefined);

function askName() {
    first_name = window.prompt(text_config["ask_name_message"]);
    if (first_name === null) {
        askName()
    }
    first_name = first_name.trim();
    if (first_name === '') {
        askName()
    }
    first_name = first_name.toUpperCase();
    setYourName(first_name)
}

function fitToScreen() {
    const width = window.innerWidth
    const height = window.innerHeight
    console.log(`Your monitor's resolution is '${width}x${height}'`)
    if(height > width) { // portrait mobile view
        $('#outer-circle').width('99vw')
        $('#outer-circle').height('99vw')
        $('#circle-casual-acquaintance').width('73vw')
        $('#circle-casual-acquaintance').height('73vw')
        $('#circle-acquaintance').width('47vw')
        $('#circle-acquaintance').height('47vw')
        $('#circle-close-friends').width('21vw')
        $('#circle-close-friends').height('21vw')
    }
}

//TODO: add eventlistener and recaluate elemnts after resize
//TODO: add firebase to app 

function recalculate() {
    // get names by class and delete them

    // TODO use classes config
    $('.friend-name').remove();
    $('.acquintance-name').remove();
    $('.custom-acquintance-name').remove();


    // create new items based on namelist

    //

    
}


function setYourName(first_name) {
    console.log(first_name)
    name_paragraph = document.getElementById('your-name')
    name_paragraph.innerHTML = first_name
}


function addFriend() {
    friend_count += 1;
    var outer_circle = document.getElementById("circle-acquaintance")
    // get name and clear input
    var name = document.getElementById("add-friend").value;
    list_name["friends"].append(name);
    console.log(list_name["friends"]);

    //  create element and set values
    var friend = document.createElement('p');
    friend.id = 'friend-' + friend_count
    friend.textContent = name;
    friend.className = classes_config["friend_text_class"];

    // place in cricle 
    var inner_circle = document.getElementById("circle-close-friends")
    placeElementInCircle(outer_circle, inner_circle, friend, friend_count)



    console.log(friend)
    outer_circle.appendChild(friend)
    document.getElementById("add-friend").value = ''

}

function addAcquintance() {
    acquintance_count += 1;
    var outer_circle = document.getElementById("circle-casual-acquaintance")
    // get name and clear input
    var name = document.getElementById("add-acquaintance").value;
    list_name["acquintance"].append(name);
    console.log(list_name["acquintance"])

    //  create element and set values
    var friend = document.createElement('p');
    friend.id = 'acquintance-' + acquintance_count;
    friend.textContent = name;
    friend.className = classes_config["acquintance_text_class"];

    // place in cricle 
    var inner_circle = document.getElementById("circle-acquaintance")
    placeElementInCircle(outer_circle, inner_circle, friend, acquintance_count)
    console.log(friend)

    outer_circle.appendChild(friend);
    document.getElementById("add-acquaintance").value = ''

}

function addCasualAcuitance() {
    casual_acquintance_count += 1;
    var outer_circle = document.getElementById("outer-circle")
    // get name and clear input
    var name = document.getElementById("add-casual-acquaintance").value;
    list_name["custom_acquintance"].append(name);
    console.log(list_name["custom_acquintance"])

    

    //  create element and set values
    var friend = document.createElement('p');
    friend.id = 'casual-acquintance-' + casual_acquintance_count;
    friend.textContent = name;
    friend.className = classes_config["casual_acquintance_text_class"];

    // place in cricle 
    var inner_circle = document.getElementById("circle-casual-acquaintance")
    placeElementInCircle(outer_circle, inner_circle, friend, casual_acquintance_count)

    console.log(friend)

    outer_circle.appendChild(friend)
    document.getElementById("add-casual-acquaintance").value = ''

}

function placeElementInCircle(outer_circle, inner_circle, element, counter) {
    hideKeyboard();
    // outer circe div
    //  element - to be placed in circele div
    // counter - index of elment to be placed
    console.log("circle size: ", outer_circle.offsetHeight)
    console.log("test1:", inner_circle.offsetHeight / 2, "test2 ", (outer_circle.offsetHeight - inner_circle.offsetHeight) / 4)
    var radius = inner_circle.offsetHeight / 2 + (outer_circle.offsetHeight - inner_circle.offsetHeight) / 4
    var middle = outer_circle.offsetHeight / 2;
    console.log("Radious: ", radius, "Middle: ", middle);
    step = Math.PI / 5; // every 45 deg 
    var x = Math.round(radius * Math.cos(step * counter) + middle),
        y = Math.round(radius * Math.sin(step * counter) + middle);
    console.log(x, y)
    element.style.left = x + "px";
    element.style.top = y + "px";
}

function hideKeyboard() {
    var field = document.createElement('input');
    field.setAttribute('type', 'text');
    document.body.appendChild(field);

    setTimeout(function () {
        field.focus();
        setTimeout(function () {
            field.setAttribute('style', 'display:none;');
        }, 50);
    }, 50);
    const work = async () => {
        await sleep(300)
        //code
    }
}