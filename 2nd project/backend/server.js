const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/solution", async (req, res) => {
    try {
        const { num1, num2, operation } = req.body;
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);
        let result;

        switch (operation) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
            case '/':
                result = number1 / number2;
                break;
            default:
                return res.status(400).json({ error: 'Invalid operation' });
        }

        // Send the result back to the client
        res.status(200).json({ result: result });
    } catch (error) {
        // Send a meaningful error message
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
