# frozen_string_literal: true

json.type :social_account_form_add_errors
json.payload do
  json.partial! 'admin/resource_errors', resource: social_account
end
