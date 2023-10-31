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
        glitchEffect(e, 50)
    }).observe(e)
}


const hiddenTexts = [["COMPUTER-SCIENCE-STUDENT", 88], ["NEW-YORKER", 252], ["POLISH", 300], ["PROGRAMMER", 455], ["PERSISTANT", 5], ["COLLABORATIVE", 170]]

function matrixEffect() {
    const effect = document.getElementById("effect");
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
matrixEffect();


// Projects
const projects = [
    {
        "name": "AI Character Generator",
        "link": "https://github.com/PaulShiLi/rpgGenerate-SpaceInvaders",
        "thumbnail": "images/character-gen/home.png",
        "text": `<p>Over the summer of '22, I worked with a team of 5 others to train natural language processing AI models to make an RPG character generator. The generator would be split up to three different AI models: Backstory, Personality, and Physical Descriptions. In addition to this, we only had two weeks to do it.</p>

        <p>To get the large amount of training data for out models we had to scrape through countless websites, Dungeons & Dragons rulebooks, and even GPT-3 generated responses. After, we used the aitextgen Python library to train our Distil GPT-2 models on these datasets. This process took countless hours and sometimes even days.</p>
        
        <p>To deploy these AI models for use, we then created a website using the Django framework and a Discord Bot. If you want to try our AI models you can run either the website or Discord bot from our GitHub.</p>`
    },
    {
        "name": "3D Engine in Java",
        "link": "https://github.com/kacperlet/3D-Engine-Java",
        "thumbnail": "images/3D-engine/cylinder.png",
        "text": `<p>As a challenging side-project, I attempted to create my own 3D engine with Java and it's built in 2D graphics library.</p>

        <p>To create a simple cube, it required me to create a projection function that returns a transformed X and Y when given a Z value. Then, I researched rotational matrices and applied them to my program to rotate them on any axis.</p>
        
        <p>After, I created other three dimensional shapes with customizable parameters such as heigth, length, and width. One of my more customizable function also takes a value n to create an n-sided polyonal prism. This allowed me to easily create a simple triangular prism or a pentadecagonal prism.</p>
        `
    },
    {
        "name": "Lightsaber CSS",
        "link": "https://github.com/kacperlet/lightsaber",
        "thumbnail": "images/lightsaber/two.png",
        "text": `<p>After becoming more adept at web development and using CSS I decided to test my CSS skills by creating a ligthsaber with pure CSS. No images were used at all.</p>

        <p>In less than two days I was able to create a ligthsaber with customizable colors, a retractable blade, a way to swing it using JavaScript, and audio cues for when you do swing it.</p>
        
        <p>You can access a live demo of it below.</p>
        `
    }
]

const projectsPage = document.getElementById("projects")
function showProject(project) {

    element = `
    <div class="project">
        <div class="info">
            <div>
                <h2>${project["name"]}</h2>
                <a href="${project["link"]}">${project["link"]}</a>
            </div>
            <div class="text">
                ${project["text"]}
            </div>
        </div>
        <div class="thumbnail">
            <img src="${project["thumbnail"]}">
        </div>
    </div>
    `
    projectsPage.innerHTML += element
}

for (let p of projects) {
    showProject(p)
}