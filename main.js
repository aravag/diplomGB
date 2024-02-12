import { sceneConfigurations } from "./components/sceneConfigurations.js";

const startBtn = document.querySelector(".start-quest__btn");
const closeQuest = document.querySelector(".quest__controls-close");
const questWindow = document.querySelector(".quest");
const questBackground = questWindow.querySelector(".quest__background");
const questBackgroundImage = questBackground.querySelector(".quest__background-image");
const questBtnsContainer = questWindow.querySelector(".quest__btns");
const questDialogue = questWindow.querySelector(".quest__dialogue");
const response = [];
let sceneCounter = 0;
let dialogueCounter = 0;

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
        const currentScene = sceneConfigurations[sceneCounter];
        const currentDialogue = currentScene.dialogues[dialogueCounter];
        questBackgroundImage.src = currentScene.background;
        questDialogue.textContent = currentDialogue.dialogue;
        if (currentDialogue.isTestBtns) {
            questBtnsContainer.setAttribute("hastestbtns", "true");
            const questActionImg = document.createElement("div");
            questActionImg.className = "quest__action-img";
            const questActionImgItem = document.createElement("img");
            questActionImgItem.src = currentDialogue.actionImage;
            questActionImg.append(questActionImgItem);
            questWindow.insertBefore(questActionImg, questBtnsContainer);
        } else {
            questBtnsContainer.setAttribute("hastestbtns", "false");
            const questActionImg = document.querySelector(".quest__action-img");
            if (questActionImg) {
                questActionImg.remove();
            }
        }
        questBtnsContainer.innerHTML = "";
        currentDialogue.btns.map((btn, index) => {
            const btnElement = document.createElement("div");
            btnElement.className = "quest__btns-item";
            btnElement.textContent = btn;
            btnElement.addEventListener("click", () => {
                switchScene();
                if (currentDialogue.isTestBtns) {
                    response.push(index);
                    console.log(response);
                }
            });
            questBtnsContainer.append(btnElement);
        });
        if (dialogueCounter < currentScene.dialogues.length - 1) {
            dialogueCounter++;
        } else {
            dialogueCounter = 0;
            sceneCounter++;
        }
    } else {
        questBtnsContainer.innerHTML = "";
    }
}

switchScene();
