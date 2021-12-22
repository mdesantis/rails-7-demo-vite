/**
 * File generated by js-routes 2.1.2
 * Based on Rails 7.0.0 routes of Rails7DemoVite::Application
 */
const __jsr = ((that) => {
    const hasProp = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
    let NodeTypes;
    (function (NodeTypes) {
        NodeTypes[NodeTypes["GROUP"] = 1] = "GROUP";
        NodeTypes[NodeTypes["CAT"] = 2] = "CAT";
        NodeTypes[NodeTypes["SYMBOL"] = 3] = "SYMBOL";
        NodeTypes[NodeTypes["OR"] = 4] = "OR";
        NodeTypes[NodeTypes["STAR"] = 5] = "STAR";
        NodeTypes[NodeTypes["LITERAL"] = 6] = "LITERAL";
        NodeTypes[NodeTypes["SLASH"] = 7] = "SLASH";
        NodeTypes[NodeTypes["DOT"] = 8] = "DOT";
    })(NodeTypes || (NodeTypes = {}));
    const Root = that;
    const isBroswer = typeof window !== "undefined";
    const ModuleReferences = {
        CJS: {
            define(routes) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                module.exports = routes;
            },
            isSupported() {
                return typeof module === "object";
            },
        },
        AMD: {
            define(routes) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                define([], function () {
                    return routes;
                });
            },
            isSupported() {
                return typeof define === "function" && !!define.amd;
            },
        },
        UMD: {
            define(routes) {
                if (ModuleReferences.AMD.isSupported()) {
                    ModuleReferences.AMD.define(routes);
                }
                else {
                    if (ModuleReferences.CJS.isSupported()) {
                        try {
                            ModuleReferences.CJS.define(routes);
                        }
                        catch (error) {
                            if (error.name !== "TypeError")
                                throw error;
                        }
                    }
                }
            },
            isSupported() {
                return (ModuleReferences.AMD.isSupported() ||
                    ModuleReferences.CJS.isSupported());
            },
        },
        ESM: {
            define() {
                // Module can only be defined using ruby code generation
            },
            isSupported() {
                // Its impossible to check if "export" keyword is supported
                return true;
            },
        },
        NIL: {
            define(routes) {
                Utils.namespace(Root, null, routes);
            },
            isSupported() {
                return !!Root;
            },
        },
        DTS: {
            // Acts the same as ESM
            define(routes) {
                ModuleReferences.ESM.define(routes);
            },
            isSupported() {
                return ModuleReferences.ESM.isSupported();
            },
        },
    };
    class ParametersMissing extends Error {
        constructor(...keys) {
            super(`Route missing required keys: ${keys.join(", ")}`);
            this.keys = keys;
            Object.setPrototypeOf(this, Object.getPrototypeOf(this));
            this.name = ParametersMissing.name;
        }
    }
    const UriEncoderSegmentRegex = /[^a-zA-Z0-9\-._~!$&'()*+,;=:@]/g;
    const ReservedOptions = [
        "anchor",
        "trailing_slash",
        "subdomain",
        "host",
        "port",
        "protocol",
    ];
    class UtilsClass {
        constructor() {
            this.configuration = {
                prefix: "",
                default_url_options: {},
                special_options_key: "_options",
                serializer: null || this.default_serializer.bind(this),
            };
        }
        default_serializer(value, prefix) {
            if (this.is_nullable(value)) {
                return "";
            }
            if (!prefix && !this.is_object(value)) {
                throw new Error("Url parameters should be a javascript hash");
            }
            prefix = prefix || "";
            const result = [];
            if (this.is_array(value)) {
                for (const element of value) {
                    result.push(this.default_serializer(element, prefix + "[]"));
                }
            }
            else if (this.is_object(value)) {
                for (let key in value) {
                    if (!hasProp(value, key))
                        continue;
                    let prop = value[key];
                    if (this.is_nullable(prop) && prefix) {
                        prop = "";
                    }
                    if (this.is_not_nullable(prop)) {
                        if (prefix) {
                            key = prefix + "[" + key + "]";
                        }
                        result.push(this.default_serializer(prop, key));
                    }
                }
            }
            else {
                if (this.is_not_nullable(value)) {
                    result.push(encodeURIComponent(prefix) + "=" + encodeURIComponent("" + value));
                }
            }
            return result.join("&");
        }
        serialize(object) {
            return this.configuration.serializer(object);
        }
        extract_options(number_of_params, args) {
            const last_el = args[args.length - 1];
            if ((args.length > number_of_params && last_el === 0) ||
                (this.is_object(last_el) &&
                    !this.looks_like_serialized_model(last_el))) {
                if (this.is_object(last_el)) {
                    delete last_el[this.configuration.special_options_key];
                }
                return {
                    args: args.slice(0, args.length - 1),
                    options: last_el,
                };
            }
            else {
                return { args, options: {} };
            }
        }
        looks_like_serialized_model(object) {
            return (this.is_object(object) &&
                !(this.configuration.special_options_key in object) &&
                ("id" in object || "to_param" in object || "toParam" in object));
        }
        path_identifier(object) {
            const result = this.unwrap_path_identifier(object);
            return this.is_nullable(result) || result === false ? "" : "" + result;
        }
        unwrap_path_identifier(object) {
            let result = object;
            if (!this.is_object(object)) {
                return object;
            }
            if ("to_param" in object) {
                result = object.to_param;
            }
            else if ("toParam" in object) {
                result = object.toParam;
            }
            else if ("id" in object) {
                result = object.id;
            }
            else {
                result = object;
            }
            return this.is_callable(result) ? result.call(object) : result;
        }
        partition_parameters(parts, required_params, default_options, call_arguments) {
            // eslint-disable-next-line prefer-const
            let { args, options } = this.extract_options(parts.length, call_arguments);
            if (args.length > parts.length) {
                throw new Error("Too many parameters provided for path");
            }
            let use_all_parts = args.length > required_params.length;
            const parts_options = {};
            for (const key in options) {
                const value = options[key];
                if (!hasProp(options, key))
                    continue;
                use_all_parts = true;
                if (parts.includes(key)) {
                    parts_options[key] = value;
                }
            }
            options = {
                ...this.configuration.default_url_options,
                ...default_options,
                ...options,
            };
            const keyword_parameters = {};
            const query_parameters = {};
            for (const key in options) {
                if (!hasProp(options, key))
                    continue;
                const value = options[key];
                if (this.is_reserved_option(key)) {
                    keyword_parameters[key] = value;
                }
                else {
                    if (!this.is_nullable(value) &&
                        (value !== default_options[key] || required_params.includes(key))) {
                        query_parameters[key] = value;
                    }
                }
            }
            const route_parts = use_all_parts ? parts : required_params;
            let i = 0;
            for (const part of route_parts) {
                if (i < args.length) {
                    const value = args[i];
                    if (!hasProp(parts_options, part)) {
                        query_parameters[part] = value;
                        ++i;
                    }
                }
            }
            return { keyword_parameters, query_parameters };
        }
        build_route(parts, required_params, default_options, route, absolute, args) {
            const { keyword_parameters, query_parameters, } = this.partition_parameters(parts, required_params, default_options, args);
            const missing_params = required_params.filter((param) => !hasProp(query_parameters, param) ||
                this.is_nullable(query_parameters[param]));
            if (missing_params.length) {
                throw new ParametersMissing(...missing_params);
            }
            let result = this.get_prefix() + this.visit(route, query_parameters);
            if (keyword_parameters.trailing_slash) {
                result = result.replace(/(.*?)[/]?$/, "$1/");
            }
            const url_params = this.serialize(query_parameters);
            if (url_params.length) {
                result += "?" + url_params;
            }
            result += keyword_parameters.anchor
                ? "#" + keyword_parameters.anchor
                : "";
            if (absolute) {
                result = this.route_url(keyword_parameters) + result;
            }
            return result;
        }
        visit(route, parameters, optional = false) {
            switch (route[0]) {
                case NodeTypes.GROUP:
                    return this.visit(route[1], parameters, true);
                case NodeTypes.CAT:
                    return this.visit_cat(route, parameters, optional);
                case NodeTypes.SYMBOL:
                    return this.visit_symbol(route, parameters, optional);
                case NodeTypes.STAR:
                    return this.visit_globbing(route[1], parameters, true);
                case NodeTypes.LITERAL:
                case NodeTypes.SLASH:
                case NodeTypes.DOT:
                    return route[1];
                default:
                    throw new Error("Unknown Rails node type");
            }
        }
        is_not_nullable(object) {
            return !this.is_nullable(object);
        }
        is_nullable(object) {
            return object === undefined || object === null;
        }
        visit_cat(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [_type, left, right], parameters, optional) {
            const left_part = this.visit(left, parameters, optional);
            let right_part = this.visit(right, parameters, optional);
            if (optional &&
                ((this.is_optional_node(left[0]) && !left_part) ||
                    (this.is_optional_node(right[0]) && !right_part))) {
                return "";
            }
            // if left_part ends on '/' and right_part starts on '/'
            if (left_part[left_part.length - 1] === "/" && right_part[0] === "/") {
                // strip slash from right_part
                // to prevent double slash
                right_part = right_part.substring(1);
            }
            return left_part + right_part;
        }
        visit_symbol(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [_type, key], parameters, optional) {
            const value = this.path_identifier(parameters[key]);
            delete parameters[key];
            if (value.length) {
                return this.encode_segment(value);
            }
            if (optional) {
                return "";
            }
            else {
                throw new ParametersMissing(key);
            }
        }
        encode_segment(segment) {
            return segment.replace(UriEncoderSegmentRegex, (str) => encodeURIComponent(str));
        }
        is_optional_node(node) {
            return [NodeTypes.STAR, NodeTypes.SYMBOL, NodeTypes.CAT].includes(node);
        }
        build_path_spec(route, wildcard = false) {
            let key;
            switch (route[0]) {
                case NodeTypes.GROUP:
                    return "(" + this.build_path_spec(route[1]) + ")";
                case NodeTypes.CAT:
                    return (this.build_path_spec(route[1]) + this.build_path_spec(route[2]));
                case NodeTypes.STAR:
                    return this.build_path_spec(route[1], true);
                case NodeTypes.SYMBOL:
                    key = route[1];
                    if (wildcard) {
                        return (key.startsWith("*") ? "" : "*") + key;
                    }
                    else {
                        return ":" + key;
                    }
                    break;
                case NodeTypes.SLASH:
                case NodeTypes.DOT:
                case NodeTypes.LITERAL:
                    return route[1];
                default:
                    throw new Error("Unknown Rails node type");
            }
        }
        visit_globbing(route, parameters, optional) {
            const key = route[1];
            let value = parameters[key];
            delete parameters[key];
            if (this.is_nullable(value)) {
                return this.visit(route, parameters, optional);
            }
            if (this.is_array(value)) {
                value = value.join("/");
            }
            const result = this.path_identifier(value);
            return false
                ? result
                : encodeURI(result);
        }
        get_prefix() {
            const prefix = this.configuration.prefix;
            return prefix.match("/$")
                ? prefix.substring(0, prefix.length - 1)
                : prefix;
        }
        route(parts_table, route_spec, absolute = false) {
            const required_params = [];
            const parts = [];
            const default_options = {};
            for (const [part, { r: required, d: value }] of Object.entries(parts_table)) {
                parts.push(part);
                if (required) {
                    required_params.push(part);
                }
                if (this.is_not_nullable(value)) {
                    default_options[part] = value;
                }
            }
            const result = (...args) => {
                return this.build_route(parts, required_params, default_options, route_spec, absolute, args);
            };
            result.requiredParams = () => required_params;
            result.toString = () => {
                return this.build_path_spec(route_spec);
            };
            return result;
        }
        route_url(route_defaults) {
            const hostname = route_defaults.host || this.current_host();
            if (!hostname) {
                return "";
            }
            const subdomain = route_defaults.subdomain
                ? route_defaults.subdomain + "."
                : "";
            const protocol = route_defaults.protocol || this.current_protocol();
            let port = route_defaults.port ||
                (!route_defaults.host ? this.current_port() : undefined);
            port = port ? ":" + port : "";
            return protocol + "://" + subdomain + hostname + port;
        }
        current_host() {
            var _a;
            return (isBroswer && ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname)) || "";
        }
        current_protocol() {
            var _a, _b;
            return ((isBroswer && ((_b = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.protocol) === null || _b === void 0 ? void 0 : _b.replace(/:$/, ""))) || "http");
        }
        current_port() {
            var _a;
            return (isBroswer && ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.port)) || "";
        }
        is_object(value) {
            return (typeof value === "object" &&
                Object.prototype.toString.call(value) === "[object Object]");
        }
        is_array(object) {
            return object instanceof Array;
        }
        is_callable(object) {
            return typeof object === "function" && !!object.call;
        }
        is_reserved_option(key) {
            return ReservedOptions.includes(key);
        }
        namespace(object, namespace, routes) {
            const parts = (namespace === null || namespace === void 0 ? void 0 : namespace.split(".")) || [];
            if (parts.length === 0) {
                return routes;
            }
            for (let index = 0; index < parts.length; index++) {
                const part = parts[index];
                if (index < parts.length - 1) {
                    object = object[part] || (object[part] = {});
                }
                else {
                    return (object[part] = routes);
                }
            }
        }
        configure(new_config) {
            this.configuration = { ...this.configuration, ...new_config };
            return this.configuration;
        }
        config() {
            return { ...this.configuration };
        }
        is_module_supported(name) {
            return ModuleReferences[name].isSupported();
        }
        ensure_module_supported(name) {
            if (!this.is_module_supported(name)) {
                throw new Error(`${name} is not supported by runtime`);
            }
        }
        define_module(name, module) {
            this.ensure_module_supported(name);
            ModuleReferences[name].define(module);
        }
    }
    const Utils = new UtilsClass();
    // We want this helper name to be short
    const __jsr = {
        r(parts_table, route_spec, absolute) {
            return Utils.route(parts_table, route_spec, absolute);
        },
    };
    const result = {
        ...__jsr,
        configure: (config) => {
            return Utils.configure(config);
        },
        config: () => {
            return Utils.config();
        },
        serialize: (object) => {
            return Utils.serialize(object);
        },
        ...{},
    };
    Utils.define_module("ESM", result);
    return result;
})(this);
export const configure = __jsr.configure;

