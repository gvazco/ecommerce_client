import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
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
						computer={10}
						tablet={8}
						mobile={16}
					>
						<MenuPlatforms platforms={platforms} />
					</Grid.Column>
					<Grid.Column
						className="menu__right"
						computer={6}
						tablet={8}
						mobile={16}
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
	return (
		<Menu>
			{user ? (
				<>
					<Link href="/order">
						<Menu.Item className="m-0" as="a">
							<Icon name="money bill alternate outline" />
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
