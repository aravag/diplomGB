import { sceneConfigurations } from "./components/sceneConfigurations.js";
import { preloadImages, images, updateProgress } from "./components/imagePreloader.js";

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
let userName;
let response = [];
let chars = {};
let printTimeout;

function switchScene() {
    if (sceneCounter < sceneConfigurations(userName, chars).length) {
        const currentScene = sceneConfigurations(userName, chars)[sceneCounter];
        const currentDialogue = currentScene.dialogues[dialogueCounter];
        const questBtns = questWindow.querySelectorAll(".quest__btns-item");
        if (questBtns.length > 0) {
            questBtns.forEach((btn) => {
                btn.style.opacity = "0";
            });
            setTimeout(() => {
                questBtnsContainer.innerHTML = "";
                handleQuizPart(currentDialogue);
            }, 300);
        }
        if (currentScene.background) {
            questBackgroundImage.src = currentScene.background;
        }
        questDialogue.textContent = "";
        printText(currentDialogue.dialogue[0], questDialogue, () => addBtns(currentDialogue));

        const textStorytellerElem = document.querySelector(".quest__text-storyteller");
        const storytellerImageElem = document.querySelector(".quest__storyteller-image");
        if (currentDialogue.storyteller) {
            if (!textStorytellerElem) {
                const storytellerElem = document.createElement("div");
                storytellerElem.className = "quest__text-storyteller";
                storytellerElem.textContent = currentDialogue.storyteller.name;
                questTextContainer.prepend(storytellerElem);
            } else {
                textStorytellerElem.textContent = currentDialogue.storyteller.name;
            }
            if (!currentDialogue.storyteller.image && storytellerImageElem) {
                storytellerImageElem.remove();
            } else {
                if (!storytellerImageElem) {
                    const storytellerImage = document.createElement("img");
                    storytellerImage.className = "quest__storyteller-image";
                    storytellerImage.src = currentDialogue.storyteller.image;
                    questWindow.append(storytellerImage);
                    fadeIn(storytellerImage);
                } else {
                    storytellerImageElem.src = currentDialogue.storyteller.image;
                }
                handlePersonPosition(currentDialogue.storyteller, ".quest__storyteller-image");
            }
        } else {
            if (textStorytellerElem && storytellerImageElem) {
                textStorytellerElem.remove();
                fadeOut(storytellerImageElem);
            }
        }

        const charImageElem = document.querySelector(".quest__char-image");
        if (currentDialogue.char) {
            if (!charImageElem) {
                const charImage = document.createElement("img");
                charImage.className = "quest__char-image";
                charImage.src = currentDialogue.char.image;
                questWindow.append(charImage);
                fadeIn(charImage);
            } else {
                charImageElem.src = currentDialogue.char.image;
            }
            handlePersonPosition(currentDialogue.char, ".quest__char-image");
        } else {
            if (charImageElem) {
                fadeOut(charImageElem);
            }
        }

        if (dialogueCounter < currentScene.dialogues.length - 1) {
            dialogueCounter++;
        } else {
            dialogueCounter = 0;
            sceneCounter++;
        }
    } else {
        const storytellerImageElem = document.querySelector(".quest__storyteller-image");
        const charImageElem = document.querySelector(".quest__char-image");
        if (storytellerImageElem && charImageElem) {
            storytellerImageElem.style.opacity = "0";
            charImageElem.style.opacity = "0";
        }
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
            questResultBtns.addEventListener("click", ({ target }) => {
                if (target.closest(".quest__result-btns-item")) {
                    if (target.closest("#result-btn__startover")) {
                        resetQuest();
                        switchScene();
                    } else if (target.closest("#result-btn__end")) {
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
        }, index * 20);
    });
}

function addBtns(currentDialogue) {
    currentDialogue.btns.map((btn, index) => {
        const btnElement = document.createElement("div");
        btnElement.className = "quest__btns-item";
        btnElement.textContent = btn;
        btnElement.addEventListener("click", () => {
            if (sceneCounter !== 0 && dialogueCounter === 0) {
                createOverlay();
                setTimeout(() => {
                    fadeOut(questWindow.querySelector(".quest__overlay"));
                    switchScene();
                }, 400);
            } else {
                switchScene();
            }
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
        fadeIn(btnElement);
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
        fadeIn(questWindow.querySelector(".quest__action-img"));
    } else {
        questWindow.setAttribute("istest", "false");
        const questActionImg = document.querySelector(".quest__action-img");
        if (questActionImg) {
            fadeOut(questActionImg);
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

    const textStorytellerElem = questWindow.querySelector(".quest__text-storyteller");
    const storytellerImageElem = questWindow.querySelector(".quest__storyteller-image");
    const charImageElem = questWindow.querySelector(".quest__char-image");

    if (textStorytellerElem && storytellerImageElem) {
        textStorytellerElem.remove();
        storytellerImageElem.remove();
    }

    if (charImageElem) {
        charImageElem.remove();
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

function handlePopUp(container, button, className, target) {
    const popupContainer = questWindow.querySelector(container);

    if (popupContainer && !target.closest(container) && !target.closest(button)) {
        popupContainer.remove();
        questWindow.classList.remove(className);
    }
}

function handleConfirmButtons(container, className) {
    if (questWindow.classList.contains(className)) {
        const confirmContainer = questWindow.querySelector(container);

        if (confirmContainer) {
            questWindow.classList.remove(className);
            confirmContainer.remove();
        }
    }
}

function checkAndStartQuiz() {
    if (questCharacterInput.value == "") {
        questCharacterInput.classList.add("error");
    } else {
        createOverlay();
        setTimeout(() => {
            fadeOut(questWindow.querySelector(".quest__overlay"));
            if (questCharacterInput.classList.contains("error")) {
                questCharacterInput.classList.remove("error");
            }
            handleCharacterPage(false);
            userName = questCharacterInput.value;
            switchScene();
        }, 400);
    }
}

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

function fadeOut(element, callback = () => {}) {
    element.style.opacity = "0";
    setTimeout(() => {
        element.remove();
        callback();
    }, 400);
}

function fadeIn(element, delay = 10) {
    setTimeout(() => {
        element.style.opacity = "1";
    }, delay);
}

function init() {
    startBtn.addEventListener("click", () => {
        if (!questWindow.classList.contains("active")) {
            questBackgroundImage.src = "./images/bg1.png";
            questWindow.classList.add("active");
            fadeIn(questWindow, 100);
            preloader(() => {
                console.log("done");
                handleCharacterPage(true);
                questCharacterParts[0].classList.add("active");
            });
        }
    });

    questFirstPartBtn.addEventListener("click", activateNextPart);
    chooseCharacterBtns.forEach((item, index) =>
        item.addEventListener("click", () => {
            activateNextPart();
            index === 0 ? (chars = images.charBoy) : (chars = images.charGirl);
        })
    );

    startQuiz.addEventListener("click", () => {
        checkAndStartQuiz();
    });

    questCharacterInput.addEventListener("keydown", ({ key }) => {
        if (key === "Enter") checkAndStartQuiz();
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

            questWindow.addEventListener("click", ({ target }) => handlePopUp(".quest__confirm", ".quest__controls-close", "confirm", target));
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

            questWindow.addEventListener("click", ({ target }) => handlePopUp(".quest__info", ".quest__controls-info", "info", target));
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

function createOverlay() {
    if (!questWindow.querySelector(".quest__overlay")) {
        const overlay = document.createElement("div");
        overlay.classList.add("quest__overlay");
        questWindow.append(overlay);
        fadeIn(overlay);
    }
}

function preloader(callback) {
    questWindow.insertAdjacentHTML(
        "beforeend",
        `<div class="quest__preloader">
            <div class="quest__preloader-container">
                <div class="quest__preloader-progress"></div>
            </div>
        </div>`
    );

    preloadImages(images, () => {
        setTimeout(() => {
            fadeOut(questWindow.querySelector(".quest__preloader"));
            callback();
        }, 500);
    });
}
