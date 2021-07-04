import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, forEach } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import ListProducts from "../components/ListProducts";
import useCart from "../hooks/useCart";

export default function wishlist() {
	const [products, setProducts] = useState(null);
	const { auth, logout } = useAuth();

	console.log(useCart());

	useEffect(() => {
		(async () => {
			const response = await getFavoriteApi(auth.idUser, logout);
			if (size(response) > 0) {
				const productList = [];
				forEach(response, (data) => {
					productList.push(data.product);
				});
				setProducts(productList);
			} else {
				setProducts([]);
			}
		})();
	}, []);

	return (
		<BasicLayout className="wishlist">
			<div className="wishlist__block">
				<div className="title">Lista de deseos</div>

				<div className="data">
					{!products && <Loader active>Cargando Productos</Loader>}
					{products && size(products) === 0 && (
						<div className="data__not-found">
							<h3>No tienes productos en tu lista de favoritos</h3>
						</div>
					)}
					{size(products) > 0 && <ListProducts products={products} />}
				</div>
			</div>
		</BasicLayout>
	);
}
