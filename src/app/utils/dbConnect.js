import mysql from 'mysql2/promise'

const dbConnect = async(query, values=[]) => {
    try {
        const connect = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DATABASE
        })

        const [results] = await connect.execute(query, values);
        connect.end;
        return results
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect