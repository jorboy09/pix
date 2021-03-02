import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCart } from "../../redux/cart/action";
import { RootState } from "../../redux/store";
import style from './ProductBoard.module.css'

export function ProductBoard() {
    const shoppings = useSelector((state: RootState) => state.cart.shoppings)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    return (
        <div className={style.box}>
            {shoppings.map((shopping, i) =>
                <div className="container">
                    <div className="containerInner" key={shopping.id}>
                        <div className="containerImg">
                            {/* <img src={`${'/product_img/' + shopping.image_name}`} width='200' height='200' alt=''/> */}
                            <img src={`${process.env.REACT_APP_DO_SPACE_URL}/${shopping.image_name}`} width='150' height='150' alt=''/>
                        </div>

                        <div className="containerInnerText">
                            <h3 className="shoppingName">{shopping.name}</h3>
                            <h4 className="shoppingDescription"> {shopping.description}</h4>
                            <h3 className="shoppingPrice">HK$ {shopping.price}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}