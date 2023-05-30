> Source - https://raw.githubusercontent.com/max-lt/nginx-jwt-module/master/README.md


## Summary
Affirmative! I understand the directives and embedded variables provided by the ngx_http_auth_jwt_module in NGINX.

The ngx_http_auth_jwt_module module enables the validation of JSON Web Tokens (JWT) in NGINX. It provides several directives that can be used in the HTTP, server, and location contexts:

1. `auth_jwt $variable | on | off;`: This directive enables or disables the validation of JWT. It can be set to a variable, "on," or "off."

2. `auth_jwt_key value [encoding];`: This directive specifies the key used for validating the JWT signature. The value must be in hexadecimal format. The optional `encoding` parameter can be set to "hex," "utf8," "base64," or "file" (default is "utf8"). When using the "file" option, the value should be a valid file path pointing to a PEM encoded key.

3. `auth_jwt_alg any | HS256 | HS384 | HS512 | RS256 | RS384 | RS512 | ES256 | ES384 | ES512;`: This directive specifies the expected algorithm in the JWT. The server will only accept JWTs with the specified algorithm.

4. `auth_jwt_require $value ... [error=401 | 403];`: This directive specifies additional checks for JWT validation. The authentication will succeed only if all the values are not empty and not equal to "0." If any of the checks fail, the default error code is 401, but you can override it by setting the optional `error` parameter to 403.

The module also supports embedded variables that can be used within the configuration. These variables provide access to JWT headers and claims:

- `$jwt_header_*name*`: Returns the value of the specified header.
- `$jwt_claim_*name*`: Returns the value of the specified claim.
- `$jwt_headers`: Returns the JWT headers.
- `$jwt_payload`: Returns the JWT payload.

Note that the returned values from these variables are JSON-encoded, so strings are surrounded by double quotation marks ("").

Please let me know if there's anything specific you would like to discuss or if you have any further questions.