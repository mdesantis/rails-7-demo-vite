# frozen_string_literal: true

JsRoutes.setup do |config|
  config.namespace = nil
  config.camel_case = true
  config.url_links = true
  config.include = [/admin/, /page/]
end
