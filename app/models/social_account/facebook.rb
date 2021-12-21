# frozen_string_literal: true

class SocialAccount::Facebook < SocialAccount
  store_accessor :credentials, :app_id, :app_secret

  # FIXME: it doesn't work with `store_accessor` defined attributes
  # self.filter_attributes = %i[app_id app_secret]
  self.filter_attributes = %i[credentials]

  validates :app_id, :app_secret, presence: true
end
