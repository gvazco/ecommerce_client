import { useState } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";

export default function MenuWeb() {
	const [showModal, setShowModal] = useState(false);
	const onShowModal = () => setShowModal(true);

	return (
		<div className="menu">
			<Container>
				<Grid>
					<Grid.Column className="menu__left" width={10}>
						<MenuPlatforms />
					</Grid.Column>
					<Grid.Column className="menu__right" width={6}>
						<MenuOptions onShowModal={onShowModal} />
					</Grid.Column>
				</Grid>
			</Container>
			<BasicModal show={showModal} setShow={setShowModal}>
				<h2>Contenido del Modal</h2>
			</BasicModal>
		</div>
	);
}

function MenuPlatforms() {
	return (
		<Menu>
			<Link href="/playstation">
				<Menu.Item as="a">PlayStation</Menu.Item>
			</Link>
			<Link href="/xbox">
				<Menu.Item as="a">Xbox</Menu.Item>
			</Link>
			<Link href="/switch">
				<Menu.Item as="a">Switch</Menu.Item>
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
