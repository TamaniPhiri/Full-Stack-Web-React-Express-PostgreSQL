import pg from 'pg';

const pool=pg.pool({
    host: 'localhost',
    user: 'root',
    password: 'Troi1576',
    database:'users',
})