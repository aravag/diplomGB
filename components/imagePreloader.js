export const imagePathsToPreload = {
    background: "./images/back1.png",
    char1: "./images/char1.1.svg",
    char2: "./images/char1.2.svg",
    actionImage: "./images/action1.svg",
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
