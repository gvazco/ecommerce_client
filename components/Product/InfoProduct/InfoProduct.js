import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
import CarouselScreenshots from "../CarouselScreenshots/CarouselScreenshots";

export default function InfoProduct(props) {
	const { product } = props;
	return (
		<div className="info-product">
			<ReactPlayer
				className="info-product__video"
				url={product.video}
				controls={true}
			/>
			<CarouselScreenshots
				title={product.title}
				screenshots={product.screenshots}
			/>
			<div className="info-product__content">
				<div dangerouslySetInnerHTML={{ __html: product.summary }} />

				<div className="info-product__content-date">
					<h4>Fecha de Actualización:</h4>
					<p>{moment(product.realeseDate).format("LL")}</p>
				</div>
			</div>
		</div>
	);
}
