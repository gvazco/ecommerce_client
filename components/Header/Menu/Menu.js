import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
// import { Navbar, Nav, NavDropdown, NavbarBrand } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

export default function MenuWeb() {
	const [platforms, setPlatforms] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState("Inciar Sesión");
	const [user, setUser] = useState(undefined);
	const { auth, logout } = useAuth();

	useEffect(() => {
		(async () => {
			const response = await getMeApi(logout);
			setUser(response);
		})();
	}, [auth]);

	useEffect(() => {
		(async () => {
			const response = await getPlatformsApi();
			setPlatforms(response || []);
		})();
	}, []);

	const onShowModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);

	return (
		<div className="menu">
			<Container>
				<Grid>
					<Grid.Column
						className="menu__left"
						width={6}
					>
						<MenuPlatforms platforms={platforms} />
					</Grid.Column>
					<Grid.Column
						className="menu__right"
						width={10}
					>
						{user !== undefined && (
							<MenuOptions
								onShowModal={onShowModal}
								user={user}
								logout={logout}
							/>
						)}
					</Grid.Column>
				</Grid>
			</Container>
			<BasicModal
				show={showModal}
				setShow={setShowModal}
				title={titleModal}
				size="small"
			>
				<Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
			</BasicModal>
		</div>
	);
}

function MenuPlatforms(props) {
	const { platforms } = props;
	const router = useRouter();
	const { asPath } = router;

	return (
		 <Menu>
		 	{map(platforms, (platform) => (
				<Link href={`/products/${platform.url}`} key={platform._id}>
				<Menu.Item as="a" name={platform.url}>
					{platform.title}
					</Menu.Item>
		 		</Link>
			))}
		 </Menu>
		
	);
}

function MenuOptions(props) {
	const { onShowModal, user, logout } = props;
	const { productsCart } = useCart();

	return (
		<Menu>
			{user ? (
				<>
					<Link href="/order">
						<Menu.Item className="m-0" as="a">
							<Icon name="money bill alternate outline" />
						</Menu.Item>
					</Link>
					<Link href="/wishlist">
						<Menu.Item className="m-0" as="a">
							<Icon name="heart outline" />
						</Menu.Item>
					</Link>
					<Link href="/cart">
						<Menu.Item as="a" className="m-0">
							<Icon name="cart" />
							{productsCart > 0 && (
								<Label color="red" floating circular>
									{productsCart}
								</Label>
							)}
						</Menu.Item>
					</Link>
					<Link href="/account">
						<Menu.Item as="a">
							<Icon name="user outline" />
							<span>{user.name}</span>
						</Menu.Item>
					</Link>
					<Menu.Item className="m-0" onClick={logout}>
						<Icon name="power off" />
					</Menu.Item>
				</>
			) : (
				<Menu.Item onClick={onShowModal}>
					<Icon name="user outline" />
					Mi cuenta
				</Menu.Item>
			)}
		</Menu>
	);
}
