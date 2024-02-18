import { sceneConfigurations } from "./components/sceneConfigurations.js";
import { charBoy, charGirl } from "./components/imagePreloader.js";

const startBtn = document.querySelector(".start-quest__btn");
const closeQuest = document.querySelector(".quest__controls-close");
const questWindow = document.querySelector(".quest");
const questCharacterPage = questWindow.querySelector(".quest__character");
const startQuiz = questCharacterPage.querySelector(".quest__character-start");
const questCharacterParts = questCharacterPage.querySelectorAll(".quest__character-part");
const questFirstPartBtn = questWindow.querySelector(".quest__character-begin");
const chooseCharacterBtns = document.querySelectorAll(".quest__character-item");
const questCharacterInput = questCharacterPage.querySelector(".quest__character-input");
const questBackground = questWindow.querySelector(".quest__background");
const questBackgroundImage = questBackground.querySelector(".quest__background-image");
const questBtnsContainer = questWindow.querySelector(".quest__btns");
const questTextContainer = questWindow.querySelector(".quest__text");
const questDialogue = questTextContainer.querySelector(".quest__text-dialogue");
const resultResponse = [0, 1, 0, 1, 2, 1, 1, 1, 0, 2, 2, 2, 1, 2];
let response = [];
let sceneCounter = 0;
let dialogueCounter = 0;
let userName;
let charArr;

