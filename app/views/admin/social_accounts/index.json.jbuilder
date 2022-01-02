# frozen_string_literal: true

dialog_form_open ||= false

json.social_accounts(@social_accounts) do |social_account|
  json.partial! 'admin/social_accounts/social_account', social_account: social_account
end

json.form_social_account do
  json.partial! 'admin/social_accounts/social_account', social_account: @social_account
end

json.dialog_form_open dialog_form_open

json.success_message success if success
