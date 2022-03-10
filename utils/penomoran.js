import DBConnection from "../db/connection.js";
import util from 'util';

const formatNomorDokumen=(penomoran)=>{
    penomoran.formatted=`${penomoran.kode_prefix}.${new Date(penomoran.dokumen_date).getFullYear()}/${new Date(penomoran.dokumen_date).getMonth()+1}/${new Date(penomoran.dokumen_date).getDate()}-${penomoran.nomor}`
    return penomoran
}

export const getNomor=async(typeID,company_id)=>{
    let penomoranQuery=`
        SELECT 
        pd.*,sc.*,
        sc.name AS company_name,
        pd.created_at AS dokumen_date,
        pdt.kode_prefix
        FROM penomoran_dokumen AS pd
        LEFT JOIN subsidiary_company AS sc
            ON sc.id=pd.company_id 
        LEFT JOIN penomoran_dokumen_type AS pdt
            ON pd.penomoran_dokumen_type_id=pdt.id
        WHERE
            penomoran_dokumen_type_id=? 
            AND YEAR(pd.created_at)=YEAR(CURDATE()) 
            AND MONTH(pd.created_at)=MONTH(CURDATE()) 
            AND DAY(pd.created_at)=DAY(CURDATE())
            AND pd.company_id=?
        ORDER BY pd.id DESC
        LIMIT 1
    `
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes=await query(penomoranQuery,[typeID,company_id])
    if(queryRes.length == 0){
        penomoranQuery=await query(`
            SELECT * FROM penomoran_dokumen_type
            WHERE id=?
        `,[typeID])
        queryRes.kode_prefix=penomoranQuery[0].kode_prefix
        queryRes.nomor=1;
        queryRes.dokumen_date=new Date();
        queryRes=formatNomorDokumen(queryRes)
        return queryRes
    }
    queryRes=queryRes[0]
    if(queryRes.nomor == null){
        queryRes.nomor=1;
        queryRes.dokumen_date=new Date();
        queryRes=formatNomorDokumen(queryRes)
        return queryRes
    }
    queryRes.nomor+=1
    queryRes=formatNomorDokumen(queryRes)
    return queryRes
}

export const createNomor=async(typeID,nomor,company_id)=>{
    let penomoranQuery=`
        INSERT INTO
        penomoran_dokumen
        (penomoran_dokumen_type_id,nomor,company_id)
        VALUES (?,?,?)
    `
    const query=util.promisify(DBConnection.query).bind(DBConnection)
    let queryRes=await query(penomoranQuery,[typeID,nomor,company_id])
    return queryRes[0]
}