import app from './app';
import debug from './util/debug';
import { db } from './lib/db';

app.listen(app.get('port'), async () => {
    debug.log(`Node app is running on port: ${app.get('port')}`);
    try {
        await db.connect();
        debug.log('Connection to database successfully established.');
    } catch(err) {
        debug.error('Unable to connect to the database:', err);
    }

    // const result = await db.execute('select * from users');
    // debug.log(result);
});
