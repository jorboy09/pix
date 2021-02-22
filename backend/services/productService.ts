import bodyParser from 'body-parser';
import knex from 'knex';
export class ProductService {
    constructor(private knex: knex) { }

    public async getProducts() {
        const res = await this.knex.select("*").from('products').orderBy('id', 'desc').limit(4)
        return res;
    }

    public addProduct = async (body: { name: string, description: string, image_name: string | null | undefined, price: number }, filename) => {
        
        const res = await this.knex.insert({
            name: body.name,
            description: body.description,
            image_name: filename.key,
            price: body.price

        }).into('products').returning('*')

        return res;

    }

    public editProduct =  async (id: number, body: { name: string, description: string, image_name: string | null | undefined, price: number }, file) => {
        if (file == null){
            await this.knex('products').update(
                {
                    name: body.name,
                    description: body.description,
                    price: body.price
                }
            ).where("id", id)

        } else{
            await this.knex('products').update(
                {
                    name: body.name,
                    description: body.description,
                    image_name: file.key,
                    price: body.price
                }
            ).where("id", id)
        }
        const product = await this.knex.select('*').from('products').where('id', id)

        return product;
    }


    public async deleteProduct(id: number) {
        await this.knex('products').where('id', id).delete()
    }
}