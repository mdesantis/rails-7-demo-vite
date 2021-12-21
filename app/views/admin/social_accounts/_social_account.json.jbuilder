# frozen_string_literal: true

json.extract! social_account,
              :id,
              :name,
              :type,
              :created_at,
              :updated_at
json.partial! 'admin/social_accounts/credentials', social_account: social_account
