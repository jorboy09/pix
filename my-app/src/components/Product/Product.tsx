import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteCartThunk, deleteDraftCart, fetchCart } from "../../redux/cart/action";
import { DraftCart } from "../../redux/cart/reducer";
import { RootState } from "../../redux/store";
import './Product.css'

interface IProductProps {
    editProduct?: (product: DraftCart) => void
    setproductid?: (id: number | null)=>void
}

export function Product(props: IProductProps) {
    const shoppings = useSelector((state: RootState) => state.cart.shoppings)
    let isCreator = useSelector((state: RootState) => state.login.isCreator)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart())
      

    }, [dispatch])

    function handleRemove(id: number | undefined) {
        // React: const newShoppingList = shoppings.filter((shopping) => shopping.id !== id);
        // dispatch thunk
        dispatch(deleteDraftCart(id as number))
        dispatch(deleteCartThunk(id as number))
    }

    function handleEdit(shoppingId: number) {
        const product = shoppings.find(shopping => shopping.id === shoppingId);
        if (product && props.editProduct) {
            props.editProduct(product);
            props.setproductid!(product.id!)

        }
    }

    return (
        <div className='creatorProduct'>
            {shoppings.map((shopping, i) =>
                <div className="container">
                    <div className="containerInner" key={shopping.id}>
                        <div className="containerImg">
                            <img src={`${'/product_img/' + shopping.image_name}`} width='200' height='200' alt=''/>
                            {/* <img src={`${process.env.REACT_APP_DO_SPACE_URL}/ ${shopping.image_name}`} width='200' height='200' alt=''/> */}
                        </div>

                        <div className="containerInnerText">
                            <h3 className="shoppingName">{shopping.name}</h3>
                            <h4 className="shoppingDescription"> {shopping.description}</h4>
                            <h3 className="shoppingPrice">HK$ {shopping.price}</h3>
                        </div>

                        {isCreator ?
                            <div className="containter-flex edit-delete">
                                <button type="button" onClick={() => handleEdit(shopping.id as number)}><i className="fas fa-edit"></i></button>
                                <button type="button" onClick={() => handleRemove(shopping.id)}><i className="fas fa-trash-alt"></i></button>
                            </div> : ''
                        }
                    </div>
                </div>
            )}
        </div>
    )
}