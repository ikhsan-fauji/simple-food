document.addEventListener('DOMContentLoaded', function () {

	const elements = document.querySelectorAll('.sidenav');
	M.Sidenav.init(elements);
	loadNavigation();

	let page = window.location.hash.substr(1);
	if (!page) page = 'home';
	loadPage(page);

	function xhttpRequest (path, callback) {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				callback(this, xhttp)
			}
		};
		xhttp.open("GET", path, true);
		xhttp.send();
	}

	function loadPage (page, detail) {
		xhttpRequest(`pages/${page}.html`, (self, xhttp) => {
			let content = document.querySelector(".content");
				if (self.status == 200) {
					content.innerHTML = xhttp.responseText;
					if (page === 'detail' && detail) {
						document.querySelector('#detail-name').innerHTML = detail.name;
						document.querySelector('#detail-img').setAttribute('src', detail.src);
					}
				} else if (self.status == 404) {
					content.innerHTML = `
					<div class="row">
						<div class="col s4 offset-s4 not-found">
							<h1>404</h1>
							<p>Page Not Found</p>
						</div>
					</div>
					`;
				} else {
					content.innerHTML = `
					<div class="row">
						<div class="col s4 offset-s4 not-found">
							<h1>Oops!!!</h1>
							<p>Somethink wrong...</p>
						</div>
					</div>
					`;
				}
		})
		linkDetail(page);
	}

	function loadNavigation () {
		xhttpRequest('nav.html', (self, xhttp) => {
			if (self.status != 200) return;

			document.querySelectorAll(".topnav, .sidenav")
				.forEach(function (element) {
					element.innerHTML = xhttp.responseText;
				});

			const sideHeadElement = document.createElement('li')
			sideHeadElement.setAttribute('class', 'sidenav-head')
			document.querySelector(".topnav").appendChild(sideHeadElement)

			document.querySelectorAll('.sidenav a, .topnav a')
				.forEach(function (element) {
					element.addEventListener('click', function (event) {
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
		})
	}

	function linkDetail (basePage) {
		xhttpRequest(`pages/${basePage}.html`, (self, xhttp) => {
			if(self.status != 200) return;

			document.querySelectorAll('.page-link')
				.forEach(link => {
					link.addEventListener('click', function () {
						page = link.getAttribute('href').substr(1);
						if (page === 'detail') {
							const src = link.querySelector('img').getAttribute('src');
							const name = link.querySelector('h4').innerHTML;
							loadPage(page, { src, name });
						} else {
							loadPage(page);
						}
					});
				})
		})
	}
});

function sendMessage () {
	const name = document.getElementById('name')
	alert('Thank you ' + name.value)
}
