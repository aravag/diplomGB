import { sceneConfigurations, userName, dialogsConfigurations } from "./components/sceneConfigurations.js";

const startBtn = document.querySelector(".start-quest__btn");
const closeQuest = document.querySelector(".quest__controls-close");
const questWindow = document.querySelector(".quest");
const questBackground = questWindow.querySelector(".quest__background");
const questBackgroundImage = questBackground.querySelector(".quest__background-image");
const questBtnsContainer = questWindow.querySelector(".quest__btns");
const questDialogue = questWindow.querySelector(".quest__dialogue");
const response = [];
let sceneCounter = 0;

startBtn.addEventListener("click", () => {
    if (!questWindow.classList.contains("active")) {
        questWindow.classList.add("active");
        setTimeout(() => {
            questWindow.style.opacity = "1";
        }, 100);
    }
});

closeQuest.addEventListener("click", () => {
    // сделать окно с вопросом
    if (questWindow.classList.contains("active")) {
        questWindow.style.opacity = "0";
        setTimeout(() => {
            questWindow.classList.remove("active");
        }, 400);
    }
});

function switchScene() {
    if (sceneCounter < sceneConfigurations.length) {
        questBackgroundImage.src = sceneConfigurations[sceneCounter].background;
        questDialogue.textContent = sceneConfigurations[sceneCounter].dialogue;
        questBtnsContainer.innerHTML = "";
        sceneConfigurations[sceneCounter].btns.map((btn, index) => {
            const btnElement = document.createElement("div");
            btnElement.className = "quest__btns-item";
            btnElement.textContent = btn;
            btnElement.addEventListener("click", () => {
                response.push(index);
                console.log(response);
                switchScene();
            });
            questBtnsContainer.append(btnElement);
        });
        sceneCounter++;
    } else {
        // const btns = document.querySelectorAll(".quest__btns-item");
        // btns.forEach((btn) => {
        //     btn.removeEventListener("click", callFunc);
        // });
        questBtnsContainer.innerHTML = "";
    }
}

switchScene();
