const fs = require('fs');

const obj1 = {                                                                                                                                                    
    title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
}

const obj2 = {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
                                                                                                                                            
}

const obj3 = {
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                       
}

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
        this.id = 0
        this.data = []
    }

    async save(obj){
        try{
            await this.getAll()
            this.id++
            this.data.push({
                id: this.id,
                product: obj
            })
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.data)) 
            return this.id
        }catch(error){
            throw new Error(error.message)
        }
    }
    
    async getById(id){
        try{
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            if(data){
                this.data = JSON.parse(data)
                this.data.forEach(element => {
                    if(element.id == id) {
                        return element.product
                    } 
                    else{
                        return null
                    }
                });
            }
        }catch(error){
            throw new Error(error.message)
        }
    }
    
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            if(data){
                this.data = JSON.parse(data)
                this.data.map( (producto) => {
                    if(this.id<producto.id) this.id = producto.id
                })
                return this.data
            }
        }catch(error){
            throw new Error(error.message)
        }
    }
    async deleteById(id){
        try{
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            if(data){
                this.data = JSON.parse(data)                
                this.data.forEach(element => {
                    if(element.id == id) {
                        fs.unlink(`product/${element.id}.txt`,(error) =>{
                        if(error){
                            throw new Error(error.message)
                        }else{
                            console.log('El producto fue eliminado')
                        }
                    })
                    } 
                });
            }
        }catch(error){
            throw new Error(error.message)
        }
    }

    async deleteAll(){
        fs.unlink(this.archivo, (error) => {
            if(error){
                throw new Error(error.message)
            }else{
                console.log('Archivo eliminado')
            } 
        })
    }
}

// -------- PRUEBAS ------//
//const newArchivo = new Contenedor('product.txt');

// Test save //
/* async function testSave(){
    await newArchivo.save(obj1) 
    await newArchivo.save(obj2)
    await newArchivo.save(obj3)
}

testSave()
console.log('Objetos guardados') */


// Test getById //
//newArchivo.getById(1)

// Test getAll //
//newArchivo.getAll()

// Test deledteById //
//newArchivo.deleteById(1)

// Test deleteAll //
//newArchivo.deleteAll()