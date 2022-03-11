import DBConnection from "../../db/connection.js"

export const getKamar = (req, res)=>{
    let query  = 
    `
    SELECT jk.name AS nama_jenis_kamar, k.* FROM kamar AS k 
    LEFT JOIN jenis_kamar AS jk 
    ON jk.id = k.jenis_kamar 
    `
    DBConnection.query(query,  (err, result )=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}

export const createKamar = (req,res)=>{
    const data = req.body
    let query = 
    `
    INSERT INTO kamar (name, jenis_kamar, max_kapasitas) VALUES ?
    `
    let dataQuery = [
        data.name,
        data.jenis_kamar,
        data.max_kapasitas
    ]
    DBConnection.beginTransaction()
    DBConnection.query(query, [[dataQuery]], (err, result )=>{
        if(err) throw err
        let inv = []
        query = `INSERT INTO inventory_kamar (kamar_id, nama) VALUES ?`
        for(let key of data.inventory){
            inv.push([result.insertId, key])
        }
        DBConnection.query(query, [inv], (err, result)=>{
            if (err) throw err
            DBConnection.commit()
            res.status(201).send({
                "status" : 1,
                "result": result
            })
        })
    })
}

export const deletekamar = (req, res)=>{
    const id = req.params.id

    let query = 
    `
    DELETE FROM kamar WHERE id = ?
    `

    DBConnection.query(query, [id], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status": 1,
            "result": result
        })
    })
}

export const getJenisKamar = (req,res)=>{
    let query = 
    `
    SELECT * FROM jenis_kamar
    `

    DBConnection.query(query, (err, result)=>{
        if(err) throw err
        res.status(200).send({
            "status": 1,
            "result": result
        })
    })
}

export const createJenisKamar = (req, res)=>{
    const data = req.body
    
    let query = 
    `
    INSERT INTO jenis_kamar (name, harga_kamar) VALUES ?
    `
    let dataQuery = [
        data.name,
        data.harga_kamar
    ]
    DBConnection.query(query, [dataQuery], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status": 1,
            "result": result
        })
    })
}

export const deleteJenisKamar = (req,res)=>{    
    let query = 
    `
    DELETE FROM jenis_kamar WHERE id = ?
    `
    let dataQuery = [
        req.params.id
    ]
    DBConnection.query(query, [dataQuery], (err, result)=>{
        if (err) throw err
        res.status(201).send({
            "status": 1,
            "result": result
        })
    })
}