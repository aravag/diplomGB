import { sceneConfigurations } from "./components/sceneConfigurations.js";
import { charBoy, charGirl } from "./components/imagePreloader.js";

const startBtn = document.querySelector(".start-quest__btn");
const closeQuest = document.querySelector(".quest__controls-close");
const questInfo = document.querySelector(".quest__controls-info");
const questWindow = document.querySelector(".quest");
const questCharacterPage = questWindow.querySelector(".quest__character");
const startQuiz = questCharacterPage.querySelector(".quest__character-start");
const questCharacterParts = questCharacterPage.querySelectorAll(".quest__character-part");
const questFirstPartBtn = questWindow.querySelector(".quest__character-begin");
const chooseCharacterBtns = document.querySelectorAll(".quest__character-item");
const questCharacterInput = questCharacterPage.querySelector(".quest__character-input");
const questBackground = questWindow.querySelector(".quest__background");
const questBackgroundImage = questBackground.querySelector(".quest__background-image");
const navContainer = questWindow.querySelector(".quest__nav-container");
const questBtnsContainer = questWindow.querySelector(".quest__btns");
const questTextContainer = questWindow.querySelector(".quest__text");
const questDialogue = questTextContainer.querySelector(".quest__text-dialogue");
const arrows = questWindow.querySelectorAll(".arrow");
let sceneCounter = 0;
let dialogueCounter = 0;
let resultResponse = [];
let response = [];
let userName;
let charArr = [];
let printTimeout;

function switchScene() {
    if (sceneCounter < sceneConfigurations(userName, charArr).length) {
        const currentScene = sceneConfigurations(userName, charArr)[sceneCounter];
        const currentDialogue = currentScene.dialogues[dialogueCounter];
        if (questWindow.querySelector(".quest__btns-item")) {
            questWindow.querySelectorAll(".quest__btns-item").forEach((btn) => {
                btn.style.opacity = "0";
            });
            setTimeout(() => {
                questBtnsContainer.innerHTML = "";
                handleQuizPart(currentDialogue);
            }, 300);
        }
        questBackgroundImage.src = currentScene.background;
        questDialogue.textContent = "";
        printText(currentDialogue.dialogue[0], questDialogue, () => addBtns(currentDialogue));
        if (currentDialogue.storyteller) {
            if (!document.querySelector(".quest__text-storyteller") && !document.querySelector(".quest__storyteller-image")) {
                const storytellerElem = document.createElement("div");
                storytellerElem.className = "quest__text-storyteller";
                storytellerElem.textContent = currentDialogue.storyteller.name;
                questTextContainer.prepend(storytellerElem);

                const storytellerImage = document.createElement("img");
                storytellerImage.className = "quest__storyteller-image";
                storytellerImage.src = currentDialogue.storyteller.image;
                questWindow.append(storytellerImage);
                setTimeout(() => {
                    questWindow.querySelector(".quest__storyteller-image").style.opacity = "1";
                }, 10);
            } else {
                questWindow.querySelector(".quest__text-storyteller").textContent = currentDialogue.storyteller.name;
                questWindow.querySelector(".quest__storyteller-image").src = currentDialogue.storyteller.image;
            }
            handlePersonPosition(currentDialogue.storyteller, ".quest__storyteller-image");
        } else {
            if (questWindow.querySelector(".quest__text-storyteller") && questWindow.querySelector(".quest__storyteller-image")) {
                questWindow.querySelector(".quest__text-storyteller").remove();
                questWindow.querySelector(".quest__storyteller-image").style.opacity = "0";
                setTimeout(() => {
                    questWindow.querySelector(".quest__storyteller-image").remove();
                }, 400);
            }
        }
        if (currentDialogue.char) {
            if (!document.querySelector(".quest__char-image")) {
                const charImage = document.createElement("img");
                charImage.className = "quest__char-image";
                charImage.src = currentDialogue.char.image;
                questWindow.append(charImage);
                setTimeout(() => {
                    document.querySelector(".quest__char-image").style.opacity = "1";
                }, 10);
            } else {
                questWindow.querySelector(".quest__char-image").src = currentDialogue.char.image;
            }
            handlePersonPosition(currentDialogue.char, ".quest__char-image");
        } else {
            if (questWindow.querySelector(".quest__char-image")) {
                questWindow.querySelector(".quest__char-image").style.opacity = "0";
                setTimeout(() => {
                    questWindow.querySelector(".quest__char-image").remove();
                }, 400);
            }
        }
        if (dialogueCounter < currentScene.dialogues.length - 1) {
            dialogueCounter++;
        } else {
            dialogueCounter = 0;
            sceneCounter++;
        }
    } else {
        fetchAnswers(() => {
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
                        switchScene();
                    } else if (event.target.closest("#result-btn__end")) {
                        completeQuest();
                    }
                    questWindow.querySelector(".quest__result").remove();
                    questTextContainer.style.display = "";
                }
            });
        });
    }
}

