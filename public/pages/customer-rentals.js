export function page_handler(parameters) {
    console.log("I'm the page handler for 'customer-rentals.js")
    document.querySelector("#to_be_updated").textContent = JSON.stringify( parameters );
}