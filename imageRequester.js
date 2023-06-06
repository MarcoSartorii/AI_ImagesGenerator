
const apiUrl = "https://api.openai.com/v1/images/generations";

const apiKey = "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";


let generateImages = async function(){

    requestText = document.getElementById("requesttext").value;
    numberOfImages = parseInt(document.getElementById("numberofimages").value);
    sizeSelect = document.getElementById("size-select");

    if(!requestText || requestText == "" || numberOfImages <1 || 
        numberOfImages > 10 || numberOfImages == "" 
        || numberOfImages !== numberOfImages)
    {
        console.log("Input error");
        return;
    }
    console.log("generating");

    selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
    size = selectedOption.text;

    const requestBody = {
        prompt: requestText,
        n: numberOfImages,
        size: size
    }

    response = 
        await fetch(
            apiUrl, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
            
                body: JSON.stringify(requestBody),
            })
            .then( (response) => response.json() )
            .then( (data) => {
                console.log(data.data)
                urls = data.data;
                console.log(urls);

                urls.forEach(url => {
                    const imgElement = document.createElement("img");
                    imgElement.src = url.url;
                    document.body.appendChild(imgElement);
                });


            }).catch((error) => {
                console.error("Error:", error);
            });
}
