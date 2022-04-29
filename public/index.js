import {Router} from '/modules/router.js';
import * as Home from '/pages/home.js';
import * as Page1 from '/pages/page-1.js';
import * as Page2 from '/pages/page-2.js';
import * as Customers from '/pages/customers.js';
import * as CustomerRentals from '/pages/customer-rentals.js';

const routes = {
    '/': {
        template_name: 'home',
        page_handler: Home.page_handler
    },
    '/page-1': {
        template_name: 'page1',
        page_handler: Page1.page_handler
    },
    '/page-2': {
        template_name: 'page2',
        page_handler: Page2.page_handler
    },
    '/customers/': {
        template_name: 'customers',
        page_handler: Customers.page_handler
    },
    '/customers/:id': {
        template_name: 'customers',
        page_handler: Customers.page_handler
    },
    '/customers/:customer_id/rentals/': {
        template_name: 'customer-rentals',
        page_handler: CustomerRentals.page_handler
    },
    '/customers/:customer_id/rentals/:rental_id': {
        template_name: 'customer-rentals',
        page_handler: CustomerRentals.page_handler
    },
}

const router = new Router(routes, route => {
    const template = document.querySelector(`template[data-template="${route.template_name}"]`)
    const main = document.querySelector("main")
    main.innerHTML = ""
    main.appendChild(template.content.cloneNode(true))
    route.page_handler(route.path_variables)
})

