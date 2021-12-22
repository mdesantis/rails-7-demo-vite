# frozen_string_literal: true

json.social_accounts(@social_accounts) do |social_account|
  json.partial! 'admin/social_accounts/social_account', social_account: social_account
end

json.new_social_account do
  json.partial! 'admin/social_accounts/social_account', social_account: @social_account
end
