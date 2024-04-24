class Server {
    static host = "http://localhost:3000/";

    static async POST(path, formData) {
        let request = await fetch( this.host + `${path}`, {
            method: "POST",
            body: formData
        });
        return request.json();
    }

    static async GET(path) {
        let request = await fetch(`${path}`);
        return request.json();
    }
}