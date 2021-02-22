import { Request, Response } from 'express'
import { ProductService } from '../services/productService'

export interface DraftCart {
    id?: number;
    name: string;
    image_name: string | null;
    description: string;
    price: number;
}
export interface CartState {
    shoppings: DraftCart[]
}


export class ProductController {
    constructor(private productService: ProductService) { }

    getProduct = async (req: Request, res: Response) => {
        try {
            let product = await this.productService.getProducts();
            res.json({ product, result: true })
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }

    editProduct = async (req: Request, res: Response) => {

        try {

            const body = await this.productService.editProduct(parseInt(req.params.id), req.body, req.file);

            res.json({ body, result: true })
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }

    postProduct = async (req: Request, res: Response) => {

            try {
                const body = await this.productService.addProduct(req.body, req.file);
    
                res.json({ body, result: true })
            } catch (error) {
                res.json({ result: false, message: error.message })
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            await this.productService.deleteProduct(parseInt(req.params.id));
            res.json({ result: true })
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }
}
