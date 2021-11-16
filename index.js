const fs = require('fs');
const { restart } = require('nodemon');

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
            this.id++
            this.data.push({
                ...obj ,id: this.id,
            })
            await fs.writeFileSync(this.archivo, JSON.stringify(this.data, null, 2)) 
            console.log(this.id)
        }catch(error){
            throw new Error(error.message)
        }
    }
    
    async getById(id){
        try{
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            if(data){
                this.data = JSON.parse(data)
                for (var element = 0; element < this.data.length; i++){
                    if (this.data[element].id == id) {
                        return element;
                    }
                    i++;
                };
            }
        }catch(error){
            throw new Error(error.message)
        }
    }
    
    async getAll(){
        try {
            let respuesta = [];
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
        try {
            let productos = await this.getAll();

            for (const key in productos) {
                if (productos[key].id == id) {
                    productos.splice(key, 1);
                }
            }
            console.log(productos);
            let contenido = JSON.stringify(productos, null, 2);
            await fs.promises.writeFile(`${this.archivo}`, contenido);
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
const newArchivo = new Contenedor('product.txt');

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