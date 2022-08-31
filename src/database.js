const { Pool } = require('pg');
function createPool() {
    const pool = new Pool({
        user: 'postgres',
        host: 'containers-us-west-44.railway.app',
        database: 'railway',
        password: '8M6hxHfKNokhI3Y4s2Zf',
        port: 6599,
    });
    return pool;
}

module.exports = {
    test: async function test(query) {
        const pool = createPool();
        return await pool.query(query);
    },
};