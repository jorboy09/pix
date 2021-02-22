import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { fetchCart, addDraftCartThunk } from "../../redux/cart/action";
import './Product.css'
import { useFormState } from 'react-use-form-state';
import { DraftCart } from "../../redux/cart/reducer";
import { addDraftCartThunk, editCartThunk, editDraftCart } from "../../redux/cart/action";
import { RootState } from "../../redux/store";

// props.product is undefined -> create
// props.product has something -> edit
interface IAddProductProps {
    product?: DraftCart
    productid?: number | null
}

export function AddProduct(props: IAddProductProps) {
    // Local state
    const [formState, { text, number }] = useFormState(props.product);

    const dispatch = useDispatch();
    // const form = event.target as HTMLFormElement;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const product = {
            product: formState.values.name,
            description: formState.values.description,
            price: parseFloat(formState.values.price),
            image: form.image.files ? form.image.files[0] : ''
        }
        if (props.productid){
            dispatch(editCartThunk(
                props.productid!,
                product.product,
                product.image,
                product.description,
                product.price)
            )
        }else{
            dispatch(addDraftCartThunk(
                product.product,
                product.image,
                product.description,
                product.price
            ))
        }
    }

    return (
        <div className="add-product-container">
            <form onSubmit={handleSubmit}>
                <h1 className='title'>{props.product ? "更改產品內容" : "加入產品"}</h1>

                <div className="add-product">
                    <p>產品名稱: </p>
                    <input {...text('name')} placeholder="產品名稱" required />
                </div>
                <div className="add-product">
                    <p>產品圖片: </p>
                    <input className="productAddImage" accept="image/png, image/jpeg" type="file" name="image"/>

                </div>
                <div className="add-product">
                    <p>產品說明: </p>
                    <input {...text('description')} placeholder="產品說明" />
                </div>
                <div className="add-product">
                    <p>價錢: </p>
                    <input {...number('price')} placeholder="價錢" required />
                </div>
                <div className='productbutton'>
                    <button className="productSbt" type="submit">加入產品</button>
                </div>
            </form>
        </div>
    )
}