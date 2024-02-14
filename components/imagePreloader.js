export const imagePathsToPreload = {
    background1: "./images/bg1.png",
    background2: "./images/bg2.png",
    char1: "./images/char1.svg",
    char2: "./images/char2.svg",
    storyteller1: "./images/storyteller1.svg",
    storyteller2: "./images/storyteller2.svg",
    actionImage1: "./images/1.png",
    actionImage2: "./images/2.png",
    actionImage3: "./images/3.png",
    actionImage4: "./images/4.png",
    actionImage5: "./images/5.png",
    actionImage6: "./images/6.png",
    actionImage7: "./images/7.png",
    actionImage8: "./images/1.png",
    actionImage9: "./images/8.png",
    actionImage10: "./images/9.png",
    actionImage11: "./images/10.png",
    actionImage12: "./images/11.png",
    actionImage13: "./images/12.png",
    actionImage14: "./images/13.png",
};

export const preloadImages = (imagePathsToPreload, callback) => {
    const preloadedImages = {};
    const imagePromises = [];

    for (const key in imagePathsToPreload) {
        const path = imagePathsToPreload[key];
        const image = new Image();
        image.src = path;
        imagePromises.push(
            new Promise((resolve, reject) => {
                image.onload = () => {
                    preloadedImages[key] = image;
                    resolve();
                };
                image.onerror = () => {
                    reject();
                };
            })
        );
    }

    Promise.all(imagePromises)
        .then(() => {
            console.log("Изображения успешно предзагружены");
            if (typeof callback === "function") {
                callback(preloadedImages);
            }
        })
        .catch(() => {
            console.error("Ошибка при предзагрузке изображений");
        });
};