export const config = __jsr.config;

export const serialize = __jsr.serialize;

/**
 * Generates rails route to
 * /admin/social-accounts/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const adminSocialAccountUrl = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[2,[7,"/"],[2,[3,"id"],[1,[2,[8,"."],[3,"format"]]]]]]]]], true);

/**
 * Generates rails route to
 * /admin/social-accounts/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const adminSocialAccountPath = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[2,[7,"/"],[2,[3,"id"],[1,[2,[8,"."],[3,"format"]]]]]]]]]);

/**
 * Generates rails route to
 * /admin/social-accounts(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const adminSocialAccountsUrl = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[1,[2,[8,"."],[3,"format"]]]]]]], true);

/**
 * Generates rails route to
 * /admin/social-accounts(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const adminSocialAccountsPath = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[1,[2,[8,"."],[3,"format"]]]]]]]);

/**
 * Generates rails route to
 * /admin/social-accounts/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editAdminSocialAccountUrl = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[2,[7,"/"],[2,[3,"id"],[2,[7,"/"],[2,[6,"edit"],[1,[2,[8,"."],[3,"format"]]]]]]]]]]], true);

/**
 * Generates rails route to
 * /admin/social-accounts/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editAdminSocialAccountPath = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[2,[7,"/"],[2,[3,"id"],[2,[7,"/"],[2,[6,"edit"],[1,[2,[8,"."],[3,"format"]]]]]]]]]]]);

/**
 * Generates rails route to
 * /pages/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editPageUrl = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"pages"],[2,[7,"/"],[2,[3,"id"],[2,[7,"/"],[2,[6,"edit"],[1,[2,[8,"."],[3,"format"]]]]]]]]], true);

/**
 * Generates rails route to
 * /pages/:id/edit(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const editPagePath = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"pages"],[2,[7,"/"],[2,[3,"id"],[2,[7,"/"],[2,[6,"edit"],[1,[2,[8,"."],[3,"format"]]]]]]]]]);

/**
 * Generates rails route to
 * /admin/social-accounts/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newAdminSocialAccountUrl = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[2,[7,"/"],[2,[6,"new"],[1,[2,[8,"."],[3,"format"]]]]]]]]], true);

/**
 * Generates rails route to
 * /admin/social-accounts/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newAdminSocialAccountPath = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"admin"],[2,[7,"/"],[2,[6,"social-accounts"],[2,[7,"/"],[2,[6,"new"],[1,[2,[8,"."],[3,"format"]]]]]]]]]);

/**
 * Generates rails route to
 * /pages/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newPageUrl = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"pages"],[2,[7,"/"],[2,[6,"new"],[1,[2,[8,"."],[3,"format"]]]]]]], true);

/**
 * Generates rails route to
 * /pages/new(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const newPagePath = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"pages"],[2,[7,"/"],[2,[6,"new"],[1,[2,[8,"."],[3,"format"]]]]]]]);

/**
 * Generates rails route to
 * /pages/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const pageUrl = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"pages"],[2,[7,"/"],[2,[3,"id"],[1,[2,[8,"."],[3,"format"]]]]]]], true);

/**
 * Generates rails route to
 * /pages/:id(.:format)
 * @param {any} id
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const pagePath = __jsr.r({"id":{"r":true},"format":{}}, [2,[7,"/"],[2,[6,"pages"],[2,[7,"/"],[2,[3,"id"],[1,[2,[8,"."],[3,"format"]]]]]]]);

/**
 * Generates rails route to
 * /pages(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const pagesUrl = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"pages"],[1,[2,[8,"."],[3,"format"]]]]], true);

/**
 * Generates rails route to
 * /pages(.:format)
 * @param {object | undefined} options
 * @returns {string} route path
 */
export const pagesPath = __jsr.r({"format":{}}, [2,[7,"/"],[2,[6,"pages"],[1,[2,[8,"."],[3,"format"]]]]]);

