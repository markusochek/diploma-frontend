let host = "localhost:3000";

div = document.createElement("div");
input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
input.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) throw new Error("File not found")
    const formData = new FormData()
    formData.append("file", file)
    await Server.POST("", formData).then((response) => {
        console.log(response)
    })
    // await fetch("http://localhost:3000/", {
    //     method: "POST",
    //     body: formData,
    // }).then((response) => {
    //     console.log(response)
    // })
}
div.appendChild(input)
document.body.appendChild(div)
