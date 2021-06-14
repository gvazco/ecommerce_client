import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState("Inciar Sesión");
	const [user, setUser] = useState(undefined);
	const { auth, logout } = useAuth();

	useEffect(() => {
		(async () => {
			const response = await getMeApi(logout);
			setUser(response);
			// console.log(response);
		})();
	}, [auth]);

	const onShowModal = () => setShowModal(true);
	const onCloseModal = () => setShowModal(false);

	return (
		<div className="menu">
			<Container>
				<Grid>
					<Grid.Column className="menu__left" width={10}>
						<MenuPlatforms />
					</Grid.Column>
					<Grid.Column className="menu__right" width={6}>
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

function MenuPlatforms() {
	return (
		<Menu>
			<Link href="/accesorios">
				<Menu.Item as="a">Accesorios</Menu.Item>
			</Link>
			<Link href="/herramientas">
				<Menu.Item as="a">Herramienta</Menu.Item>
			</Link>
			<Link href="/remates">
				<Menu.Item as="a">Remates</Menu.Item>
			</Link>
			<Link href="/equipamento">
				<Menu.Item as="a">Equipamento</Menu.Item>
			</Link>
		</Menu>
	);
}

function MenuOptions(props) {
	const { onShowModal, user, logout } = props;
	return (
		<Menu>
			{user ? (
				<>
					<Link href="/order">
						<Menu.Item className="m-0" as="a">
							<Icon name="numbered list" />
						</Menu.Item>
					</Link>
					<Link href="/whislist">
						<Menu.Item className="m-0" as="a">
							<Icon name="heart outline" />
						</Menu.Item>
					</Link>
					<Link href="/cart">
						<Menu.Item as="a" className="m-0">
							<Icon name="cart" />
						</Menu.Item>
					</Link>
					<Link href="/account">
						<Menu.Item as="a">
							<Icon name="user outline" />
							{user.name}
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
