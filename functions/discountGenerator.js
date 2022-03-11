import DBConnection from "../db/connection.js"
import util from 'util'

export const discountSpecial = async (jenis_kamar_id)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes  = await query( 
    `
    SELECT harga_kamar FROM jenis_kamar
    WHERE id = ?
    `, [jenis_kamar_id])
    console.log(queryRes[0].harga_kamar - queryRes[0].harga_kamar * 20/100);
}

discountSpecial(1)

export const normalPrice = async (jenis_kamar_id)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes  = await query( 
    `
    SELECT harga_kamar FROM jenis_kamar
    WHERE id = ?
    `, [jenis_kamar_id])
    console.log(queryRes[0].harga_kamar);
}

normalPrice(1)