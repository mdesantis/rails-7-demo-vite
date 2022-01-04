# frozen_string_literal: true

json.pages(@pages) do |page|
  json.partial! 'proofs_of_concept/pages/page', page: page
end
