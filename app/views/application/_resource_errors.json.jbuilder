# frozen_string_literal: true

json.array!(resource.errors) do |error|
  json.attribute error.attribute.to_s.camelize :lower
  json.type error.type.to_s.camelize :lower
  json.call error, :options
  # json.call error, :full_message
end
