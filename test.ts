// Xlib\Mvc\Router;

/*class RouteMatch {
    public function __construct(array $params);
    public function setMatchedRouteName($name);
    public function getMatchedRouteName();
    public function setParam($name, $value);
    public function getParams();
    public function getParam($name, $default = null);
}

interface RouteInterface {
    public static function factory(array $options = array());
    public function match(Request $request);
    public function assemble(array $params = array(), array $options = array());
}*/

import {Hostname, RegExp} = require("./filename");

Hostname.factory({
    route : ':subdomain.domain.tld',
    constraints : {
        subdomain : /^fw\d{2}$/ // or string
    },
    defaults: {
        controller: "controllers/Controller/Path/File",
        action: "action"
    }
});

export = Path.factory({
    router : Hostname.factory({
        route : ':subdomain.domain.tld',
        constraints : {
            subdomain : /^fw\d{2}$/ // or string
        },
        defaults : {
            controller : "controllers/Controller/Path/File",
            action : "action"
        }
    }),
    childRoutes : [
        Router1,
        Router2,
        Router3,
        Router4
    ]
});