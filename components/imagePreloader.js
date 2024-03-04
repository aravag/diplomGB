export const images = {
    bg: {
        bg1: "./images/bg1.png",
        bg2: "./images/bg2.png",
        bg3: "./images/bg3.png",
    },
    action: {
        actionImage1: "./images/1.png",
        actionImage2: "./images/2.png",
        actionImage3: "./images/3.png",
        actionImage4: "./images/4.png",
        actionImage5: "./images/5.png",
        actionImage6: "./images/6.png",
        actionImage7: "./images/7.png",
        actionImage8: "./images/8.png",
        actionImage9: "./images/9.png",
        actionImage10: "./images/10.png",
        actionImage11: "./images/11.png",
        actionImage12: "./images/12.png",
        actionImage13: "./images/13.png",
        actionImage14: "./images/14.png",
    },
    charBoy: {
        char1: "./images/charBoy1.png",
        char2: "./images/charBoy2.png",
    },
    charGirl: {
        char1: "./images/charGirl1.png",
        char2: "./images/charGirl2.png",
    },
    storytellers: {
        storyteller1: "./images/storyteller1.png",
        storyteller2: "./images/storyteller2.png",
    },
    elements: {
        mask1: "./images/maskImage.png",
        mask2: "./images/mask.png",
        arrow: "./images/arrow.svg",
        btnWrapper: "./images/btn.svg",
        dialogueWrapper: "./images/dialogue.svg",
        storytellerWrapper: "./images/storyteller.svg",
        no: "./images/no.svg",
        yes: "./images/yes.svg",
        close: "./images/close.svg",
        info: "./images/info.svg",
        progress: "./images/progress.svg",
    },
};

const imagesAsArray = Object.values(images).reduce((acc, category) => {
    Object.values(category).forEach((path) => acc.push(path));
    return acc;
}, []);

const totalLength = imagesAsArray.length;

export const preloadImages = (images, callback) => {
    let loadedImages = 0;
    let totalImages = 0;

    for (const entries in images) {
        for (const key in images[entries]) {
            if (images[entries].hasOwnProperty(key)) {
                totalImages++;
                const img = new Image();
                img.src = images[entries][key];
                img.onload = () => {
                    loadedImages++;
                    updateProgress(loadedImages, totalLength);
                    if (loadedImages === totalImages) {
                        callback();
                    }
                };
            }
        }
    }
};
export function updateProgress(loadedImages, totalLength) {
    const progress = document.querySelector(".quest__preloader-progress");
    progress.style.width = `${Math.round((loadedImages / totalLength) * 100)}%`;
}
