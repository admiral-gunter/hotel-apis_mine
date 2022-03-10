import util from 'util'
import DBConnection from '../db/connection.js'

export const getAkunJurnalTarget=async(company_id,transaksi,proses)=>{
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes=await query(`
        SELECT akun_jurnal_id FROM company_transaksi_jurnal
        WHERE company_id=? AND transaksi_id=? AND transaksi_jurnal_proses_id=?
    `,[company_id,transaksi,proses])
    if(queryRes.length==0){
        return 0
    }
    return queryRes[0].akun_jurnal_id
}