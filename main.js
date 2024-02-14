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
const userName = "Иван";

startBtn.addEventListener("click", () => {
    if (!questWindow.classList.contains("active")) {
        questWindow.classList.add("active");
        setTimeout(() => {
            questWindow.style.opacity = "1";
        }, 100);
    }
});

closeQuest.addEventListener("click", () => {
    document.body.insertAdjacentHTML(
        "beforeend",
        `<div class="quest__confirm">
            <h2 class="quest__confirm-title">Точно хочешь уйти? Прогресс сбросится...</h2>
            <div class="quest__confirm-btns">
                <div class="quest__confirm-btns-item" id="confirmBtnYes">Yep</div>
                <div class="quest__confirm-btns-item" id="confirmBtnNo">Nope</div>
            </div>
        </div>`
    );

    document.getElementById("confirmBtnYes").addEventListener("click", () => {
        console.log("Yes");
    });

    document.getElementById("confirmBtnNo").addEventListener("click", () => {
        console.log("No");
    });

    if (questWindow.classList.contains("active")) {
        questWindow.style.opacity = "0";
        setTimeout(() => {
            questWindow.classList.remove("active");
        }, 400);
    }
});

function switchScene() {
    if (sceneCounter < sceneConfigurations(userName).length) {
        const currentScene = sceneConfigurations(userName)[sceneCounter];
        const currentDialogue = currentScene.dialogues[dialogueCounter];
        questBackgroundImage.src = currentScene.background;
        questDialogue.textContent = currentDialogue.dialogue;
        if (currentDialogue.isTestBtns) {
            questWindow.setAttribute("istest", "true");
            const questActionImg = document.createElement("div");
            questActionImg.className = "quest__action-img";
            const questActionImgItem = document.createElement("img");
            questActionImgItem.src = currentDialogue.actionImage;
            questActionImg.append(questActionImgItem);
            questWindow.insertBefore(questActionImg, questBtnsContainer);
        } else {
            questWindow.setAttribute("istest", "false");
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
