<Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto ">
					{map(platforms, (platform) => (
						<Link href={`/products/${platform.url}`} key={platform._id}>
							<Menu.Item
								as="a"
								name={platform.url}
								className={
									router.asPath === `/products/${platform.url}` ? "active" : ""
								}
							>
								{platform.title}
							</Menu.Item>
						</Link>
					))}
				</Nav>
			</Navbar.Collapse>
		</Navbar>