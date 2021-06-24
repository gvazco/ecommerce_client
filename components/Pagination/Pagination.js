import React from "react";
import { Pagination as PaginationSU, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
	const { totalProducts, page, limitPerPage } = props;
	const totalPages = Math.ceil(totalProducts / limitPerPage);
	const router = useRouter();
	const urlParse = queryString.parseUrl(router.asPath);

	const goToPage = (newPage) => {
		urlParse.query.page = newPage;
		const url = queryString.stringifyUrl(urlParse);
		router.push(url);
	};

	return (
		<div className="pagination">
			<PaginationSU
				defaultActivePage={page}
				totalPages={totalPages}
				firstItem={null}
				lastItem={null}
				prevItem={{ content: <Icon name="angle left" />, icon: true }}
				nextItem={{ content: <Icon name="angle right" />, icon: true }}
				onPageChange={(_, data) => goToPage(data.activePage)}
				boundaryRange={0}
				siblingRange={1}
				ellipsisItem={null}
			/>
		</div>
	);
}
