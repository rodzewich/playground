import {router, hostname, literal, method} from "./lib/http/router";

export = router.factory({
	controller: "sdfsdfs",
	action: "index",
	type: "html"
	children: [
		hostname.factory({
			route: ":subdomain.domain.tld",
			constraints: {
				subdomain: [
					"sub1",
					"sub2"
				]
			}
		}),
		literal.factory({

		}),
		method.factory({

		})
	]
});