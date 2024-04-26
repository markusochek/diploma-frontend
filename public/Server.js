class Server {
    static host = "http://localhost:3000/";

    static async POST(path, object) {
        let request = await fetch( this.host + `${path}`, {
            method: "POST",
            body: JSON.stringify(object)
        });
        return request.json();
    }

    static async POSTFormData(path, file) {
        let request = await fetch(this.host + `${path}`, {
            method: "POST",
            body: file
        });
        return request.json();
    }

    static async GET(path) {
        let request = await fetch(`${path}`);
        return request.json();
    }
}