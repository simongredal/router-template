export class Router {
    /**
     * @param routes : Object
     * @param on_update : Function
     */
    constructor(routes, on_update) {
        this._routes = routes;
        this._on_update = on_update;

        this.#set_click_event_listener_on_links()
        this.#set_load_event_listener_on_window()
        this.#set_popstate_event_listener_on_window()
    }

    get routes() { return this._routes }
    set routes(value) { this._routes = value }

    get on_update() { return this._on_update }
    set on_update(value) { this._on_update = value }

    #set_click_event_listener_on_links() {
        document.querySelectorAll('a:not([target]), a[target=""]').forEach(elem => {
            elem.addEventListener('click', ev => this.#handle_click_on_link(ev))
        })
    }

    #set_load_event_listener_on_window() {
        window.addEventListener('load', ev => {this.#handle_history_change({event: ev})})
    }

    #set_popstate_event_listener_on_window() {
        window.addEventListener('popstate', ev => this.#handle_history_change({event: ev}))
    }

    /**
     * @param event : PopStateEvent
     * @param link : URL
     */
    #handle_history_change({event = null, link = new URL(window.location.href)}) {
        if (event instanceof PopStateEvent) {
            event.preventDefault();
        }

        const route_object = this.#build_route_object_from_link(link)
        this._on_update(route_object)
    }

    /**
     * @param event : Event
     */
    #handle_click_on_link(event) {
        event.preventDefault();

        const link = new URL(event.target.href)
        if (link.origin !== window.location.origin) {
            window.location = link
        } else {
            window.history.pushState({}, "", event.target.href)
            this.#handle_history_change({link})
        }
    }

    /**
     * @param link : URL
     */
    #build_route_object_from_link(link) {

        outerloop:
        for (const route_key of Object.keys(this._routes)) {
            const link_path_parts = link.pathname.split('/').filter(part => part !== '')
            const route_path_parts = route_key.split('/').filter(part => part !== '')
            if (route_path_parts.length !== link_path_parts.length)
                continue

            const path_variables = {}

            for (const route_path_part of route_path_parts) {
                for (let i = 0; i < Math.min(link_path_parts.length, route_path_parts.length); i++) {
                    const route_path_part = route_path_parts[i]
                    const link_path_part = link_path_parts[i]

                    const route_path_part_is_path_variable = route_path_part.startsWith(':')
                    if (route_path_part_is_path_variable) {
                        const name = route_path_part.substring(1)
                        const value = link_path_part
                        path_variables[name] = value
                        continue
                    }

                    if (route_path_part !== link_path_part) {
                        continue outerloop
                    }
                }
            }
            return {...this._routes[route_key], path_variables}
        }
    }
}