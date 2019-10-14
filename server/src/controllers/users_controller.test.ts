import * as request from 'supertest';
import Menda from '../app';

describe('Users controller', () => {
    describe('index page', () => {
        it('succeeds', (done) => {
            request(Menda)
                .get('/users')
                .set('Accept', 'application/json')
                .expect(200, done);
        });
    });
});