function printText(text, textContainer, callback) {
    text = text.split("");
    text.map((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        textContainer.append(span);
        printTimeout = setTimeout(() => {
            span.style.opacity = "1";
            if (index === text.length - 1) {
                callback();
            }
        }, index * 30);
    });
}

function addBtns(currentDialogue) {
    currentDialogue.btns.map((btn, index) => {
        const btnElement = document.createElement("div");
        btnElement.className = "quest__btns-item";
        btnElement.textContent = btn;
        btnElement.addEventListener("click", () => {
            switchScene();
            if (currentDialogue.isTestBtns) {
                response.push(index);
                fetchAnswers(() => {
                console.log(index);
                console.log(resultResponse[response.length - 1]);
                if (index === resultResponse[response.length - 1]) {
                    console.log('да');
                    btnElement.style.boxShadow = "0 0 10px rgba(41, 189, 11, 0.8)";
                }
                else {
                    console.log('нет');
                    btnElement.style.boxShadow = "0 0 10px rgba(255, 38, 0, 0.8)";
                }})
            }
        });
        questBtnsContainer.append(btnElement);
        setTimeout(() => {
            btnElement.style.opacity = "1";
        }, 10);
    });
    handleArrowBtns();
}

function handleQuizPart(currentDialogue) {
    if (currentDialogue.isTestBtns) {
        questWindow.setAttribute("istest", "true");
        navContainer.insertAdjacentHTML(
            "beforebegin",
            `<div class="quest__action-img">
                <img src="${currentDialogue.actionImage}" alt="action image">
            </div>`
        );
        setTimeout(() => {
            questWindow.querySelector(".quest__action-img").style.opacity = "1";
        }, 10);
    } else {
        questWindow.setAttribute("istest", "false");
        const questActionImg = document.querySelector(".quest__action-img");
        if (questActionImg) {
            questActionImg.style.opacity = "0";
            setTimeout(() => {
                questActionImg.remove();
            }, 400);
        }
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
    if (questWindow.querySelector(".quest__text-storyteller") && questWindow.querySelector(".quest__storyteller-image")) {
        questWindow.querySelector(".quest__text-storyteller").remove();
        questWindow.querySelector(".quest__storyteller-image").remove();
    }
    if (questWindow.querySelector(".quest__char-image")) {
        questWindow.querySelector(".quest__char-image").remove();
    }
    clearTimeout(printTimeout);
}

 async function fetchAnswers(callback) {
    try {
        const answer = await fetch("answers.json");
        if (!answer.ok) {
            throw new Error("Не удалось получить ответы");
        }
        resultResponse = await answer.json();
        callback();
    } catch (error) {
        console.error(error);
    }
}

function handleArrowBtns() {
    if (questBtnsContainer.clientHeight < questBtnsContainer.scrollHeight) {
        if (questBtnsContainer.scrollTop <= 0) {
            arrows[0].style.opacity = "";
            arrows[1].style.opacity = "1";
        } else if (questBtnsContainer.scrollTop > 0 && questBtnsContainer.scrollTop + questBtnsContainer.clientHeight < questBtnsContainer.scrollHeight) {
            arrows[0].style.opacity = "1";
            arrows[1].style.opacity = "1";
        } else if (questBtnsContainer.scrollTop + questBtnsContainer.clientHeight >= questBtnsContainer.scrollHeight) {
            arrows[0].style.opacity = "1";
            arrows[1].style.opacity = "";
        }
    } else {
        arrows[0].style.opacity = "";
        arrows[1].style.opacity = "";
    }
}

function handlePopUp(container, button, className) {
    if (questWindow.querySelector(container) && !event.target.closest(container) && !event.target.closest(button)) {
        questWindow.querySelector(container).remove();
        questWindow.classList.remove(className);
    }
}

function handleConfirmButtons(container, className) {
    if (questWindow.classList.contains(className) && questWindow.querySelector(container)) {
        questWindow.classList.remove(className);
        questWindow.querySelector(container).remove();
    }
}

function checkAndStartQuiz() {
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
        checkAndStartQuiz();
    });

    questCharacterInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") checkAndStartQuiz();
    });

    closeQuest.addEventListener("click", () => {
        if (!questWindow.querySelector(".quest__confirm")) {
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
            if (!questWindow.classList.contains("confirm")) {
                questWindow.classList.add("confirm");
            }

            document.getElementById("confirm__yes").addEventListener("click", () => {
                handleConfirmButtons(".quest__confirm", "confirm");
                completeQuest();
            });

            document.getElementById("confirm__no").addEventListener("click", () => handleConfirmButtons(".quest__confirm", "confirm"));

            questWindow.addEventListener("click", (event) => handlePopUp(".quest__confirm", ".quest__controls-close", "confirm"));
        }
    });

    questInfo.addEventListener("click", () => {
        if (!questWindow.classList.contains("info")) {
            questWindow.classList.add("info");
        }
        if (!questWindow.querySelector(".quest__info")) {
            questWindow.insertAdjacentHTML(
                "beforeend",
                `<div class="quest__info">
                    <h2 class="quest__info-title">Some Title</h2>
                    <p class="quest__info-desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, deserunt? Inventore exercitationem laboriosam asperiores quidem. Dolore, repellendus quibusdam quam, at quia voluptatem optio mollitia rem error dolor, beatae soluta illum?
                        Fugiat unde mollitia quibusdam nemo ipsam esse cumque vitae facilis, iure sapiente nisi, aliquam incidunt pariatur aliquid, quisquam fuga odit quam dignissimos ullam distinctio? Vero quaerat amet ratione asperiores ullam?
                        Illo ad maxime non nesciunt!</p>
                    <div class="quest__info-close">
                        <img src="./images/close.svg" alt="no">
                    </div>
                </div>`
            );

            questWindow.querySelector(".quest__info-close").addEventListener("click", () => handleConfirmButtons(".quest__info", "info"));

            questWindow.addEventListener("click", (event) => handlePopUp(".quest__info", ".quest__controls-info", "info"));
        }
    });

    arrows.forEach((element) => {
        element.addEventListener("click", () => {
            if (element === arrows[0]) {
                questBtnsContainer.scrollTop -= element.clientHeight;
            } else {
                questBtnsContainer.scrollTop += element.clientHeight;
            }
        });
    });

    questBtnsContainer.addEventListener("scroll", handleArrowBtns);
    window.addEventListener("resize", handleArrowBtns);
}

init();

function handlePersonPosition(person, personClass) {
    const personImg = document.querySelector(personClass);
    if (person.position) {
        personImg.style.left = "";
        personImg.style.right = "";
        if (person.position.left === true) {
            personImg.style.left = person.position.offset + "%";
        } else {
            personImg.style.right = person.position.offset + "%";
        }
    } else {
        personImg.style.left = "";
        personImg.style.right = "";
    }
}