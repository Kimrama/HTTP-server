const http = require("http");

const dataBase = [
    {
        id: 0,
        name: "Sir Isaac Newton",
    },
    {
        id: 1,
        name: "Albert Einstein",
    },
    {
        id: 2,
        name: "Nikola Tesla",
    },
];

const PORT = 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    const reqPath = req.url.split("/");
    const topic = reqPath[1];
    const index = reqPath[2];
    if (req.method === "GET") {
        if (topic === "friend") {
            if (index === undefined) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(dataBase));
            } else {
                if (index > dataBase.length) {
                    res.setHeader("Content-Type", "text/plain");
                    res.end("out of index!!");
                }
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(dataBase[index]));
            }
        } else {
            res.setHeader("Content-Type", "text/plain");
            res.end("Please defind Topic");
        }
    } else if (req.method === "POST") {
        req.on("data", (data) => {
            // console.log(JSON.parse(data));
            dataBase.push(JSON.parse(data));
            console.log(dataBase);
        });
    }
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
