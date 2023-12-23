const ALPHA = "ABCDEFGHIJKLMOPQRSTUVWXYZ"

function glitchEffect(element, speed) {
    let iterations = 0;

    let interval = setInterval(() => {
        output = []
        for (i = 0; i < element.dataset.value.length; i++) {
            if (i < iterations) {
                output.push(element.dataset.value[i])
            }
            else {
                output.push(ALPHA[Math.floor(Math.random() * 26)]);
            }
        }
        element.innerHTML = output.join("");

        if (iterations > element.dataset.value.length) clearInterval(interval);
        iterations++;
    }, speed)
}

// Name Glitch Effect
glitchEffect(document.getElementById("name"), 80)

// h1 tags glitch effect
const elements = document.querySelectorAll("h1")
for (let e of elements) {
    new IntersectionObserver(entries => {
        glitchEffect(e, 100)
    }).observe(e)
}


const hiddenTexts = [["COMPUTER-SCIENCE-STUDENT", 88], ["NEW-YORKER", 252], ["POLISH", 300], ["PROGRAMMER", 455], ["PERSISTANT", 5], ["COLLABORATIVE", 170]]

function desktopEffect() {
    const effect = document.getElementById("effectDesktop");
    effect.style += "display:flex;"
    let hover = false;

    effect.onmouseover = event => {
        hover = true;
    }

    effect.onmouseleave = event => {
        hover = false;
    }

    let interval = setInterval(() => {
        output = []
        for (i = 0; i < 600; i++) {
            let taken = false;
            for (let group of hiddenTexts) {
                let text = group[0]
                let index = group[1]
                if (hover && i >= index && i - index < text.length) {
                    output.push("<b>" + text[i-index] + "</b>");
                    taken = true;
                }
            }
            if (!taken) {
                output.push("<span>" + ALPHA[Math.floor(Math.random() * 25)] + "</span>"); 
            }

            
        }
        effect.innerHTML = output.join(" ");
    }, 50)
}

const descriptors = ["A COMPUTER SCIENCE STUDENT", "A NEW YORKER", "POLISH", "A PROGRAMMER", "PERSISTANT", "COLLABORATIVE", "RELIABLE"]


function mobileEffect() {
    const effect = document.getElementById("effectMobile");
    effect.style += "display:flex;"

    iterations = 0;
    forward = true;
    phraseIndex = 0;
    let interval = setInterval(() => {
        output = []
        for (i = 0; i < descriptors[phraseIndex].length; i++) {
            if (i < iterations) {
                output.push(descriptors[phraseIndex][i])
            }
        }

        effect.innerHTML = `<h2>I AM ${output.join("")}</h2>`;

        if (iterations > descriptors[phraseIndex].length + 15) {
            forward = false;
        }
        else if (iterations < -5) {
            forward = true;
            phraseIndex++;
            if (phraseIndex >= descriptors.length) {phraseIndex = 0}
        }

        if (forward) {iterations++;}
        else {iterations--;}
        
    }, 50)
}


if (screen.width >= 600) {
    desktopEffect();
}
else {
    mobileEffect()
}


// Projects
const projects = [
    {
        "name": "AI Character Generator",
        "id": "aiCharGen",
        "link": "https://github.com/PaulShiLi/rpgGenerate-SpaceInvaders",
        "thumbnail": "images/character-gen/home.png",
        "text": `<p>Over the summer of '22, I worked with a team of 5 others to train natural language processing AI models to make an RPG character generator. The generator would be split up to three different AI models: Backstory, Personality, and Physical Descriptions. In addition to this, we only had two weeks to do it.</p>

        <p>To get the large amount of training data for out models we had to scrape through countless websites, Dungeons & Dragons rulebooks, and even GPT-3 generated responses. After, we used the aitextgen Python library to train our Distil GPT-2 models on these datasets. This process took countless hours and sometimes even days.</p>
        
        <p>To deploy these AI models for use, we then created a website using the Django framework and a Discord Bot. If you want to try our AI models you can run either the website or Discord bot from our GitHub.</p>`
    },
    {
        "name": "3D Engine in Java",
        "id": "3DEngine",
        "link": "https://github.com/kacperlet/3D-Engine-Java",
        "thumbnail": "images/3D-engine/cylinder.png",
        "text": `<p>As a challenging side-project, I attempted to create my own 3D engine with Java and it's built in 2D graphics library.</p>

        <p>To create a simple cube, it required me to create a projection function that returns a transformed X and Y when given a Z value. Then, I researched rotational matrices and applied them to my program to rotate them on any axis.</p>
        
        <p>After, I created other three dimensional shapes with customizable parameters such as heigth, length, and width. One of my more customizable function also takes a value n to create an n-sided polyonal prism. This allowed me to easily create a simple triangular prism or a pentadecagonal prism.</p>
        `
    },
    {
        "name": "Lightsaber CSS",
        "id": "lightsaberCSS",
        "link": "https://github.com/kacperlet/lightsaber",
        "thumbnail": "images/lightsaber/two.png",
        "text": `<p>After becoming more adept at web development and using CSS I decided to test my CSS skills by creating a ligthsaber with pure CSS. No images were used at all.</p>

        <p>In less than two days I was able to create a ligthsaber with customizable colors, a retractable blade, a way to swing it using JavaScript, and audio cues for when you do swing it.</p>
        
        <p>You can access a live demo of it here: <a>https://kacperlet.github.io/lightsaber/</a></p>
        
        `
    }
]

const projectsPage = document.getElementById("projects")
function createProject(project) {

    element = `
    <div class="project fadein minimized" id="${project["id"]}" onclick="expandProject('${project["id"]}')">
        <div class="info">
            <div>
                <h2 class="textclip">${project["name"]}</h2>
                <a class="frombelow" href="${project["link"]}">${project["link"]}</a>
            </div>
            <div class="text frombelow">
                ${project["text"]}
            </div>
        </div>
        <div class="thumbnail fromright">
            <img src="${project["thumbnail"]}">
        </div>
    </div>
    `
    projectsPage.innerHTML += element
}

for (let p of projects) {
    createProject(p)
}

// TODO: work on
function expandProject(projectID) {
    let proj = document.getElementById(projectID)
    if (proj.classList.contains("maximized")) {
        proj.classList.replace("maximized", "minimized")
    }
    else {
        proj.classList.replace("minimized", "maximized")
    }

}

// Play CSS animations
const options = {
    root: null,
    threshold: 0.3,
    rootMargin: "0px",
  }
for (let e of document.querySelectorAll(".frombelow")) {
    new IntersectionObserver(entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting){
            e.style.animation = "frombelow 1s ease 0s 1 normal both"
        }
    }, options).observe(e)
}

for (let e of document.querySelectorAll(".fromleft")) {
    new IntersectionObserver(entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting){
            e.style.animation = "fromleft 1.2s ease 0s 1 normal both"
        }
    }, options).observe(e)
}

for (let e of document.querySelectorAll(".fromright")) {
    new IntersectionObserver(entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting){
            e.style.animation = "fromright 1.2s ease 0s 1 normal both"
        }
    }, options).observe(e)
}

for (let e of document.querySelectorAll(".fadein")) {
    new IntersectionObserver(entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting){
            e.style.animation = "fadein 1.2s ease 0s 1 normal both"
        }
    }, options).observe(e)
}

for (let e of document.querySelectorAll(".textclip")) {
    new IntersectionObserver(entries => {
        console.log(entries[0].isIntersecting)
        if (entries[0].isIntersecting){
            e.style.animation = "textclip 1.5s ease 0.3s 1 normal both"
        }
    }, options).observe(e)
}