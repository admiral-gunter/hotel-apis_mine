import DBConnection from "../db/connection.js"
import util from 'util'

export const discountSpecial = async (jenis_kamar_id)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    var pricing
    let queryRes  = await query( 
    `
    SELECT harga_kamar FROM jenis_kamar
    WHERE id = ?
    `, [jenis_kamar_id])
    pricing = queryRes[0].harga_kamar - queryRes[0].harga_kamar * 20/100
    return pricing
}
const diskon = await discountSpecial(1)
console.log(diskon)

export const normalPrice = async (jenis_kamar_id)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes  = await query( 
    `
    SELECT harga_kamar FROM jenis_kamar
    WHERE id = ?
    `, [jenis_kamar_id])
    return queryRes[0].harga_kamar
}

const normal = await normalPrice(1)

console.log(normal);