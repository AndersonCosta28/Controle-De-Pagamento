import { app } from "./app";

process.env.TZ = 'America/Bahia';

app.listen(3000, () => {
    console.log('Listening 3000')
});