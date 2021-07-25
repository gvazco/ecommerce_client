import React from 'react'
import {Button} from "semantic-ui-react"
import {useRouter} from "next/router"
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {toast} from "react-toastify"
import {size} from "lodash"
import useAuth from "../../../../hooks/useAuth"
import useCart from "../../../../hooks/useCart"

export default function FormPayment(props) {

    const { products, address } = props;
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
            console.log("Realizando Pago...")
        }
            
    return (
        <form className="form-payment" onSubmit={handleSubmit}>
            <CardElement />
            <Button type="submit" loading={loading} >Pagar</Button>
        </form>
    )
}

