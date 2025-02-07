const slowRequest = async (req, res) => {
    const delay = Math.floor(Math.random() * 4000) + 1000; // 1-5 seconds delay
    await new Promise(resolve => setTimeout(resolve, delay));
    res.json({ message: "Slow response", delay: `${delay}ms` });
};

const fastRequest = async (req, res) => {
    const delay = Math.floor(Math.random() * 1000); // 0-1 second delay
    await new Promise(resolve => setTimeout(resolve, delay));
    res.json({ message: "Fast response", delay: `${delay}ms` });
};

const errorRequest = async (req, res) => {
    res.status(500).json({ error: "Something went wrong!" });
};

const rouletteRequest = async (req, res) => {
    const shouldError = Math.random() < 0.5; // 50% chance of error
    if (shouldError) {
        res.status(500).json({ error: "Roulette request failed!" });
    } else {
        const delay = Math.floor(Math.random() * 5000); // 0-5 seconds delay
        await new Promise(resolve => setTimeout(resolve, delay));
        res.json({ message: "Roulette success", delay: `${delay}ms` });
    }
};

module.exports = {
    slowRequest,
    fastRequest,
    errorRequest,
    rouletteRequest
};
