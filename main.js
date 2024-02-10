import { sceneConfigurations } from "./components/sceneConfigurations.js";

const questWindow = document.querySelector(".quest");
const questBackground = questWindow.querySelector(".quest__background");
const questBackgroundImage = questBackground.querySelector(".quest__background-image");
const questBtnsContainer = questWindow.querySelector(".quest__btns");
const questDialogue = questWindow.querySelector(".quest__dialogue");
let sceneCounter = 0;

function switchScene() {
    if (sceneCounter < sceneConfigurations.length) {
        questBackgroundImage.src = sceneConfigurations[sceneCounter].background;
        questDialogue.textContent = sceneConfigurations[sceneCounter].dialogue;
        questBtnsContainer.innerHTML = '';
        sceneConfigurations[sceneCounter].btns.map((btn) => {
            const btnElement = document.createElement("div");
            btnElement.className = "quest__btns-item";
            btnElement.textContent = btn;
            btnElement.addEventListener('click', switchScene);
            questBtnsContainer.append(btnElement);
        });
        sceneCounter++;
    } else {
        const btns = document.querySelectorAll('.quest__btns-item');
        btns.forEach(btn => {
            btn.removeEventListener('click', switchScene);
        });
    }
}

switchScene();