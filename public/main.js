div = document.createElement("div");
input = document.createElement("input");
input.type = "file";
input.accept = "image/*";
input.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) throw new Error("File not found")
    const formData = new FormData()
    formData.append("file", file)
    await Server.POSTFormData("", file).then((response) => {
        console.log(response)
    })
}
div.appendChild(input)
document.body.appendChild(div)
