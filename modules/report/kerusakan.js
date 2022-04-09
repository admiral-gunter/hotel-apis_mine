import DBConnection from "../../db/connection"

export const reportKerusakan = (req, res)=>{
  const data = req.body
  let dataQuery = [
      data.jenis_kerusakan,
      data.keterangan,
      data.cause,
      req.user.id
  ]
  DBConnection.beginTransaction()
  DBConnection.query(`INSERT INTO tb_kerusakan_hotel (jenis_kerusakan, keterangan, cause, created_by) VALUES ?`, [[dataQuery]], function(err, results) {
    if (err) throw err
    let itemRusak = []
    for(let key of data.item_rusak){
      itemRusak.push([results.insertId, key])
    }
    DBConnection.query(`INSERT INTO tb_item_kerusakan (tb_kerusakan_hotel_id, name) VALUES ?`, [itemRusak], function(err, result) {
      if (err) throw err
      DBConnection.commit()
      return res.status(201).send({
        status:0,
        report : results,
        item_inserted:result
      })
    })
  })
}

export const checkingItemKamar = (req, res)=>{
    DBConnection.query(`UPDATE inventory_kamar SET kondisi_rusak = ? WHERE id = ?`)
}