function switchScene() {
    if (sceneCounter < sceneConfigurations(userName, charArr).length) {
        const currentScene = sceneConfigurations(userName, charArr)[sceneCounter];
        const currentDialogue = currentScene.dialogues[dialogueCounter];
        questBackgroundImage.src = currentScene.background;
        questDialogue.textContent = currentDialogue.dialogue;
        if (currentDialogue.isTestBtns) {
            questWindow.setAttribute("istest", "true");
            const questContainer = document.querySelector(".quest__btns");
            questContainer.insertAdjacentHTML(
                "beforebegin",
                `<div class="quest__action-img">
                    <img src="${currentDialogue.actionImage}" alt="action image">
                </div>`
            );
        } else {
            questWindow.setAttribute("istest", "false");
            const questActionImg = document.querySelector(".quest__action-img");
            if (questActionImg) {
                questActionImg.remove();
            }
        }
        if (currentDialogue.storyteller) {
            if (!document.querySelector(".quest__text-storyteller")) {
                const storytellerElem = document.createElement("div");
                storytellerElem.className = "quest__text-storyteller";
                storytellerElem.textContent = currentDialogue.storyteller;
                questTextContainer.prepend(storytellerElem);
            } else {
                document.querySelector(".quest__text-storyteller").textContent = currentDialogue.storyteller;
            }
        } else {
            if (document.querySelector(".quest__text-storyteller")) {
                document.querySelector(".quest__text-storyteller").remove();
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
        const correctAnswers = response.reduce((count, userAnswer, index) => {
            const correctAnswer = resultResponse[index];
            return userAnswer === correctAnswer ? count + 1 : count;
        }, 0);
        questBtnsContainer.innerHTML = "";
        questTextContainer.style.display = "none";
        questBackgroundImage.src = "./images/bg1.png";
        questWindow.insertAdjacentHTML(
            "beforeend",
            `<div class="quest__result">
                <h2 class="quest__result-title">${(correctAnswers / resultResponse.length) * 100 < 50 ? `${userName}, попробуй еще раз.` : `Молодец, ${userName}!`}</h2>
                <p class="quest__result-finals">
                    Количество правильных ответов: ${correctAnswers} из ${resultResponse.length}.
                </p>
                <div class="quest__result-btns">
                    <div class="quest__result-btns-item" id="result-btn__startover">
                        Начать сначала
                    </div>
                    <div class="quest__result-btns-item" id="result-btn__end">
                        Завершить
                    </div>
                </div>
            </div>`
        );
        const questResultBtns = questWindow.querySelector(".quest__result-btns");
        questResultBtns.addEventListener("click", (event) => {
            if (event.target.closest(".quest__result-btns-item")) {
                if (event.target.closest("#result-btn__startover")) {
                    resetQuest();
                } else if (event.target.closest("#result-btn__end")) {
                    completeQuest();
                }
                questWindow.querySelector(".quest__result").remove();
                questTextContainer.style.display = "";
            }
        });
    }
}

function handleCharacterPage(bool) {
    bool ? questCharacterPage.classList.add("active") : questCharacterPage.classList.remove("active");
    questDialogue.style.display = bool ? "none" : "";
    questBtnsContainer.style.display = bool ? "none" : "";
    handleCharactersParts();
}

function handleCharactersParts() {
    questCharacterParts.forEach((part) => {
        if (part.classList.contains("active")) {
            part.classList.remove("active");
        }
    });
}

function activateNextPart() {
    const currentPart = questWindow.querySelector(".quest__character-part.active");
    if (currentPart) {
        currentPart.classList.remove("active");
        const nextPart = currentPart.nextElementSibling;
        if (nextPart) {
            nextPart.classList.add("active");
        }
    }
}

function completeQuest() {
    if (questWindow.classList.contains("active")) {
        questWindow.style.opacity = "0";
        setTimeout(() => {
            questWindow.classList.remove("active");
            resetQuest();
        }, 400);
    }
}

function resetQuest() {
    sceneCounter = 0;
    dialogueCounter = 0;
    response = [];
    switchScene();
}

function init() {
    startBtn.addEventListener("click", () => {
        if (!questWindow.classList.contains("active")) {
            questBackgroundImage.src = "./images/bg1.png";
            handleCharacterPage(true);
            questWindow.classList.add("active");
            questCharacterParts[0].classList.add("active");
            setTimeout(() => {
                questWindow.style.opacity = "1";
            }, 100);
        }
    });

    questFirstPartBtn.addEventListener("click", activateNextPart);
    chooseCharacterBtns.forEach((item, index) =>
        item.addEventListener("click", () => {
            activateNextPart();
            index == 0 ? (charArr = charBoy) : (charArr = charGirl);
        })
    );

    startQuiz.addEventListener("click", () => {
        if (questCharacterInput.value == "") {
            questCharacterInput.classList.add("error");
        } else {
            if (questCharacterInput.classList.contains("error")) {
                questCharacterInput.classList.remove("error");
            }
            handleCharacterPage(false);
            userName = questCharacterInput.value;
            switchScene();
        }
    });

    closeQuest.addEventListener("click", () => {
        questWindow.insertAdjacentHTML(
            "beforeend",
            `<div class="quest__confirm">
                <h3 class="quest__confirm-title">Точно хочешь уйти? <br> Прогресс сбросится...</h3>
                <div class="quest__confirm-btns">
                    <div class="quest__confirm-btns-item" id="confirm__yes">
                        <img src="./images/yes.svg" alt="yes">
                    </div>
                    <div class="quest__confirm-btns-item" id="confirm__no">
                        <img src="./images/no.svg" alt="no">
                    </div>
                </div>
            </div>`
        );

        questWindow.classList.add("confirm");

        document.getElementById("confirm__yes").addEventListener("click", () => {
            questWindow.querySelector(".quest__confirm").remove();
            completeQuest();
            questWindow.classList.remove("confirm");
        });

        document.getElementById("confirm__no").addEventListener("click", () => {
            questWindow.querySelector(".quest__confirm").remove();
            questWindow.classList.remove("confirm");
        });

        questWindow.addEventListener("click", (event) => {
            if (questWindow.querySelector(".quest__confirm") && !event.target.closest(".quest__confirm") && !event.target.closest(".quest__controls-close")) {
                questWindow.querySelector(".quest__confirm").remove();
                questWindow.classList.remove("confirm");
            }
        });
    });
}

init();
