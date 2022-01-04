# frozen_string_literal: true

json.extract! page, :id, :author, :content, :created_at, :updated_at

json.errors do
  json.array!(page.errors) do |error|
    json.call error, :options, :full_message
    json.attribute error.attribute.to_s.camelize :lower
    json.type error.type.to_s.camelize :lower
  end
end
