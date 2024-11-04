import app from './app.js'

const port = 3001;
app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
    console.log(`Clique em http://localhost:${port}`);
});