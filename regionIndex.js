const { createWorker } = require('tesseract.js');

const worker = createWorker();
const rectangles = [
    {
        left: 50,
        top: 350,
        width: 250,
        height: 50,
    },
    {
        left: 90,
        top: 390,
        width: 250,
        height: 30,
    },
    {
        left: 90,
        top: 650,
        width: 100,
        height: 20,
    },
    {
        left: 90,
        top: 710,
        width: 100,
        height: 20,
    },
    {
        left: 40,
        top: 990,
        width: 400,
        height: 30,
    },
];

(async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const values = [];
    for (let i = 0; i < rectangles.length; i++) {
        const { data: { text } } = await worker.recognize('uploads/SBI-Life-Insurance-Surrender-Form-2.jpg', { rectangle: rectangles[i] });
        values.push(text);
    }
    console.log(values);
    await worker.terminate();
})();