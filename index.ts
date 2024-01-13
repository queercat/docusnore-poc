import { Docusnore } from "docusnore";

const express = require("express");
const store = new Docusnore("store.docusnore");

const app = express();

type Count = {
    count: number;
};

app.get("/", async (req, res) => {
    if (!(await store.get("visitors"))) {
        await store.add<Count>("visitors", { count: 1 })
    }

    const count = await store.first<Count>("visitors");

    if (!count) {
        res.send("Error");
        return;
    }

    await store.update<Count>("visitors", ({count: count.count + 1}));

    res.send(`You are visitor number: <b>${count.count + 1}</b>`);
});

app.listen(3000, async () => {
    await store.initStore();
    console.log("Listening on port 3000");
});
