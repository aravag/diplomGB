async function postJSON(data) {
    try {
        const response = await fetch("https://github.com/AAR89/test/blob/main/test.json");
        //     method: "POST", // or 'PUT'
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        //   });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

const data = { username: "example" };
postJSON(data);


postJSON(data)