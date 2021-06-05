import { useState } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";

export default function MenuWeb() {
	const [showModal, setShowModal] = useState(false);
	const [titleModal, setTitleModal] = useState("Inciar Sesión");
	const { auth, logout } = useAuth();

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
						{auth ? (
							<button onClick={logout}>Cerrar Sesión</button>
						) : (
							<MenuOptions onShowModal={onShowModal} />
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
	const { onShowModal } = props;
	return (
		<Menu>
			<Menu.Item onClick={onShowModal}>
				<Icon name="user outline" />
				Mi cuenta
			</Menu.Item>
		</Menu>
	);
}
