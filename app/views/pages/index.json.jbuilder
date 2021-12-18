# frozen_string_literal: true

json.pages(@pages) do |page|
  json.partial! 'pages/page', page: page
end
